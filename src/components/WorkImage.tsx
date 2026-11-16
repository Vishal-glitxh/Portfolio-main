import { useState } from "react";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  onOpen?: () => void;
}

const WorkImage = ({ image, alt = "Project artwork", video, onOpen }: Props) => {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="work-image">
      {video && playing ? (
        <video src={video} poster={image} controls playsInline autoPlay onError={() => setPlaying(false)} aria-label={`${alt} video`} />
      ) : (
        <button type="button" className="work-image-in work-image-button" onClick={event => { event.stopPropagation(); onOpen?.(); }} aria-label={`Enlarge ${alt}`}>
          {failed ? <span className="work-image-fallback">Artwork unavailable · Open project details for more information</span> : <img src={image} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
        </button>
      )}
      {video && <button type="button" className="work-video-toggle" onClick={event => { event.stopPropagation(); setPlaying(value => !value); }}>{playing ? "Pause video" : "Play video"}</button>}
    </div>
  );
};

export default WorkImage;
