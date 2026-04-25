import Link from 'next/link';

interface SearchResultItemProps {
  author: string;
  date: string;
  title: string;
  excerpt: string;
}

export const SearchResultItem = ({ author, date, title, excerpt }: SearchResultItemProps) => {
  return (
    <article className="flex flex-col gap-2 group cursor-pointer border-b border-zinc-200 pb-8">
      <div className="flex items-center gap-2 text-xs text-zinc-600 uppercase mb-1 font-semibold tracking-widest">
        <span>{author}</span>
        <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
        <span>{date}</span>
      </div>
      <Link href="#">
        <h2 className="text-3xl font-medium text-black group-hover:opacity-70 transition-opacity leading-tight tracking-tight">
          {title}
        </h2>
      </Link>
      <p className="text-base text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
        {excerpt}
      </p>
    </article>
  );
};
