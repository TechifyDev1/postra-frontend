import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  category: string;
  readTime?: string;
  date: string;
  title: string;
  excerpt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  image?: string;
  featured?: boolean;
}

export const ArticleCard = ({
  category,
  readTime,
  date,
  title,
  excerpt,
  author,
  image,
  featured = false,
}: ArticleCardProps) => {
  if (featured && image) {
    return (
      <article className="group cursor-pointer">
        <Link href="#">
          <div className="aspect-[16/9] overflow-hidden bg-zinc-100 mb-4 relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase text-zinc-500 tracking-widest font-semibold">
                {category} {readTime && `/ ${readTime}`}
              </span>
              <span className="text-xs text-zinc-500 tracking-widest font-semibold">{date}</span>
            </div>
            <h3 className="text-4xl font-medium leading-tight group-hover:underline underline-offset-4 decoration-1">
              {title}
            </h3>
            {excerpt && (
              <p className="text-base text-zinc-600 max-w-2xl leading-relaxed">{excerpt}</p>
            )}
            {author && (
              <div className="flex items-center gap-3 mt-2">
                <div className="w-8 h-8 rounded-full bg-zinc-200" />
                <span className="text-xs uppercase tracking-widest font-semibold">{author.name}</span>
              </div>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group cursor-pointer">
      <Link href="#">
        <div className="h-px bg-zinc-200 mb-4" />
        <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{category}</span>
        <h3 className="text-3xl font-medium mt-2 leading-tight group-hover:italic transition-all">
          {title}
        </h3>
        <span className="text-xs uppercase mt-4 block tracking-widest font-semibold">
          {author?.name} — {date}
        </span>
      </Link>
    </article>
  );
};
