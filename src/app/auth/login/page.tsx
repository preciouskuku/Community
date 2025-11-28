"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/ui/form-input"
import { Spinner } from "@/components/ui/form-components"
import { loginSchema, type LoginFormData } from "@/lib/validation"
import { useAuthStore } from "@/state/authStore"
import { useUIStore } from "@/state/uiStore"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const { addToast } = useUIStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      addToast("Welcome back!", "success")
      router.push("/dashboard")
    } catch (err: any) {
      addToast(err.message || "Login failed", "error")
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false })
      if (result?.error) {
        addToast("Google sign-in failed", "error")
      } else {
        addToast("Welcome!", "success")
        router.push("/dashboard")
      }
    } catch (err: any) {
      addToast(err.message || "Google login failed", "error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto flex items-center justify-center text-primary-foreground font-bold text-lg">
            C
          </div>
          <h1 className="mt-4 text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
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
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                Forgot?
              </Link>
            </div>
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
            className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Spinner size="sm" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
