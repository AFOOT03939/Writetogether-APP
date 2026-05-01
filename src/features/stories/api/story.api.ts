import axiosClient from "../../../api/axiosClient"
import type { RatingModel } from "../models/rates.model"
import type { StoriesModelRequest } from "../models/story.model"

export async function getUser(){
    const {data} = await axiosClient.get(`/auth/me`)
    return data
}

export async function getStory(storyId: string){
    const {data} = await axiosClient.get(`/stories/${storyId}`)
    return data
}

export async function joinStory(storyId: string) {
  const { data } = await axiosClient.post(
        `/stories/${storyId}/collaborators/join`
  );

  return data;
}

export async function leaveStory(storyId: string) {
  const { data } = await axiosClient.delete(
        `/stories/${storyId}/collaborators/leave`
  );

  return data;
}

export async function getCollaborators(storyId: string){
    const {data} = await axiosClient.get( 
        `/stories/${storyId}/collaborators`
    );

    return data
}

export async function getUserRole(storyId: string) {
  const { data } = await axiosClient.get(
        `/stories/${storyId}/collaborators/role`
  );

  return data;
}

export async function createStory(request: StoriesModelRequest) {
  const { data } = await axiosClient.post(
        `/stories`, request
  );

  return data;
}

export async function getFragments(storyId: string) {
  const { data } = await axiosClient.get(`/fragments/stories/${storyId}`);
  return data;
}

export async function createFragment(storyId: string, content: string) {
  const { data } = await axiosClient.post(`/fragments/stories/${storyId}`, {
    content
  });
  return data;
}

export async function updateFragment(id: number, content: string) {
  await axiosClient.put(`/fragments/${id}`, { content });
}

export async function deleteFragment(id: number) {
  await axiosClient.delete(`/fragments/${id}`);
}

export async function getComments(storyId: string) {
  const { data } = await axiosClient.get(`/story-messages/story/${storyId}`);
  return data;
}

export async function createComment(storyId: string, message: string | null) {
  const { data } = await axiosClient.post(`/story-messages`, {
    storyId,
    message
  });

  return data;
}

export async function updateComment(id: number,message: string,removeImage?: boolean) {
  await axiosClient.put(`/story-messages/${id}`, {
    message,
    removeImage 
  });
}

export async function deleteComment(id: number) {
  await axiosClient.delete(`/story-messages/${id}`);
}

export async function uploadImage(storyId: string, image: File) {
  const formData = new FormData();
  formData.append("file", image);

  const { data } = await axiosClient.post(
    `/stories/${storyId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return data;
}

export async function uploadImageFragments(fragmentId: string, image: File) {
  const formData = new FormData();
  formData.append("file", image);

  const { data } = await axiosClient.post(
    `/fragments/${fragmentId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return data;
}

export async function uploadImageMessage(messageId: string, image: File) {
  const formData = new FormData();
  formData.append("file", image);

  const { data } = await axiosClient.post(
    `/story-messages/${messageId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return data;
}

export async function generateImageAI(prompt: string) {
  const { data } = await axiosClient.post(`/ai/generate-image`, {
    prompt
  });

  return data;
}

export async function generateText(fragmentId: number, prompt: string) {
  const { data } = await axiosClient.post(`/ai-text/generate`, {
    fragmentId,
    prompt
  });

  return data.content;
}

export async function updateStory(id: string, status: string) {
  await axiosClient.put(`/stories/status/${id}`, status);
}

export async function createRating(rating: RatingModel) {
  const { data } = await axiosClient.post(
    `/ratings`,
    rating
  );

  return data;
}

export async function getStoryRating(storyId: string) {
  const { data } = await axiosClient.get(
    `/ratings/stories/${storyId}`
  );

  return data as number;
}

export async function getUserStoryRating(storyId: string, userId: number) {
  const { data } = await axiosClient.get(
    `/ratings/stories/${storyId}/users/${userId}`
  );

  return data as number | null;
}