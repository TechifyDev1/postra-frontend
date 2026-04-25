import Link from 'next/link';

interface TagListProps {
  tags: string[];
}

export const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-16">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${tag.toLowerCase()}`}
          className="border border-zinc-400 text-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors font-semibold"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};
