export const profileFormLabels = [
    {
        label: "Name",
        dbKey: "name",
        isActive: false,
        type: "text",
    },
    {
        label: "Surname",
        dbKey: "surname",
        isActive: false,
        type: "text"
    },
    {
        label: "Phone number",
        dbKey: "phone",
        isActive: false, // will be changed
        type: "text"
    },
    {
        label: "Mail",
        dbKey: "mail",
        isActive: false, // will be changed
        type: "email"
    },
    {
        label: "Current password",
        dbKey: "password",
        isActive: true,
        type: "password",
        placeHolder: "Enter your current password"
    },
    {
        label: "New password",
        dbKey: "newPassword",
        isActive: true,
        type: "password",
        placeHolder: "Enter your new password"
    },
    {
        label: "New password again:",
        dbKey: "newPasswordAgain",
        isActive: true,
        type: "password",
        placeHolder: "Enter your new password again"
    }
]
