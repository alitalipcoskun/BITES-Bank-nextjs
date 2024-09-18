import * as yup from 'yup';

export const mailSchema = yup.object({
    mail: yup.string().required("Phone number is required").email("Invalid email address").min(3, "Email must be at least 3 characters"),
})

export const passwordSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    passwordAgain: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});