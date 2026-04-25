interface ProfileStoryItemProps {
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
}

export const ProfileStoryItem = ({ date, readTime, title, excerpt }: ProfileStoryItemProps) => {
  return (
    <article className="group flex flex-col gap-3 cursor-pointer">
      <div className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">
        <span>{date}</span>
        <span className="mx-2 text-zinc-400">|</span>
        <span>{readTime}</span>
      </div>
      <h3 className="text-4xl font-medium leading-tight tracking-tight text-black group-hover:text-zinc-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-base text-zinc-600 leading-relaxed">{excerpt}</p>
    </article>
  );
};
