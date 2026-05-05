import axiosClient from "../../../api/axiosClient";
import type { LoreEntitiesModel } from "../models/wiki.model";


export async function getLoreByStory(storyId: string | number) {
    const { data } = await axiosClient.get(`/loreentities/story/${storyId}`);
    return data;
}

export async function createLoreEntity(entity: Partial<LoreEntitiesModel>) {
    const { data } = await axiosClient.post("/loreentities", entity);
    return data;
}

export async function deleteLoreEntity(id: number) {
    const { data } = await axiosClient.delete(`/loreentities/${id}`);
    return data;
}

// Para el resumen generado por IA
export async function generateAiSummary(storyId: number, prompt: string) {
    const { data } = await axiosClient.post(`/ai-text/generate-full/${storyId}`, { prompt });
    return data;
}

export async function getFullWikiData(storyId: string | number) {
    // Llamamos al nuevo endpoint del service que orquestamos
    const { data } = await axiosClient.get(`/loreentities/story/${storyId}/full-wiki`);
    return data; 
}