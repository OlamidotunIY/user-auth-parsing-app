"use client";

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}
export const Field = ({ label, error, touched, ...rest }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      {label && (
        <Label htmlFor={rest.id} className="text-muted-foreground">
          {label}
        </Label>
      )}
      {rest.type === "password" ? (
        <div className="mt-2 flex items-center border-primary border rounded-md">
          <Input
            {...rest}
            type={visible ? "text" : "password"}
            className="flex-1 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-primary"
          />
          <Button
            type="button"
            onClick={toggleVisibility}
            variant={"ghost"}
            className="p-0 rounded-0 hover:bg-transparent"
          >
            {visible ? <Eye /> : <EyeOff />}
          </Button>
        </div>
      ) : (
        <Input
          {...rest}
          className="mt-2 border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-primary"
        />
      )}
      {error && touched && (
        <span role="alert" className="text-red-500 text-xs mt-1">
          {error}
        </span>
      )}
    </div>
  );
};
