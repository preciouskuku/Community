"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input, Label } from "@/components/ui/form-components"
import { Spinner } from "@/components/ui/form-components"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="h-12 w-12 bg-primary rounded-lg mx-auto flex items-center justify-center text-primary-foreground font-bold text-lg">
            C
          </div>
          <h1 className="mt-4 text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground mt-2">We'll send you instructions to reset your password</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Spinner size="sm" />}
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="bg-card p-8 rounded-lg border border-border text-center space-y-4">
            <div className="text-4xl">✓</div>
            <p className="font-semibold">Check your email</p>
            <p className="text-sm text-muted-foreground">We've sent a password reset link to {email}</p>
            <button onClick={() => setSubmitted(false)} className="text-primary font-semibold hover:underline">
              Try another email
            </button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
