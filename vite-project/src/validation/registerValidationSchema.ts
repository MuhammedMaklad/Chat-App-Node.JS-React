import * as yup from "yup";


export const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required.").min(3, "The firstName must be at least 3 characters."),
  lastName: yup.string().required("lastName is required.").min(3, "The lastName must be at least 3 characters."),
  email: yup.string().email("You Must Provide Valid Email.").required("Email is required."),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must include uppercase, lowercase, number, and special character"
  ),
})