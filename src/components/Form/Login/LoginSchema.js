import * as yup from 'yup';

const digitsOnly = (value) => /^\d{10}$/.test(value)
export const loginSchema = yup.object({

    phone: yup.string().required("Phone number is required").test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
    password: yup.string().min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty"),
})