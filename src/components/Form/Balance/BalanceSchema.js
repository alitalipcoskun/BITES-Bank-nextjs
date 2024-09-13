import * as yup from "yup";

const digitsOnly = (value) => /^\d{10}$/.test(value);
const creditCardValidity = (value) => /^\d{16}$/.test(value);
const expirationDateValidity = (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
const positiveOnly = (value) => {
    return (parseFloat(value) > 0) ? true : false;
}

export const balanceSchema = yup.object(
    {
        accountNo: yup.string("Account no format is all decimal with 10 length").length(10).test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
        cardNumber: yup.string("Card number must have 16 digits.").length(16).test("Credit Card", "Credit card format is incorrect", creditCardValidity),
        expirationDate: yup.string("Expiration date of card is required").length(5).test("Date", "Enter the date with MM/YY format.", expirationDateValidity),
        amount: yup.number("The amount must be a number.").required("Balance change is required").test("Positive Check", "This field must be positive.", positiveOnly).typeError('Amount must be a number')
    }
);
