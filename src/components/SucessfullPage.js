import React from "react";
import video from "../asset/videos/video-1.mp4";
function SuccessfullPage() {
  return (
    <div className="herosection-container">
      <video src={video} autoPlay loop muted></video>
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <div className="text-center registration-text">
            Your password has been reset successfully
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfullPage;
