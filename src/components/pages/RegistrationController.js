import React, { useState } from "react";
import SuccessfullSignUpPage from "./SuccessfullSignUpPage";
import Register from "../register.component";
function RegistrationController() {
  const [isSuccessfull, setIsSuccessful] = useState(false);

  const setState = () => {
    setIsSuccessful(true);
  };
  return (
    <div>
      {isSuccessfull ? (
        <SuccessfullSignUpPage></SuccessfullSignUpPage>
      ) : (
        <Register setState={setState}></Register>
      )}
    </div>
  );
}

export default RegistrationController;
