export default function Footer() {
  return (
    <footer className="bg-[#1c1714] border-t border-[#2e2926] py-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-silkscreen text-[9px] text-[#4a4238] tracking-wider">
          © 2026 DIHAS SATHNINDU
        </p>
        <div className="rainbow-bar rounded-full" style={{ width: 48, height: 3 }} />
        <p className="font-jakarta text-sm text-[#4a4238]">
          Also building{" "}
          <a
            href="https://darvincode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9fead3] hover:text-[#f9f5ef] transition-colors duration-200 underline underline-offset-2"
          >
            darvincode.com
          </a>
          {" →"}
        </p>
      </div>
    </footer>
  );
}
