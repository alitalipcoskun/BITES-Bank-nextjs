
// It is the input fields that is necesarry to sign in the user.
export const signUpLabels = [
    { name: "name", label: "Name", type: "text", placeholder: "Your name", ruleSet: { required: "Name is required.", maxLength: 30, minLength: 2 } },
    { name: "surname", label: "Surname", type: "text", placeholder: "Your surname" },
    { name: "mail", type: "email", label: "Email", placeholder: "xxxxx@xxxx.com" }, //Turkish chars are problem currently
    { name: "phone", type: "tel", label: "Mobile phone number", placeholder: "5xxxxxxxxx(10 digits)", maxlength: 50 },
    { name: "password", type: "password", label: "Password", placeholder: "Your password (at least 6 characters)" },
    { name: "password_again", type: "password", label: "Password again", placeholder: "Should match with the above field" }
];
