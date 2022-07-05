import React from "react";

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <div className="login__content__password-reminder">
      <p>
        <span className="u-link" onClick={onClick}>
          Forgot your password?
        </span>
      </p>
    </div>
  </>
);

export default ForgottenPassword;
