import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is Required'),
    password: Yup.string()
        .min(8, 'Password must have at least 8 characters')
        .max(80, 'Password is too long')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{8,})/,
        //     'Password must have Upper Case, Lower Case, Number and Special characters !@#$%^&*()-',
        // )
        .required('Please provide your password'),
})