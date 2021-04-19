import React from "react";
import video from "../../asset/videos/video-1.mp4";
const ResetPasswordVideo = () => {
  return (
    <div className="herosection-container">
      <video src={video} autoPlay loop muted></video>
    </div>
  );
};

export default ResetPasswordVideo;
