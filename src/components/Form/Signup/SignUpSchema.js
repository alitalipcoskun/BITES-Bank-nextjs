import * as yup from 'yup';

const digitsOnly = (value) => /^\d{10}$/.test(value)

// Rulesets and field for sign in
export const signUpSchema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  mail: yup.string().email("Mail is not in e-mail format").required("Mail is required"),
  phone: yup.string().required("Phone number is required").test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
  password: yup.string().min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty"),
  password_again: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty")
});