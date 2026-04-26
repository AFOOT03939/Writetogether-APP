import axiosClient from "../../../api/axiosClient"
import type { StoriesModel, StoriesModelRequest } from "../models/story.model"

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

export async function createComment(storyId: string, message: string) {
  const { data } = await axiosClient.post(`/story-messages`, {
    storyId,
    message
  });

  return data;
}

export async function updateComment(id: number, message: string) {
  await axiosClient.put(`/story-messages/${id}`, {
    message
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
