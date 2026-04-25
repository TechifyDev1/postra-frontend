import { ArticleNavigation } from '@/components/layout/ArticleNavigation';
import { ArticleFooter } from '@/components/layout/ArticleFooter';
import { ArticleHeader } from '@/components/ui/ArticleHeader';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { TagList } from '@/components/ui/TagList';
import { CommentSection } from '@/components/ui/CommentSection';
import { getApost, getPosts, frontendBaseUrl } from '@/lib/api/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';

// Generate static params for popular articles at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(getPosts(0, 50), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      // Return a placeholder to satisfy cacheComponents requirement
      return [{ username: 'placeholder', postSlug: 'placeholder' }];
    }
    
    const data = await res.json();
    const posts = data.content || [];
    
    if (posts.length === 0) {
      return [{ username: 'placeholder', postSlug: 'placeholder' }];
    }
    
    return posts.map((post: any) => ({
      username: post.username,
      postSlug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ username: 'placeholder', postSlug: 'placeholder' }];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ username: string; postSlug: string }> 
}): Promise<Metadata> {
  try {
    const { username, postSlug } = await params;
    const res = await fetch(getApost(username, postSlug), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
    });

    if (!res.ok) {
      return {
        title: 'Article Not Found | Postra',
      };
    }

    const post = await res.json();

    const description = post.subTitle?.length > 0
      ? post.subTitle
      : (post.content?.replace(/<[^>]*>/g, "").slice(0, 150).replace(/\s+$/, "") + "...");
    
    const postUrl = `${frontendBaseUrl}/${username}/${postSlug}`;
    const postImage = (post.postBanner && post.postBanner !== "") 
      ? post.postBanner 
      : `${frontendBaseUrl}/postra-banner.jpg`;
    const title = `${post.title} | ${post.authorFullName} | Postra`;

    return {
      title: title,
      description,
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: title,
        description,
        url: postUrl,
        type: 'article',
        images: [
          {
            url: postImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        authors: [post.authorFullName],
        siteName: 'Postra',
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description,
        images: [postImage],
      },
    };
  } catch (error) {
    return {
      title: 'Article | Postra',
    };
  }
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ username: string; postSlug: string }> 
}) {
  const { username, postSlug } = await params;
  let post;

  try {
    const res = await fetch(getApost(username, postSlug), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'force-cache'
    });

    if (!res.ok) {
      notFound();
    }

    post = await res.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }

  return (
    <div className="bg-[#fbf9f9] text-black antialiased min-h-screen flex flex-col">
      <ArticleNavigation />

      <main className="flex-grow w-full max-w-[720px] mx-auto px-6 md:px-0 py-32">
        <article>
          <ArticleHeader
            category="ESSAYS"
            readTime="5 MIN READ"
            title={post.title}
            subtitle={post.subTitle}
            slug={post.slug}
            author={{
              name: post.authorFullName,
              image: post.profilePic || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
            }}
            date={new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).toUpperCase()}
            initialLikes={post.likeCount || 0}
          />

          {/* Featured Image */}
          {post.postBanner && post.postBanner !== "" && (
            <figure className="mb-16 w-full">
              <div className="relative w-full aspect-video">
                <Image
                  src={post.postBanner}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover grayscale border border-zinc-300"
                  priority
                />
              </div>
            </figure>
          )}

          {/* Article Body - render from API content */}
          <div 
            className="text-xl leading-relaxed text-black space-y-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-zinc-200">
            <TagList tags={[]} />
            <AuthorBio author={{
              name: post.authorFullName,
              image: post.profilePic || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
              bio: '',
            }} />
          </footer>

          {/* Comments Section */}
          <CommentSection postSlug={post.slug} />
        </article>
      </main>

      <ArticleFooter />
    </div>
  );
}
