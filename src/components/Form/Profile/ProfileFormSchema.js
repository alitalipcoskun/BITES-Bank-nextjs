import * as yup from "yup";

const digitsOnly = (value) => /^\d{10}$/.test(value)

/*
For future implementations.
name: yup.string().required("Name is required"),

    surname: yup.string().required("Surname is required"),

    mail: yup.string().email("Mail is not in e-mail format").required("Mail is required"),

    phone: yup.string().required("Phone number is required").test("Digits only", "This field should have only decimals with length of 10.", digitsOnly), 
*/

export const profileSchema = yup.object({

    password: yup.string().min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty"),

    newPassword: yup.string().oneOf([yup.ref("newPasswordAgain"), null], "Passwords must match").min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty"),

    newPasswordAgain: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match").min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty")

})
