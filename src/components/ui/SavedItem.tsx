import Link from 'next/link';

interface SavedItemProps {
  author: string;
  title: string;
}

export const SavedItem = ({ author, title }: SavedItemProps) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{author}</span>
      <Link href="#" className="text-base text-black font-bold hover:underline">
        {title}
      </Link>
    </div>
  );
};
