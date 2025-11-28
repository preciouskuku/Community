"use client"

import type React from "react"

import { Input } from "./form-components"
import { Label } from "./form-components"
import type { FieldError } from "react-hook-form"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
}

export function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  )
}
