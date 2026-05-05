export interface LoreEntitiesModel {
    id: number;
    storyId: number;
    name: string;
    type: 'character' | 'place' | 'object' | 'event' | string; 
    description: string | null;
    importance: number | null;
    firstFragmentId: number | null;
}

// Opcional: Un tipo para cuando estás creando una entidad nueva
// (el ID no existe aún y el StoryId lo sacas de la URL)
export type CreateLoreEntityDTO = Omit<LoreEntitiesModel, 'id'>;