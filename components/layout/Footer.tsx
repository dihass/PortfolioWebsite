export default function Footer() {
  return (
    <footer className="border-t border-[#162035] py-8">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#2a4060] tracking-[0.1em]">
          © 2026 Dihas Sathnindu
        </p>
        <p className="font-mono text-[10px] text-[#2a4060] tracking-[0.14em] uppercase">
          Design inspired by{" "}
          <span className="text-[#c8a94e]/50">Pantheon</span>
        </p>
        <p className="font-urbanist text-sm text-[#4a7090]">
          Also building{" "}
          <a
            href="https://darvincode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00c8ff]/70 hover:text-[#00c8ff] transition-colors duration-200"
          >
            darvincode.com
          </a>{" "}
          →
        </p>
      </div>
    </footer>
  );
}
