import BackLink from "./components/BackLink";

export default function NotFound({ message }: { message?: string }) {
  return (
    <div className="flex items-center flex-col gap-2 text-2xl justify-center bg-terminal-bg text-terminal-strong h-screen w-screen">
      404 | Page not found
      {message && (
        <span className="text-base text-terminal-comment">{message}</span>
      )}
      <BackLink className="text-lg" href="/">
        Back to Home
      </BackLink>
    </div>
  );
}
