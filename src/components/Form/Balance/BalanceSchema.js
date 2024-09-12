import * as yup from "yup";

const digitsOnly = (value) => /^\d{10}$/.test(value);

const positiveOnly = (value) => {
    return (parseFloat(value) > 0) ? true : false;
}

export const balanceSchema = yup.object(
    {
        accountNo: yup.string("Account no format is all decimal with 10 length").length(10).test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
        amount: yup.number("The amount must be a number.").required("Balance change is required").test("Positive Check", "This field must be positive.", positiveOnly).typeError('Amount must be a number')
    }
);
