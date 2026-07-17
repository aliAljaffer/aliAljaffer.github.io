export default function Footer() {
  return (
    <footer className="px-6 py-3 border-t border-neutral-950 dark:border-neutral-100 text-center text-xs text-neutral-600 dark:text-neutral-400">
      © {new Date().getFullYear()} Ali Aljaffer
      {" · "}
      <a href="/rss.xml" className="hover:text-neutral-950 dark:hover:text-neutral-50 hover:underline">
        RSS
      </a>
    </footer>
  );
}
