import Image from 'next/image';
import Link from 'next/link';
import { DefaultAvatar } from './DefaultAvatar';

interface AuthorBioProps {
  author: {
    name: string;
    image?: string;
    bio: string;
  };
  username?: string;
}

export const AuthorBio = ({ author, username }: AuthorBioProps) => {
  return (
    <div className="bg-zinc-100 p-8 flex flex-col md:flex-row gap-6 items-start">
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name}
            fill
            sizes="96px"
            className="object-cover grayscale"
          />
        ) : (
          <DefaultAvatar size={96} className="w-full h-full" />
        )}
      </div>
      <div>
        <h3 className="text-3xl font-medium mb-2">{author.name}</h3>
        <p className="text-base text-zinc-600 mb-4 leading-relaxed">
          {author.bio || 'Writer and contributor to Postra.'}
        </p>
        {username && (
          <Link
            href={`/${username}/#posts`}
            className="text-xs text-black uppercase tracking-widest border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-colors font-semibold"
          >
            VIEW ALL STORIES
          </Link>
        )}
      </div>
    </div>
  );
};
