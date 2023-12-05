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

            if (updatedValues.level === '') {
                validationErrors.level = 'Level is required!';
            } else if (updatedValues.level && (Number(updatedValues.level) < 1 || Number(updatedValues.level) > 999)) {
                validationErrors.level = 'The level should be a number between 1 and 999!';
            }

            if (updatedValues.linesCompleted === '') {
                validationErrors.linesCompleted = 'LinesCompleted is required!';
            } else if (updatedValues.linesCompleted && (Number(updatedValues.linesCompleted) < 0 || Number(updatedValues.linesCompleted) > 999)) {
                validationErrors.linesCompleted = 'LinesCompleted should be a number between 0 and 999!';
            }

            if (updatedValues.points === '') {
                validationErrors.points = 'Points are required!';
            } else if (updatedValues.points && (Number(updatedValues.points) < 0 || Number(updatedValues.points) > 9999)) {
                validationErrors.points = 'Points should be a number between 0 and 9999!';
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