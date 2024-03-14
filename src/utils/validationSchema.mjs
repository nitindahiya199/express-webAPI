export const createUserVa1idationSchema = {
    username:{
        notEmpty: {
            errorMessage: "username must be string",
        },
        isString: {
            errorMessage:"username must be string",
        },
        isLength:{
            options:{
                min:5,
                max:32,
            },
            errorMessage: "username must be between 5-32 characters",
        },
    },
    displayName: {
                notEmpty: {
            errorMessage: "displayName cannot be empty",
        },
    }
}

export const putUserVa1idationSchema = {
    username:{
        notEmpty: {
            errorMessage: "username must be string",
        },
        isString: {
            errorMessage:"username must be string",
        },
        isLength:{
            options:{
                min:5,
                max:32,
            },
            errorMessage: "username must be between 5-32 characters",
        },
    },
    displayName: {
                notEmpty: {
            errorMessage: "displayName cannot be empty",
        },

    password: {
        notEmpty: {
            errorMessage: "displayName cannot be empty",
        },
    }
    }
}