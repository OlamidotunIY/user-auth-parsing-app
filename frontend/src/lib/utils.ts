import { AuthApi, Configuration } from "@/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as Yup from "yup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
  age: Yup.number()
    .min(18, "You must be at least 18 years old")
    .required("Age is required")
    .typeError("Age must be a number"), // Ensures the input is a valid number
  phone: Yup.string()
    .matches(
      /^[+]*[0-9]{1,4}[ -]?[0-9]{1,15}$/,
      "Phone number is not valid"
    )
    .required("Phone number is required"),
});

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export const apiClient = new AuthApi(
  new Configuration({
    basePath: 'http://localhost:3001', // Replace with your API's base path
  })
);

export const parseData = (email: string, name: string) => {
  const domain = email.split("@")[1];
  const [firstName, lastName = ""] = name.split(" ");
  return { domain, firstName, lastName };
};
