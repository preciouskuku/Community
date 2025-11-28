"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/ui/form-input"
import { Spinner } from "@/components/ui/form-components"
import { registerSchema, type RegisterFormData } from "@/lib/validation"
import { useAuthStore } from "@/state/authStore"
import { useUIStore } from "@/state/uiStore"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerUser, isLoading } = useAuthStore()
  const { addToast } = useUIStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password, data.mobileNumber)
      addToast("Account created successfully!", "success")
      router.push("/dashboard")
    } catch (err: any) {
      addToast(err.message || "Registration failed", "error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto flex items-center justify-center text-primary-foreground font-bold text-lg">
            R
          </div>
          <h1 className="mt-4 text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Sign up for a new account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-card p-8 rounded-lg border border-border shadow-lg"
        >
          <FormInput
            id="name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            error={errors.name}
            {...register("name")}
          />

          <FormInput
            id="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            error={errors.email}
            {...register("email")}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <FormInput
            id="mobileNumber"
            type="text"
            label="Mobile Number (optional)"
            placeholder="+263 77 123 4567"
            error={errors.mobileNumber}
            {...register("mobileNumber")}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Spinner size="sm" />}
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
