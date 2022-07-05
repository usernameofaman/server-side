import "./scss/index.scss";

import * as React from "react";

import { Button, Form, TextField } from "..";
import { maybe } from "../../core/utils";
import { TypedPasswordResetMutation } from "./queries";

import { passwordResetUrl } from "../../routes/";

const PasswordResetForm: React.FC = () => (
  <div className="password-reset-form">
    <h3>Forgot your password?</h3>
    <p className="pass-text">
      Please enter your email below. We'll send an email with quick login and password reset links.
    </p>
    <TypedPasswordResetMutation>
      {(passwordReset, { loading, data }) => {
        const error=data && data.requestPasswordReset && data.requestPasswordReset.errors;
        return (
          <Form
            errors={maybe(() => data.requestPasswordReset.errors, [])}
            onSubmit={(event, { email }) => {
              event.preventDefault();
              passwordReset({
                variables: {
                  email,
                  redirectUrl: `${window.location.origin}${passwordResetUrl}`,
                },
              });
            }}
          >
            <label className="emw-label">Email</label>
            <TextField
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              type="email"
              // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
              required
            />
            {
              error && error.length<=0 && 
              <p className="password-reset-success-msg">Your Request For Changing Password Submitted Successfully. Please Check your email for pasword reset links.</p>
            }
             
            <div className="password-reset-form__button">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Loading" : "Send Email"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedPasswordResetMutation>
  </div>
);

export default PasswordResetForm;
