"use client";
import { useState } from "react";
import style from "./Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Use the error message from our API, or a fallback
        const message = data.message || data.error || "Login failed";
        setError(message);
        // alert(message);
        return;
      }

      console.log("Login success:", data);
      router.push("/shop");
      // Here you would typically redirect the user
      // router.push("/shop");
    } catch (err) {
      // Handles network errors (e.g., server offline)
      const message = "Something went wrong. Please try again.";
      setError(message);
      // alert(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={style.page}>
      {/* Left decorative panel */}
      <div className={style.panel}>
        <div className={style.panelContent}>
          <p className={style.panelTagline}>Your daily nutrition,</p>
          <p className={style.panelTagline}>beautifully explored.</p>
        </div>
      </div>

      {/* Right form section */}
      <div className={style.formSection}>
        {/* Logo / brand */}
        <div className={style.brand}>
          <Link href="/" className={style.brandLink}>
            <span className={style.brandTitle}>NutriExplore</span>
            <span className={style.brandSub}>Nutrition · Simplified</span>
          </Link>
        </div>

        <div className={style.formCard}>
          <div className={style.formHeader}>
            <h1 className={style.heading}>Welcome back</h1>
            <p className={style.subheading}>
              Sign in to continue to your account
            </p>
          </div>

          {/* Test Credentials Box */}
          <div style={{
            background: "rgba(255, 255, 255, 0.05)", 
            padding: "16px", 
            borderRadius: "12px", 
            marginBottom: "24px", 
            border: "1px solid rgba(255, 255, 255, 0.1)", 
            fontSize: "14px", 
            color: "var(--foreground, #e5e7eb)", 
            textAlign: "center"
          }}>
            <p style={{margin: "0 0 8px 0", opacity: 0.8}}><strong>Test Account Credentials</strong></p>
            <p style={{margin: "0 0 4px 0", fontFamily: "monospace"}}>test@nutriexplore.com</p>
            <p style={{margin: 0, fontFamily: "monospace"}}>password123</p>
          </div>

          {/* Show error message if it exists */}
          {error && (
            <div
              style={{
                color: "#c0392b",
                fontSize: "14px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form className={style.form} onSubmit={handleSubmit}>
            {/* Email field */}
            <div className={style.field}>
              <label htmlFor="email" className={style.label}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={style.input}
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password field */}
            <div className={style.field}>
              <div className={style.labelRow}>
                <label htmlFor="password" className={style.label}>
                  Password
                </label>
                {/* <Link href="/forgot-password" className={style.forgotLink}>
                  Forgot password?
                </Link> */}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                className={style.input}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={style.submitBtn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className={style.signupPrompt}>
            Don&apos;t have an account?{" "}
            <Link href="/create" className={style.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
