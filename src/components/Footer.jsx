export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-bg-tertiary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <p className="text-text-secondary text-sm">
          © {currentYear} {/* TODO: Replace with your name */} Your Name. Built with React + Vite + Tailwind.
        </p>
      </div>
    </footer>
  );
}
