const passwordValidationRules = {
    required: "Password is required",
    minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
    },
    pattern: {
        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
        message: "Password must include at least one uppercase letter, one number, and one special character",
    }
}

export const registerFields = [
    {
        id: "username",
        label: "Username",
        type: "text",
        validation: { required: "Username is required" },
    },
    {
        id: "password",
        label: "Password",
        type: "password",
        validation: passwordValidationRules,
    },
    {
        id: "firstName",
        label: "First name",
        type: "text",
        validation: { required: "First name is required" },
    },
    {
        id: "lastName",
        label: "Last name",
        type: "text",
        validation: { required: "Last name is required" },
    },
];

export const loginFields = [
    {
        id: "username",
        label: "Username",
        type: "text",
        validation: { required: "Username is required" },
    },
    {
        id: "password",
        label: "Password",
        type: "password",
        validation: passwordValidationRules,
    },
];
