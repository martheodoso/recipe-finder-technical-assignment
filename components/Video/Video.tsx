import { twMerge } from "tailwind-merge";

type Props = {
  videoLink: string;
  title: string;
  className: string
}

const Video = ({ videoLink, title, className }: Props) => {

  const src = videoLink.includes("embed") ? videoLink : videoLink.replace("watch?v=", "embed/");

  return (videoLink && (
    <div className={twMerge(className)}>
      <h2 className="text-2xl font-semibold mb-2 text-white">Video Tutorial:</h2>
      <iframe width="100%" height="315"
        src={src}
        title={`${title} video`}
        className="rounded"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy" />
    </div>));
}

export default Video;