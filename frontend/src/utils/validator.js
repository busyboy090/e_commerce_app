export function validateText(value) {
    if(!value) {
        return 'This field is required'
    } else {
        return true
    }
}

export function validateEmail(value) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!value) {
        return 'This field is required'
    }else if (!regex.test(value)) {
        return "Invalid email format";
    } else {
        return true;
    }
}

export function validatePassword(password,confirmation_password) {
    if(!password && !confirmation_password) {
        return 'This field is required';
    } else if (password.length < 6 || confirmation_password.length < 6) {
        return "Password must be more than or equal to 6 characters";
    }else if (password !== confirmation_password) {
        return 'Passwords do not match';
    } else {
        return true
    }
}

export function validateNumber(number) {
    console.log(typeof number)
    if(!number) {
        return 'This field is required';
    } else if (typeof number !== 'number') {
        return "This field must be an integer";
    } else {
        return true
    }
}