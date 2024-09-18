
export const logInLabels = [
    { name: "phone", type: "number", label: "Mobile phone number", placeholder: "Your phone number 5xxxxxxxxx", ruleSet: { required: "Verify your phone number", minLength: { value: 10, message: "Phone number must have 10 characters." }, maxLength: { value: 10, message: "Phone number must have 10 characters." } } },

    { name: "password", type: "password", label: "Password", placeholder: "Your password", ruleSet: { required: "Invalid password", minLength: { value: 8, message: "Password length should be at least 8 characters." } } }
];