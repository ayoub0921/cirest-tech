export default function validate_login(values) {

    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'password length between 8 and 20 characters';
    } else if (values.password.includes(" ")) {
        errors.password = 'invalid password';
    }

    return errors
}


export function validate_registre(values) {

    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length <= 6) {
        errors.username = 'username length is not valid';
    }
    
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'password length between 8 and 20 characters';

    }else if (values.password.includes(" ")) {
        errors.password = 'invalid password';
    }

    if(!values.cpassword){
        errors.cpassword = 'Required';
    }else if (values.cpassword !== values.password) {
        errors.cpassword = 'password not mush';

    }else if (values.cpassword.includes(" ")) {
        errors.cpassword = 'invalid password';
    }

    return errors
}