import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-white w-full border-t border-zinc-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link 
          href="/" 
          className="text-lg font-bold text-black opacity-100 hover:opacity-80 transition-opacity uppercase tracking-tighter"
        >
          Postra
        </Link>

        <nav className="flex flex-wrap justify-center gap-6 font-serif text-[11px] uppercase tracking-widest">
          <Link href="#" className="text-zinc-600 hover:text-black transition-colors">
            Terms
          </Link>
          <Link href="#" className="text-zinc-600 hover:text-black transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-zinc-600 hover:text-black transition-colors font-bold underline">
            Archive
          </Link>
          <Link href="#" className="text-zinc-600 hover:text-black transition-colors">
            Masthead
          </Link>
          <Link href="#" className="text-zinc-600 hover:text-black transition-colors">
            Twitter
          </Link>
        </nav>

        <div className="font-serif text-[11px] uppercase tracking-widest text-zinc-600 text-center md:text-right">
          © 2024 Postra. The Cadence of the Written Word.
        </div>
      </div>
    </footer>
  );
};
