// The painted plate from the branding repo (public/brand, vendored by `npm run brand`).
// Decorative, so alt is empty. Width and height are set so the layout does not shift while it loads.
export default function BrandPlate() {
  const common = "block w-full h-auto max-h-40 object-cover object-top rounded-t-2xl select-none";
  return (
    <div className="shrink-0 w-full max-w-4xl mx-auto px-6" aria-hidden="true">
      <img src="/brand/plate-day.webp" alt="" width={2000} height={420} decoding="async" fetchPriority="high" className={`${common} dark:hidden`} />
      <img src="/brand/plate-night.webp" alt="" width={2000} height={420} decoding="async" className={`${common} hidden dark:block`} />
    </div>
  );
}
