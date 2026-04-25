import { HomeNavigation } from '@/components/layout/HomeNavigation';
import { Footer } from '@/components/layout/Footer';
import { FeedItem } from '@/components/ui/FeedItem';
import { FeaturedCarousel } from '@/components/ui/FeaturedCarousel';
import { FollowCard } from '@/components/ui/FollowCard';
import { getPosts } from '@/lib/api/client';
import { headers } from 'next/headers';

export default async function HomePage() {
  // Access headers to make this dynamic (fixes Math.random() error)
  await headers();
  
  let feedItems = [];
  let followSuggestions: Array<{ name: string; role: string; username: string }> = [];

  try {
    const res = await fetch(getPosts(0, 30), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'no-store'
    });

    if (res.ok) {
      const data = await res.json();
      feedItems = data.content || [];
      
      // Extract unique authors from posts for "Who to follow"
      const uniqueAuthors = new Map();
      feedItems.forEach((post: any) => {
        if (!uniqueAuthors.has(post.username)) {
          uniqueAuthors.set(post.username, {
            name: post.authorFullName,
            role: 'Writer',
            username: post.username,
          });
        }
      });
      
      // Get first 3 unique authors (deterministic, no random)
      const authorsArray = Array.from(uniqueAuthors.values());
      followSuggestions = authorsArray.slice(0, 3);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  // Separate featured posts (first 3 with banners) from regular posts
  const featuredPosts = feedItems.filter((post: any) => post.postBanner).slice(0, 3);
  const regularPosts = feedItems.slice(featuredPosts.length > 0 ? 1 : 0);

  return (
    <div className="bg-[#fbf9f9] text-black font-sans min-h-screen flex flex-col antialiased">
      <HomeNavigation />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-6">
        {/* Main Feed */}
        <div className="w-full md:w-[720px] shrink-0 flex flex-col gap-16 border-r border-zinc-200 pr-6">
          {feedItems.length > 0 ? (
            <>
              {/* Featured Carousel */}
              {featuredPosts.length > 0 && (
                <>
                  <FeaturedCarousel posts={featuredPosts} />
                  <hr className="border-t border-zinc-200 w-full" />
                </>
              )}

              {/* Regular Posts */}
              {regularPosts.map((post: any) => (
                <FeedItem
                  key={post.id}
                  author={post.authorFullName}
                  username={post.username}
                  slug={post.slug}
                  date={new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  title={post.title}
                  excerpt={post.subTitle || ''}
                  readTime="5 min read"
                  initialLikes={post.likeCount || 0}
                  initialComments={post.commentCount || 0}
                  postBanner={post.postBanner}
                  featured={false}
                />
              ))}
            </>
          ) : (
            <p className="text-zinc-500 text-center py-12">No posts available yet.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col flex-grow gap-16 pl-6 max-w-sm pt-4">
          {/* Who to follow */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-black border-b border-black pb-2 mb-2">
              Who to follow
            </h3>
            {followSuggestions.length > 0 ? (
              followSuggestions.map((person, index) => (
                <FollowCard key={index} {...person} />
              ))
            ) : (
              <p className="text-xs text-zinc-500">No suggestions available</p>
            )}
          </section>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
