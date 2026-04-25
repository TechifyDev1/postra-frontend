import Link from 'next/link';

export const ArticleFooter = () => {
  return (
    <footer className="bg-white text-black text-sm uppercase tracking-widest w-full border-t border-zinc-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full py-12 px-6 max-w-7xl mx-auto gap-8 md:gap-0">
        <div className="font-black text-lg text-black">POSTRA</div>
        
        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="text-zinc-500 hover:text-black transition-colors duration-200">
            Terms
          </Link>
          <Link href="#" className="text-zinc-500 hover:text-black transition-colors duration-200">
            Privacy
          </Link>
          <Link href="#" className="underline font-bold hover:text-black transition-colors duration-200">
            Archive
          </Link>
          <Link href="#" className="text-zinc-500 hover:text-black transition-colors duration-200">
            Masthead
          </Link>
          <Link href="#" className="text-zinc-500 hover:text-black transition-colors duration-200">
            Twitter
          </Link>
        </nav>
        
        <div className="text-zinc-500 text-center md:text-right text-xs">
          © 2024 POSTRA. THE CADENCE OF THE WRITTEN WORD.
        </div>
      </div>
    </footer>
  );
};
