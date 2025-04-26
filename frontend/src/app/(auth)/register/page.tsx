"use client";

import { Button } from "@/components/ui/button";
import { apiClient, cn, RegisterValidationSchema } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Field } from "@/components/custom/Field";
import { useFormik } from "formik";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { SignUpDto, SignUpResponseDto } from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { useUserStore } from "@/store/userStore";
import Cookies from 'js-cookie';

const initialValues: SignUpDto = {
  password: "",
  email: "",
  name: "",
  age: 0,
  phone: "",
};

const Register = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [redirectPath, setRedirectPath] = useState("/");
  const [errors, setErrors] = useState<{
    [key: string]: string | undefined;
  }>({});
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (redirect) {
      setRedirectPath(redirect as string); // Store the redirect path
    }
  }, [redirect]);

  const registerMutation = useMutation<
    AxiosResponse<SignUpResponseDto>,
    AxiosError,
    SignUpDto
  >({
    mutationFn: (dto: SignUpDto) => {
      return apiClient.authControllerRegisterUser(dto);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      registerMutation.mutate(values, {
        onSuccess(data) {
          if (data.data.user) {
            setUser(data.data.user); // Set the user in the store
            Cookies.set('access-token', data.data.accessToken, {
              expires: 1, // 1 day
              sameSite: 'Strict',
            });
            router.push(redirectPath); // Redirect to the specified path
          }
        },
        onError(error) {
          console.log("Login failed", error.response?.data);
          setErrors(error.response?.data as { [key: string]: string });
        },
      });
    },
  });
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3">
              <div className="grid gap-6">
                <Field
                  label="Full Name"
                  placeholder="John Deo"
                  {...formik.getFieldProps("name")}
                  error={formik.errors.name || errors.name}
                  touched={formik.touched.name}
                  required
                />
                <Field
                  label="Phone Number"
                  placeholder="+1 234 567 8900"
                  required
                  {...formik.getFieldProps("phone")}
                  error={formik.errors.phone || errors.phone}
                  touched={formik.touched.phone}
                  inputMode="tel"
                  autoComplete="tel"
                />
                <Field
                  label="Email Address"
                  placeholder="john@gmail.com"
                  {...formik.getFieldProps("email")}
                  error={formik.errors.email || errors.email}
                  touched={formik.touched.email}
                />
                <Field
                  label="Age"
                  placeholder="18"
                  required
                  inputMode="numeric"
                  {...formik.getFieldProps("age")}
                  error={formik.errors.age || errors.age}
                  touched={formik.touched.age}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const numericValue = value ? parseInt(value, 10) : "";
                    formik.setFieldValue("age", numericValue);
                  }}
                />
                <Field
                  label="Password"
                  placeholder="************"
                  type="password"
                  required
                  inputMode="text"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                  error={formik.errors.password || errors.password}
                  touched={formik.touched.password}
                />
                <Button type="submit" className="w-full">
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
