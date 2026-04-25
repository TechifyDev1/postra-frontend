import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StoryItem } from '@/components/ui/StoryItem';
import { getPosts } from '@/lib/api/client';
import Image from 'next/image';

export default async function Home() {
  let stories = [];

  try {
    const res = await fetch(getPosts(0, 3), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'no-store'
    });

    if (res.ok) {
      const data = await res.json();
      stories = data.content || [];
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  return (
    <div className="antialiased min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Navigation />
      
      <main className="flex-grow flex flex-col items-center w-full">
        {/* Minimal Hero Section with Banner */}
        <section className="w-full max-w-[1200px] mx-auto px-12 py-32 text-center flex flex-col items-center justify-center min-h-[512px] relative">
          {/* Optional: Subtle banner background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Image
              src="/postra-banner.jpg"
              alt=""
              fill
              className="object-cover grayscale"
              priority
            />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-6xl font-semibold leading-tight tracking-tight text-black max-w-2xl text-center">
              The essence of thought, captured in ink.
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-zinc-600 mt-8 max-w-xl text-center">
              A sanctuary for writers and readers who value clarity above all else. No noise, just words.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-[1200px] mx-auto px-12">
          <hr className="border-t border-zinc-200 w-full" />
        </div>

        {/* Featured Stories List */}
        <section className="w-full max-w-[720px] mx-auto px-12 py-32 flex flex-col gap-16">
          {stories.length > 0 ? (
            <>
              {stories.map((post: any, index: number) => (
                <div key={post.id}>
                  <StoryItem
                    category="Story"
                    date={new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    title={post.title}
                    excerpt={post.subTitle || ''}
                    author={post.authorFullName}
                    username={post.username}
                    slug={post.slug}
                  />
                  {index < stories.length - 1 && (
                    <hr className="border-t border-zinc-200 w-full mt-16" />
                  )}
                </div>
              ))}

              <div className="flex justify-center mt-8">
                <a href="/home" className="border border-black text-black px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors inline-block">
                  Explore More Stories
                </a>
              </div>
            </>
          ) : (
            <p className="text-zinc-500 text-center py-12">No stories available yet.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
