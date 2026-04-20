import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentCard from '../../../globals/components/ContentCard';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getUser
} from '../api/story.api';

import type { Comment } from "../../stories/models/comments.model";

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

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
    if (!commentText.trim()) return;
    if (!storyId || !currentUser) return;

    const res = await createComment(storyId, commentText);

    const newItem: Comment = {
      messageId: res.messageId,
      message: commentText,
      userId: currentUser.userId,
      userName: currentUser.userName,
      createdAt: new Date().toISOString()
    };

    setComments(prev => [...prev, newItem]);
    setCommentText("");
  };

  const handleUpdate = async (id: number, text: string) => {
    await updateComment(id, text);

    setComments(prev =>
      prev.map(c =>
        c.messageId === id ? { ...c, message: text } : c
      )
    );
  };

  const handleDelete = async (id: number) => {
    await deleteComment(id);

    setComments(prev =>
      prev.filter(c => c.messageId !== id)
    );
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
                  content={c.message}
                  createdAt={new Date(c.createdAt).toLocaleDateString()}
                  variant="comment"
                  canEdit={c.userId === currentUser?.userId}
                  canDelete={c.userId === currentUser?.userId}
                  onUpdate={(text) => handleUpdate(c.messageId, text)}
                  onDelete={() => handleDelete(c.messageId)}
                />
              </div>
            ))
          )}
        </div>

        <div className="p-4 flex flex-col sm:flex-row gap-3 items-center bg-[rgba(0,0,0,0.1)] rounded-b-xl">
          <input 
            type="text" 
            placeholder="Write a comment..." 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
            className="flex-1 w-full bg-[#1a110b] text-(--color-text) placeholder-[#6b5c50] rounded-lg px-4 py-3 border border-(--color-border) outline-none focus:border-(--color-accent) transition-colors shadow-inner" 
          />

          <button 
            onClick={handlePostComment}
            className="w-full sm:w-auto bg-(--color-primary) hover:brightness-110 text-white font-semibold py-3 px-5 rounded-lg transition-all shadow-md whitespace-nowrap"
          >
            Post Comment
          </button>
        </div>

      </div>
    </div>
  );
}