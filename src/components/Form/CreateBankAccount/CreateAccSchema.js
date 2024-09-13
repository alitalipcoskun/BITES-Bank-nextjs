import * as yup from "yup";


export const createAccSchema = yup.object(
    {
        account_type: yup.string().required("Account type is required for creation process")
    }
);