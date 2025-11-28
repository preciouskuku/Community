"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/ui/form-input"
import { Spinner } from "@/components/ui/form-components"
import { loginSchema, type LoginFormData } from "@/lib/validation"
import { useUIStore } from "@/state/uiStore"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { addToast } = useUIStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      const { data: supaData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      setIsLoading(false)

      if (error) throw error

      addToast("Logged in successfully!", "success")
      router.push("/dashboard")
    } catch (err: any) {
      setIsLoading(false)
      console.error(err)
      addToast(err.message || "Login failed", "error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto flex items-center justify-center text-primary-foreground font-bold text-lg">
            L
          </div>
          <h1 className="mt-4 text-2xl font-bold">Sign In</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Please login to your account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-card p-8 rounded-lg border border-border shadow-lg"
        >
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {isLoading && <Spinner size="sm" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/auth/register" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
