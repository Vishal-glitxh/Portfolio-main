import { useEffect } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  useEffect(() => {
    if (percent < 100) return;
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [percent, setIsLoading]);

  return (
    <>
      <div className="loading-screen" role="status" aria-live="polite">
        <span className="loading-mark">~VS</span>
        <span>Loading portfolio</span>
      </div>
    </>
  );
};

export default Loading;


