interface Props {
  label: string;
  onRemove: () => void;
}

export default function TagItem({ label, onRemove }: Props) {
  return (
    <div className="flex items-center gap-2 bg-(--color-bg-main) border border-(--color-border) px-3 py-1 rounded-lg text-xs">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-600 font-bold"
      >
        ✕
      </button>
    </div>
  );
}