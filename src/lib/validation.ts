import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  userNameOrEmail: yup.string().required("This field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .test(
      "password-strength",
      "Password must include uppercase, lowercase, number, and special character",
      (value) =>
        !!value &&
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|:;"'<>,.?/~`])/.test(
          value
        )
    ),
  afterSubmit: yup.string().optional(),
});
export const RegisterSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(5, "Full name must be at least 6 characters long"),
  userName: yup
    .string()
    .required("User name is required")
    .min(5, "User name must be at least 6 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .test(
      "password-strength",
      "Password must include uppercase, lowercase, number, and special character",
      (value) =>
        !!value &&
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|:;"'<>,.?/~`])/.test(
          value
        )
    ),

  gender: yup.string().required("Gender is required"),
  birthDay: yup.date().required("Birth date is required"),
  jop:yup.string().required('jop is required')
});

export const validatePasswords = (
  password: string,
  confirmPassword: string
) => {
  if (
    password &&
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|:;"'<>,.?/~`]{8,})/.test(
      password
    )
  ) {
    throw new Error(
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    );
    return new Error();
  }
  if (password !== confirmPassword) throw new Error("Passwords do not match");
};
