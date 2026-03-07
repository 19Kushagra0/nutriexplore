import React from "react";
import style from "./Login.module.css";
import Link from "next/link";

export default function Login() {
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

          <form className={style.form} noValidate>
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
              />
            </div>

            {/* Password field */}
            <div className={style.field}>
              <div className={style.labelRow}>
                <label htmlFor="password" className={style.label}>
                  Password
                </label>
                <Link href="/forgot-password" className={style.forgotLink}>
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                className={style.input}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Submit button */}
            <button type="submit" className={style.submitBtn}>
              Sign in
            </button>
          </form>

          <p className={style.signupPrompt}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className={style.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
