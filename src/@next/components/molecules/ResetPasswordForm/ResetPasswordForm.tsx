import React, { useState } from "react";

import { Button } from "@components/atoms";
import { TextField } from "../TextField";

import * as S from "./styles";
import { IProps } from "./types";
import './index.scss';
import showPasswordIcon from '../../../../images/show-password-icon.svg';

export const ResetPasswordForm: React.FC<IProps> = ({
  handleBlur,
  handleChange,
  handleSubmit,
  values,
  tokenError,
  passwordError,
  errors,
}: IProps) => {
  const [showPassword, setShowPassword]=useState('password');
  const [showConfirmPassword, setShowConfirmPassword]=useState('password');
  const onChangeHandler=()=>{
    if(showPassword=="password"){
      setShowPassword('text');
    }else{
      setShowPassword('password');
    }
  }
  const onConfirmPasswordChangeHandler=()=>{
    if(showConfirmPassword=="password"){
      setShowConfirmPassword('text');
    }else{
      setShowConfirmPassword('password');
    }
  }
  return (
    <S.Wrapper>
      <h3 className="reset-password-heading">Reset your password</h3>

      <p className="reset-password-hint-text">Please provide a new password for your acocunt below.</p>
      {tokenError && (
        <S.GeneralError>
          It seems that token for password reset is not valid anymore.
        </S.GeneralError>
      )}
      <form onSubmit={handleSubmit}>
        <S.InputFields>
          <label className="reset-password-label">Password</label>
          <div className="reset-text-section">
            <TextField
              className="reset-text-field"
              placeholder="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type={showPassword}
              value={values.password}
              errors={
                errors.password || passwordError
                  ? [
                      {
                        field: "password",
                        message: errors.password || passwordError,
                      },
                    ]
                  : undefined
              }
            />
            <img src={showPasswordIcon} onClick={onChangeHandler} />
          </div>
            <label className="reset-password-label">Confirm Password</label>
            <div className="reset-text-section">
            <TextField
              className="reset-text-field"
              placeholder="Retype password"
              onBlur={handleBlur}
              name="retypedPassword"
              onChange={handleChange}
              type={showConfirmPassword}
              value={values.retypedPassword}
              errors={
                errors.retypedPassword
                  ? [
                      {
                        field: "retypedPassword",
                        message: errors.retypedPassword,
                      },
                    ]
                  : undefined
              }
            />
             <img src={showPasswordIcon} onClick={onConfirmPasswordChangeHandler} />
          </div>
        </S.InputFields>

        <Button type="submit" fullWidth={true} className='reset-password-button'>
          SET NEW PASSWORD
        </Button>
      </form>
    </S.Wrapper>
  );
};
