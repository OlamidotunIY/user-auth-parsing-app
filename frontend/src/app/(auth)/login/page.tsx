"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClient, cn, LoginValidationSchema } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/custom/Field";
import { useFormik } from "formik";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { LoginDto, LoginResponseDto } from "@/api";
import { useUserStore } from "@/store/userStore";
import Cookies from 'js-cookie';

const initialValues: LoginDto = {
  password: "",
  email: "",
};

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [redirectPath, setRedirectPath] = useState("/");
  const [invalidCredentials, setInvalidCredentials] = useState<
    string | undefined
  >();
  const {setUser} = useUserStore();

  useEffect(() => {
    if (redirect) {
      setRedirectPath(redirect as string); // Store the redirect path
    }
  }, [redirect]);

  const loginMutation = useMutation<
    AxiosResponse<LoginResponseDto>,
    AxiosError,
    LoginDto
  >({
    mutationFn: (dto: LoginDto) => {
      return apiClient.authControllerLogin(dto); // Use the generated method
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginValidationSchema,
    onSubmit: async (values, {}) => {
      setInvalidCredentials(undefined);
      // Call the login mutation
      loginMutation.mutate(values, {
        onSuccess(data) {
          if (data.data.user) {
            setUser(data.data.user);
            Cookies.set('access-token', data.data.accessToken, {
              expires: 1, // 1 day
              sameSite: 'Strict',
            });
            router.push(redirectPath || "/");
          }
        },
        onError(error) {
          console.log("Login failed", error);
          setInvalidCredentials("Invalid email or password");
        },
      });
    },
  });
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Log into your Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-6">
              {invalidCredentials && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{invalidCredentials}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-6">
                <Field
                  label="Email Address"
                  placeholder="john@gmail.com"
                  {...formik.getFieldProps("email")}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                />
                <Field
                  label="Password"
                  placeholder="************"
                  type="password"
                  required
                  inputMode="text"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                />
                <Button type="submit" className="w-full">
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
