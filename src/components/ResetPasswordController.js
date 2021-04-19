import React, { useState } from "react";
import SuccessfullPage from "./SucessfullPage";
import EmailPage from "./EmailPage";
import EmailCodePage from "./EmailCodePage";
import ResetPasswordForm from "./ResetPasswordForm";
import video from "../asset/videos/video-1.mp4";
const ResetPasswordController = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isSuccessfull, setIsSuccessful] = useState(false);
  const [isPasswordSubmitted, setPasswordSubmitted] = useState(false);
  function submitForm() {
    setIsSubmitted(true);
  }
  function didEmailExists() {
    setIsEmailExists(true);
  }

  function submitCode() {
    setIsSuccessful(true);
  }

  function resetPassword() {
    setPasswordSubmitted(true);
  }
  return (
    <>
      <div>
        <video src={video} autoPlay loop muted></video>
        {!isSubmitted
          ? [
              isEmailExists ? (
                <div className="text-alert">
                  <EmailPage
                    submitForm={submitForm}
                    didEmailExists={didEmailExists}
                    emailNotExistsText="No account found or invalid email adress"
                    // didVerify={didVerify}
                  />
                </div>
              ) : (
                <EmailPage
                  submitForm={submitForm}
                  didEmailExists={didEmailExists}

                  // didVerify={didVerify}
                />
              ),
            ]
          : [
              isSuccessfull ? (
                [
                  isPasswordSubmitted ? (
                    <SuccessfullPage></SuccessfullPage>
                  ) : (
                    <ResetPasswordForm
                      resetPassword={resetPassword}
                    ></ResetPasswordForm>
                  ),
                ]
              ) : (
                <EmailCodePage submitCode={submitCode}></EmailCodePage>
              ),
            ]}
      </div>
    </>
  );
};

export default ResetPasswordController;
