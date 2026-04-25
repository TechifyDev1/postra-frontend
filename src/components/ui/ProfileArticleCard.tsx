import Link from 'next/link';
import Image from 'next/image';

interface ProfileArticleCardProps {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
  featured?: boolean;
}

export const ProfileArticleCard = ({
  date,
  title,
  excerpt,
  category,
  readTime,
  image,
  featured = false,
}: ProfileArticleCardProps) => {
  if (featured && image) {
    return (
      <article className="border border-zinc-200 flex flex-col md:flex-row group hover:bg-zinc-50 transition-colors duration-300">
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{date}</span>
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-4xl font-medium leading-tight tracking-tight text-black mb-4 group-hover:underline underline-offset-4 decoration-1">
              {title}
            </h2>
            <p className="text-base text-zinc-600 line-clamp-4 leading-relaxed">{excerpt}</p>
          </div>
          <div className="mt-8 pt-4 border-t border-zinc-200 flex items-center justify-between">
            <span className="text-xs text-black uppercase tracking-widest font-semibold">{category}</span>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{readTime}</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-zinc-100">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </article>
    );
  }

  return (
    <article className="border border-zinc-200 p-6 flex flex-col justify-between group hover:bg-zinc-50 transition-colors duration-300">
      <div>
        <span className="text-xs text-zinc-500 block mb-4 uppercase tracking-widest font-semibold">{date}</span>
        <h3 className="text-3xl font-medium text-black mb-2 group-hover:underline underline-offset-4 decoration-1">
          {title}
        </h3>
        <p className="text-base text-zinc-600 line-clamp-3 leading-relaxed">{excerpt}</p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-xs text-black uppercase tracking-widest font-semibold">{category}</span>
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </article>
  );
};
