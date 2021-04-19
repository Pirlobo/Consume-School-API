import React, { useEffect, useContext } from "react";
import "../../App.css";
import { Button } from "../Button";
import "./HeroSection.css";
import video from "../../asset/videos/video-1.mp4";
import { UserContext } from "../../useContext";
function HeroSection() {
  const context = useContext(UserContext);
  return (
    <div className="hero-container">
      <video cas src={video} autoPlay loop muted />
      <h1>Hi, It's Anh Here</h1>
      <p>A Web Developer {context}</p>
      <div className=" hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          WATCH TRAILER <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
    //   <div class="row">
    //   <div class="col-sm-6" >
    //     <p>Lorem ipsum...</p>
    //   </div>
    //   <div class="col-sm-6">
    //     <p>Sed ut perspiciatis...</p>
    //   </div>
    // </div>
  );
}

export default HeroSection;
