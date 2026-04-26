import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentCard from '../../../globals/components/ContentCard';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getUser,
  uploadImageMessage
} from '../api/story.api';

import type { Comment } from "../../stories/models/comments.model";
import Input from '../../../globals/components/input';

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [showAiInput, setShowAiInput] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const { storyId } = useParams();

  useEffect(() => {
    if (!storyId) return;

    const fetchData = async () => {
      const data = await getComments(storyId);
      setComments(data);
    };

    const fetchUser = async () => {
      const user = await getUser();
      setCurrentUser(user);
    };

    fetchData();
    fetchUser();
  }, [storyId]);

  const handlePostComment = async () => {
    if (!commentText.trim() && !imageFile) return;
    if (!storyId || !currentUser) return;

    const res = await createComment(storyId, commentText);

    let imageUrl = "";

    if (imageFile) {
      const uploadRes = await uploadImageMessage(res.messageId, imageFile);

      if (uploadRes?.imageUrl) {
        imageUrl = uploadRes.imageUrl;
      }
    }

    const newItem: Comment = {
      messageId: res.messageId,
      message: commentText,
      userId: currentUser.userId,
      userName: currentUser.userName,
      createdAt: new Date().toISOString(),
      imageUrl 
    };

  setComments(prev => [...prev, newItem]);

  setCommentText("");
  handleRemoveImage();
};

  const handleUpdate = async (id: number, text: string, removeImage?: boolean) => {
    await updateComment(id, text);

    setComments(prev =>
      prev.map(c =>
        c.messageId === id
          ? {
              ...c,
              message: text,
              imageUrl: removeImage ? "" : c.imageUrl
            }
          : c
      )
    );
  };

  const handleDelete = async (id: number) => {
    await deleteComment(id);

    setComments(prev =>
      prev.filter(c => c.messageId !== id)
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setShowAiInput(false);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAiGenerate = () => {
    console.log("AI prompt:", aiPrompt);
  };

  return (
    <div className="mt-8 flex flex-col gap-4 w-full">

      <h3 className="text-[#e8d5c4] font-medium text-2xl mb-2">
        Comments
      </h3>

      <div className="bg-(--color-bg-card) border border-(--color-border) rounded-xl shadow-md flex flex-col">

        <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.05)]">
          {comments.length === 0 ? (
            <p className="text-(--color-text-muted) p-4 text-sm">
              No comments yet...
            </p>
          ) : (
            comments.map(c => (
              <div key={c.messageId} className="p-4">
                <ContentCard
                  author={c.userName}
                  content={c.message || ""}
                  createdAt={new Date(c.createdAt).toLocaleDateString()}
                  variant="comment"
                  imageUrl={c.imageUrl} 
                  canEdit={c.userId === currentUser?.userId}
                  canDelete={c.userId === currentUser?.userId}
                  onUpdate={(text, removeImage) =>
                    handleUpdate(c.messageId, text, removeImage)
                  }
                  onDelete={() => handleDelete(c.messageId)}
                />
              </div>
            ))
          )}
        </div>

        <div className="p-4 flex flex-col sm:flex-row gap-3 items-center bg-[rgba(0,0,0,0.1)] rounded-b-xl">
          <Input
            value={commentText}
            onChange={setCommentText}
            onImageChange={setImageFile}
            onSubmit={handlePostComment}
            onGenerateImage={(prompt) => {
              console.log("IA prompt:", prompt);
            }}
          />
        </div>

      </div>
    </div>
  );
}