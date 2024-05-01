import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const Show = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const text = searchParams.get("text");
  const youtube = searchParams.get("youtube");
  const navigate = useNavigate();

  const videoId = youtube && youtube.split("v=")[1];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p>{text}</p>
      {youtube && (
        <div>
          <p>YouTube Video:</p>
          <iframe
            title="YouTube Video"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Show;
