import type { LoreEntitiesModel } from "../models/wiki.model";


interface WikiCardProps {
    entity: LoreEntitiesModel;
    isCreator: boolean;
    onDelete: (id: number) => void;
}

export const WikiCard = ({ entity, isCreator, onDelete }: WikiCardProps) => (
    <div className="bg-[#3d2817] rounded-xl p-4 flex gap-4 border border-[#5d3511] shadow-lg group relative">
        <div className="w-20 h-20 bg-[#1a110b] rounded-lg flex-shrink-0 border border-[#5d3511] overflow-hidden flex items-center justify-center">
            <span className="text-3xl opacity-50">👤</span>
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <h4 className="text-xl font-bold text-[#f4a460]">{entity.name}</h4>
                {isCreator && (
                    <button 
                        onClick={() => onDelete(entity.id)}
                        className="text-red-800 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                    >
                        ✕
                    </button>
                )}
            </div>
            <p className="text-sm text-[#d2b48c] mt-1 line-clamp-2">{entity.description}</p>
            <p className="text-xs text-[#8e511a] mt-2 font-semibold">
                First appearance: Fragment {entity.firstFragmentId || 'Unknown'}
            </p>
        </div>
    </div>
);