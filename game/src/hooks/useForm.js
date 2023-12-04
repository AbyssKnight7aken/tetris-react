import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState(false);
    const validationErrors = {};

    const changeHandler = (e) => {
        setFocused(true);
        setValues((prevState) => {
            const updatedValues = { ...prevState, [e.target.name]: e.target.value };

            if (updatedValues.username && !updatedValues.username.trim()) {
                validationErrors.username = 'Username is required!';
            } else if (updatedValues.username && updatedValues.username.length < 3) {
                validationErrors.username = 'Username should be at least 3 characters long!';
            }

            //TODO: check if existing in edit component!!!
            if (updatedValues.email && !updatedValues.email.trim()) {
                validationErrors.email = 'Email is required!';
            } else if (updatedValues.email && (!/\S+@\S+\.\S+/.test(updatedValues.email))) {
                validationErrors.email = 'Email is not valid!';
            }

            if (updatedValues.password && !updatedValues.password.trim()) {
                validationErrors.password = 'Password is required!';
            } else if (updatedValues.password && updatedValues.password.length < 6) {
                validationErrors.password = 'Password should be at least 6 characters long!';
            }

            if (updatedValues['repeat-password'] && updatedValues['repeat-password'] !== updatedValues.password) {
                validationErrors.confirmPassword = 'Passwords do not match!';
            }


            setErrors(validationErrors);

            console.log(validationErrors);
            console.log(updatedValues);

            setErrors(validationErrors);
            return updatedValues;
        });


    }

    const handleFocus = (e) => {
        setFocused(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(values);
        setValues(initialValues);
    }

    const changeValues = (newValues) => {
        setValues(newValues);
    }

    return { values, changeHandler, onSubmit, changeValues, errors, focused, handleFocus };

};