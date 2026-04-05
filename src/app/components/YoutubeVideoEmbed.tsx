export default function YoutubeVideoEmbed({
  youtubeLink,
}: {
  youtubeLink: string;
}) {
  let videoId: string = "";
  if (!youtubeLink) return null;
  if (!youtubeLink.includes("/embed/"))
    videoId = new URLSearchParams(new URL(youtubeLink).search).get("v") + "";
  if (youtubeLink.includes("/embed/"))
    videoId = youtubeLink
      .split("/embed/")[1]
      .substring(0, youtubeLink.split("/embed/")[1].indexOf("?"));
  console.log(videoId);
  return (
    <iframe
      className="aspect-16/9"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
