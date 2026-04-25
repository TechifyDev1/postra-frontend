import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StoryItem } from '@/components/ui/StoryItem';

const stories = [
  {
    category: 'Architecture',
    date: 'Oct 12, 2023',
    title: 'The Silent Brutalism of Modern Web Design',
    excerpt: 'In an era of infinite scroll and aggressive gradients, returning to the stark, unyielding structure of brutalist layouts offers a refreshing clarity. We explore why designers are abandoning decoration for structure.',
    author: 'Elena Rostova',
  },
  {
    category: 'Culture',
    date: 'Oct 10, 2023',
    title: 'The Lost Art of Deep Reading',
    excerpt: 'Skimming has become our default mode of consumption. What happens to our cognitive architecture when we lose the ability to sit with a difficult text for hours?',
    author: 'Marcus Thorne',
  },
  {
    category: 'Typography',
    date: 'Oct 08, 2023',
    title: 'Serifs in the Digital Age: A Resurgence',
    excerpt: 'For years, sans-serif fonts dominated screens due to low resolution. With high-DPI displays ubiquitous, the elegant, highly readable serif is reclaiming its throne in digital editorial design.',
    author: 'Julian Vance',
  },
];

export default function Home() {
  return (
    <div className="antialiased min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Navigation />
      
      <main className="flex-grow flex flex-col items-center w-full">
        {/* Minimal Hero Section */}
        <section className="w-full max-w-[720px] mx-auto px-12 py-32 text-center flex flex-col items-center justify-center min-h-[512px]">
          <h1 className="text-6xl font-semibold leading-tight tracking-tight text-black max-w-2xl text-center">
            The essence of thought, captured in ink.
          </h1>
          <p className="text-xl leading-relaxed tracking-tight text-zinc-600 mt-8 max-w-xl text-center">
            A sanctuary for writers and readers who value clarity above all else. No noise, just words.
          </p>
        </section>

        {/* Divider */}
        <div className="w-full max-w-[1200px] mx-auto px-12">
          <hr className="border-t border-zinc-200 w-full" />
        </div>

        {/* Featured Stories List */}
        <section className="w-full max-w-[720px] mx-auto px-12 py-32 flex flex-col gap-16">
          {stories.map((story, index) => (
            <div key={index}>
              <StoryItem {...story} />
              {index < stories.length - 1 && (
                <hr className="border-t border-zinc-200 w-full mt-16" />
              )}
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button className="border border-black text-black px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors">
              Load More Essays
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
