const VALIDATION_MESSAGES = {
    name: {
        required: 'Full name is required',
        email: 'Enter valid name'
    },
    email: {
        required: 'Email is required',
        email: 'Enter valid Email ID'
    },
    password: {
        required: 'Password is required',
        minlength: 'Password length must be greater than or equal to 8 characters'
    },
    confirmPassword: {
        required: 'Confirm password is required',
        match: 'Confirm password should be same as password'
    }
};