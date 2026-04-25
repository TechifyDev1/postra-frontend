import Link from 'next/link';

interface StoryItemProps {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  author: string;
  username: string;
  slug: string;
}

export const StoryItem = ({ category, date, title, excerpt, author, username, slug }: StoryItemProps) => {
  return (
    <article className="group cursor-pointer">
      <Link href={`/${username}/${slug}`}>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-grow flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-zinc-500">
              <span>{category}</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
              <span>{date}</span>
            </div>
            <h2 className="text-4xl font-medium leading-tight tracking-tight text-black group-hover:text-zinc-600 transition-colors">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 line-clamp-3">
              {excerpt}
            </p>
            <div className="text-xs text-black mt-2 uppercase tracking-widest font-semibold">
              By {author}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};
