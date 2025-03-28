"use client";

import { Input, InputProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface InputEmailProps extends InputProps {
  setValueEmail?: string;
}

export default function InputEmail({ setValueEmail, ...props }: InputEmailProps) {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if(!setValueEmail) return;
    const isValidEmail = validateEmail(setValueEmail);
    if (isValidEmail) {
      setEmail(setValueEmail);
    }
  }, [setValueEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setEmail(valor);
    props.onChange && props.onChange(e); // Mantém o evento original se passado
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
  <>
  <Input {...props} value={email} type="email" onChange={handleChange} />
  </>
  );
}

