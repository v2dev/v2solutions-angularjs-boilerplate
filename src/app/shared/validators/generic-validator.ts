// Provide all set of validation messages here
const VALIDATION_MESSAGES = {
    name: {
        required: 'Full name is required'
    },
    email: {
        required: 'Email is required',
        email: 'Email ID is invalid'
    },
    password: {
        required: 'Password is required',
        minlength: 'Password length must be greater than or equal to 8 characters'
    },
    confirmPassword: {
        required: 'Confirm password is required',
        match: 'Password does not match'
    }
};