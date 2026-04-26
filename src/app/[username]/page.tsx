import { HomeNavigation } from '@/components/layout/HomeNavigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { ProfileStoryItem } from '@/components/ui/ProfileStoryItem';
import { ProfileHeader } from '@/components/ui/ProfileHeader';
import { getUserUrl, getUserPostsUrl, frontendBaseUrl, getPosts } from '@/lib/api/client';
import { calculateReadTime } from '@/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

// Generate static params - return at least one to satisfy cacheComponents
export async function generateStaticParams() {
  try {
    const res = await fetch(getPosts(0, 10), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      return [{ username: 'placeholder' }];
    }
    
    const data = await res.json();
    const posts = data.content || [];
    
    if (posts.length === 0) {
      return [{ username: 'placeholder' }];
    }
    
    const uniqueUsernames = [...new Set(posts.map((post: any) => post.username))] as string[];
    
    return uniqueUsernames.map((username) => ({
      username,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ username: 'placeholder' }];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ username: string }> 
}): Promise<Metadata> {
  try {
    const { username } = await params;
    const res = await fetch(getUserUrl(username), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
    });

    if (!res.ok) {
      return {
        title: 'Writer Not Found | Postra',
      };
    }

    const user = await res.json();
    const userData = user.data || user;
    const profileUrl = `${frontendBaseUrl}/${username}`;

    return {
      title: `${userData.fullName} | Postra`,
      description: userData.bio || `Read articles by ${userData.fullName} on Postra`,
      alternates: {
        canonical: profileUrl,
      },
      openGraph: {
        title: `${userData.fullName} | Postra`,
        description: userData.bio || `Read articles by ${userData.fullName} on Postra`,
        url: profileUrl,
        type: 'profile',
        images: (userData.profilePictureUrl || userData.profilePic) ? [
          {
            url: userData.profilePictureUrl || userData.profilePic,
            width: 400,
            height: 400,
            alt: userData.fullName,
          },
        ] : [],
        siteName: 'Postra',
      },
      twitter: {
        card: 'summary',
        title: `${userData.fullName} | Postra`,
        description: userData.bio || `Read articles by ${userData.fullName} on Postra`,
        images: (userData.profilePictureUrl || userData.profilePic) ? [userData.profilePictureUrl || userData.profilePic] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Writer Profile | Postra',
    };
  }
}

export default async function WriterProfilePage({ 
  params 
}: { 
  params: Promise<{ username: string }> 
}) {
  const { username } = await params;
  let user;
  let userData;
  let stories = [];

  try {
    const userRes = await fetch(getUserUrl(username), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'force-cache'
    });

    if (!userRes.ok) {
      notFound();
    }

    user = await userRes.json();
    userData = user.data || user;

    // Fetch user's stories
    const storiesRes = await fetch(getUserPostsUrl(username, 0, 20), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'force-cache'
    });

    if (storiesRes.ok) {
      const storiesData = await storiesRes.json();
      stories = storiesData.content || [];
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    notFound();
  }

  return (
    <div className="bg-[#fbf9f9] text-black antialiased selection:bg-black selection:text-white">
      <HomeNavigation />

      <main className="w-full max-w-[720px] mx-auto px-6 py-16 md:py-32 min-h-screen pb-32">
        {/* Profile Header */}
        <ProfileHeader userData={userData} />

        {/* Divider */}
        <hr className="border-t border-zinc-200 mb-16" />

        {/* Published Stories List */}
        <section className="flex flex-col gap-16" id='posts'>
          <h2 className="text-xs text-zinc-400 uppercase tracking-widest mb-2 font-semibold">Selected Works</h2>

          {stories.map((story: any, index: number) => (
            <div key={story.id} className="relative">
              <Link href={`/${username}/${story.slug}`}>
                <ProfileStoryItem
                  date={new Date(story.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  readTime={calculateReadTime(story.content)}
                  title={story.title}
                  excerpt={story.subTitle || ''}
                  slug={story.slug}
                  username={username}
                />
              </Link>
              {index < stories.length - 1 && (
                <hr className="border-t border-zinc-200 border-dashed mt-16" />
              )}
            </div>
          ))}

          {stories.length === 0 && (
            <p className="text-zinc-500 text-center py-12">No published stories yet.</p>
          )}

          {stories.length > 0 && (
            <div className="mt-4">
              <button className="text-black text-xs uppercase tracking-widest hover:text-zinc-600 transition-colors inline-flex items-center gap-2 border-b border-black pb-1 font-semibold">
                View all archives
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          )}
        </section>
      </main>

      <MobileNav />
    </div>
  );
}
