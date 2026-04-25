import { HomeNavigation } from '@/components/layout/HomeNavigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { ProfileArticleCard } from '@/components/ui/ProfileArticleCard';
import Image from 'next/image';

const articles = [
  {
    date: 'Nov 12, 2023',
    title: 'The Brutalism of Silence',
    excerpt: 'In an era of relentless broadcasting, intentional quiet has become a radical act. Examining the architecture of soundless spaces and what they demand of us when we finally step inside.',
    category: 'Essay',
    readTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80',
    featured: true,
  },
  {
    date: 'Oct 28, 2023',
    title: 'Ghosts in the Grid',
    excerpt: 'Why the perfect alignment of modern user interfaces leaves us feeling empty, and the search for digital wabi-sabi.',
    category: 'Critique',
    readTime: '10 min read',
  },
  {
    date: 'Sep 15, 2023',
    title: 'Notes on Nostalgia',
    excerpt: 'A fragmented diary of returning to a hometown that no longer exists outside of memory.',
    category: 'Memoir',
    readTime: '8 min read',
  },
];

export default function ProfilePage() {
  return (
    <div className="bg-[#fbf9f9] text-black antialiased selection:bg-black selection:text-white">
      <HomeNavigation />

      <main className="w-full max-w-[720px] mx-auto px-6 py-12 pb-32 md:pb-12">
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row gap-8 items-start border-b border-zinc-200 pb-8 mb-8">
          <div className="shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden border border-zinc-300 p-1">
              <div className="w-full h-full bg-zinc-200" />
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center pt-2">
            <h1 className="text-6xl font-semibold leading-tight tracking-tight text-black mb-2">E. Vance</h1>
            <p className="text-xs text-zinc-600 mb-4 uppercase tracking-widest font-semibold">@eleanor_v</p>
            <p className="text-base text-black max-w-lg mb-8 leading-relaxed">
              Cultural critic and essayist documenting the intersection of architecture, memory, and modern isolation. Words in Postra, The Atlantic, and nowhere else.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="bg-black text-white text-xs px-6 py-3 uppercase tracking-widest hover:bg-zinc-800 transition-colors font-semibold">
                Edit Profile
              </button>
              <button className="border border-zinc-400 text-black text-xs px-6 py-3 uppercase tracking-widest hover:bg-zinc-100 transition-colors font-semibold">
                Stats
              </button>
              <button className="border border-zinc-400 text-black text-xs px-4 py-3 uppercase tracking-widest hover:bg-zinc-100 transition-colors flex items-center justify-center md:hidden font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="flex gap-8 border-b border-zinc-200 mb-16">
          <button className="text-xs text-black uppercase tracking-widest pb-3 border-b-2 border-black font-semibold">
            Published <span className="text-zinc-400 ml-1">(12)</span>
          </button>
          <button className="text-xs text-zinc-500 uppercase tracking-widest pb-3 hover:text-black transition-colors font-semibold">
            Drafts <span className="text-zinc-400 ml-1">(3)</span>
          </button>
          <button className="text-xs text-zinc-500 uppercase tracking-widest pb-3 hover:text-black transition-colors font-semibold">
            Saved <span className="text-zinc-400 ml-1">(8)</span>
          </button>
        </nav>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12">
            <ProfileArticleCard {...articles[0]} />
          </div>
          <div className="md:col-span-6">
            <ProfileArticleCard {...articles[1]} />
          </div>
          <div className="md:col-span-6">
            <ProfileArticleCard {...articles[2]} />
          </div>
        </div>
      </main>

      <MobileNav activeTab="profile" />
    </div>
  );
}
