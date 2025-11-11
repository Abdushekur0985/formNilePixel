import React from "react";
import "./home.css";

function Tutorial() {
  const videosRow1 = [
    "https://www.youtube.com/embed/0MbgV9EddSw?si=ROiY9JwJZZTjQ0fg",
    "https://www.youtube.com/embed/0MbgV9EddSw?si=ROiY9JwJZZTjQ0fg",
    "https://www.youtube.com/embed/0MbgV9EddSw?si=-F7YkDi2mUCek4xt",
    "https://www.youtube.com/embed/pjtdwpruY-k?si=KgmJP_UdakkCek4g",
    "https://www.youtube.com/embed/45jknzrF8CA?si=z99snNbuZd_7pMm5",
  ];

  const videosRow2 = [
    "https://www.youtube.com/embed/NEdi9zVj6FM?si=FYzofnoOfmDaPTqN",
    "https://www.youtube.com/embed/kDE31AmaIAM?si=TkwW2sOy9OXP7C-W",
    "https://www.youtube.com/embed/VZKNq5xHP-4?si=ovJNydXIdbY7hGzM",
    "https://www.youtube.com/embed/FXiV6v9j5hs?si=YhZXVfgBFx5GHSic",
    "https://www.youtube.com/embed/XKNSgDL3xgM?si=fXKmEetyOBQtl3Q2",
    "https://www.youtube.com/embed/7S_tz1z_5bA?si=2Hfa-RzVSuNvM23X",
  ];

  //  Opens the YouTube video in a new tab when clicked
  const handleVideoClick = (src) => {
    // Extract the base video URL for opening in YouTube
    const watchUrl = src.replace("/embed/,/embed/").split("?")[0];
    window.open(watchUrl, "_blank");
  };

//   header style 




  return (
    <div className="home-container">
     <h1>Welcome to Abdushekur's Tutorial Hub</h1>


      {/* Row 1 */}
      <div className="video-row">
        <div className="video-track">
          {videosRow1.map((src, i) => (
            <div
              key={`row1-${i}`}
              className="video-wrapper"
              onClick={() => handleVideoClick(src)}
            >
              <iframe
                src={src}
                title={`video-row1-${i}`}
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
          {/* Duplicate for infinite scrolling */}
          {videosRow1.map((src, i) => (
            <div
              key={`row1-dup-${i}`}
              className="video-wrapper"
              onClick={() => handleVideoClick(src)}
            >
              <iframe
                src={src}
                title={`video-row1-dup-${i}`}
                frameBorder="0"
                allow=" encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="video-row reverse">
        <div className="video-track">
          {videosRow2.map((src, i) => (
            <div
              key={`row2-${i}`}
              className="video-wrapper"
              onClick={() => handleVideoClick(src)}
            >
              <iframe
                src={src}
                title={`video-row2-${i}`}
                frameBorder="0"
                allow=" encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
          {/* Duplicate for infinite scrolling */}
          {videosRow2.map((src, i) => (
            <div
              key={`row2-dup-${i}`}
              className="video-wrapper"
              onClick={() => handleVideoClick(src)}
            >
              <iframe
                src={src}
                title={`video-row2-dup-${i}`}
                frameBorder="0"
                allow=" encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
