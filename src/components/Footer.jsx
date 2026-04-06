export default function Footer({ compact = false }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t border-bg-tertiary ${compact ? 'py-1 px-2' : 'py-8'}`}>
      <div className="text-center">
        <p className={`text-text-secondary ${compact ? 'text-[10px]' : 'text-sm'}`}>
          © {currentYear} Your Name. Built with React + Vite + Tailwind.
        </p>
      </div>
    </footer>
  );
}
