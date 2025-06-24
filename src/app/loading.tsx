export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-bg">
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full bounce-dot bg-terminal-strong"></div>
        <div className="w-4 h-4 rounded-full bounce-dot bg-terminal-accent"></div>
        <div className="w-4 h-4 rounded-full bounce-dot bg-terminal-link"></div>
      </div>
    </div>
  );
}
