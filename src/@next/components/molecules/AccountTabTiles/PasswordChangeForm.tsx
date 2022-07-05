import { Formik } from "formik";
import React from "react";
import { TextField } from "../TextField";

import { Button, ButtonLink } from "@components/atoms";
import { AlertManager, useAlert } from "react-alert";
import { IFormError } from "../../atoms/ErrorMessage/types";
import * as S from "./styles";


const emwStyle = {
  inputButton: {
    border: "0.5px solid #CCCED0",
    boxSizing: "border-box",
    borderRadius: "5px",
    marginTop: "5px",
    maxWidth: "300px",
    width: "300px",
    height: "38px",
    margin: "10px 0 10px 0",
    background: "whitesmoke",
    padding: "0 0 0 14px",
    outline: "none"
  },
  inputButtonError: {
    border: "1px solid #df3826",
    boxSizing: "border-box",
    borderRadius: "5px",
    marginTop: "5px",
    maxWidth: "300px",
    width: "300px",
    height: "38px",
    margin: "10px 0 10px 0",
    background: "whitesmoke",
    padding: "0 0 0 14px",
    outline: "none"
  },
  changePasswordWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0 0 0 10px"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 0 20px 0"
  },
  inputErrors: {
    color: "#df3826"
  }
}

export const PasswordChangeForm: React.FC<{

  handleSubmit: (data: any) => void;
  hide: () => void;
  error?: IFormError[];
  cancelClick: any;
}> = ({ handleSubmit, hide, error, cancelClick }) => {
  const [enableButton, setEnableButton] = React.useState(false)
  const [fieldErrors, setFieldErrors] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [values, setValues] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (e.target.name === "confirmPassword") {
      if (e.target.value !== values.newPassword)
        setFieldErrors({ ...fieldErrors, ["confirmPassword"]: "Passwords confirmation do not match" })
      else
        setFieldErrors({ ...fieldErrors, ["confirmPassword"]: "" })
    }
    if (e.target.name === "newPassword") {
      if (e.target.value !== values.confirmPassword)
        setFieldErrors({ ...fieldErrors, ["confirmPassword"]: "Passwords confirmation do not match" })
      else
        setFieldErrors({ ...fieldErrors, ["confirmPassword"]: "" })
    }
  }

  const submitPasswordChange = () => {
    if(values.newPassword.length && values.newPassword.length < 8){
      setFieldErrors({...fieldErrors, ["confirmPassword"]: "Password must be at least 8 characters"})
      return
    }
    handleSubmit({
      oldPassword : values.oldPassword,
      newPassword : values.newPassword
    })
  }

  return (
    <>
      <div style={emwStyle.changePasswordWrapper}>
        <span className="password-form-label">Current Password</span>
        <input
          name="oldPassword"
          type="password"
          className={fieldErrors.oldPassword !== "" ? "inputError" : "inputErrorsNone"}
          style={emwStyle.inputButton}
          value={values.oldPassword}
          onChange={handleChange}
        />
        <span style={emwStyle.inputErrors}>{fieldErrors.oldPassword}</span>
        <span className="password-form-label">New Password</span>
        <input
          name="newPassword"
          type="password"
          className={fieldErrors.newPassword !== "" ? "inputError" : "inputErrorsNone"}
          style={emwStyle.inputButton}
          value={values.newPassword}
          onChange={handleChange}
        />
        <span style={emwStyle.inputErrors}>{fieldErrors.newPassword}</span>
        <span className="password-form-label">Confirm New Password</span>
        <input
          name="confirmPassword"
          type="password"
          style={fieldErrors.confirmPassword !== "" ? emwStyle.inputButtonError : emwStyle.inputButton}
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <span style={emwStyle.inputErrors}>{fieldErrors.confirmPassword}</span>
        <div style={emwStyle.buttonContainer}>
          <button className="account-update-button"
            type="submit"
            disabled={enableButton}
            onClick={() => submitPasswordChange()}
          >
            Save Password
          </button>
          <button className="cancel" type="button" onClick={cancelClick}>
            Cancel
          </button>
        </div>
      </div>

    </>
    // <>
    //   <Formik
    //     initialValues={{
    //       confirmPassword: "",
    //       newPassword: "",
    //       oldPassword: "",
    //     }}
    //     onSubmit={(values, { setSubmitting }) => {
    //       handleSubmit({
    //         newPassword: values.newPassword,
    //         oldPassword: values.oldPassword,
    //       });
    //       setSubmitting(false);
    //     }}
    //     validateOnChange={false}
    //     validate={values => {
    //       const errors: {
    //         oldPassword?: string;
    //         confirmPassword?: string;
    //         newPassword?: string;
    //       } = {};
    //       if (!values.confirmPassword) {
    //         errors.confirmPassword = "Required field";
    //       }
    //       if (!values.newPassword) {
    //         errors.newPassword = "Required field";
    //       }
    //       if (!values.oldPassword) {
    //         errors.oldPassword = "Required field";
    //       }
    //       if (values.confirmPassword !== values.newPassword) {
    //         errors.confirmPassword = "Passwords do not match";
    //         errors.newPassword = "Passwords do not match";
    //       }
    //       return errors;
    //     }}
    //   >
    //     {({
    //       handleChange,
    //       handleSubmit,
    //       handleBlur,
    //       values,
    //       errors,
    //       touched,
    //       isSubmitting,
    //       isValid,
    //     }) => {
    //       return (
    //         <S.Form className="emw-password-from" onSubmit={handleSubmit}>
    //           <span className="password-form-label">Enter Current Password</span>
    //           <TextField
    //             name="oldPassword"
    //             type="password"
    //             style={emwStyle.inputButton}
    //             value={values.oldPassword}
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             errors={
    //               touched.oldPassword && errors.oldPassword
    //                 ? [{ message: errors.oldPassword }]
    //                 : undefined || fieldErrors!.oldPassword
    //             }
    //           />
    //           <span className="password-form-label">Enter New Password</span>
    //           <TextField
    //             name="newPassword"
    //             type="password"
    //             value={values.newPassword}
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             errors={
    //               touched.newPassword && errors.newPassword
    //                 ? [{ message: errors.newPassword }]
    //                 : undefined || fieldErrors!.newPassword
    //             }
    //           />
    //           <span className="password-form-label">Confirm New Password</span>
    //           <TextField
    //             name="confirmPassword"
    //             type="password"
    //             value={values.confirmPassword}
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             errors={
    //               touched.confirmPassword && errors.confirmPassword
    //                 ? [{ message: errors.confirmPassword }]
    //                 : undefined || fieldErrors!.confirmPassword
    //             }
    //           />
    //           <S.FormButtons>
    //             <ButtonLink className="pass-cancel-button" type="button" color="secondary" onClick={cancelClick}>
    //               Cancel
    //             </ButtonLink>
    //             <Button
    //               className="pass-save-button"
    //               type="submit"
    //               disabled={isSubmitting || !isValid}
    //               size="sm"
    //             >
    //               Save
    //             </Button>
    //           </S.FormButtons>
    //         </S.Form>
    //       );
    //     }}
    //   </Formik>
    // </>
  );
};
