import React from "react";
import style from "./Create.module.css";
import Link from "next/link";

export default function Create() {
  return (
    <div className={style.page}>
      {/* Left decorative panel */}
      <div className={style.panel}>
        <div className={style.panelContent}>
          <p className={style.panelTagline}>Start your nutrition</p>
          <p className={style.panelTagline}>journey today.</p>
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
            <h1 className={style.heading}>Create an account</h1>
            <p className={style.subheading}>
              Join millions exploring smarter nutrition
            </p>
          </div>

          <form className={style.form} noValidate>
            {/* Full name */}
            <div className={style.field}>
              <label htmlFor="name" className={style.label}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={style.input}
                placeholder="Jane Doe"
                autoComplete="name"
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className={style.field}>
              <label htmlFor="password" className={style.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={style.input}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>

            {/* Confirm password */}
            <div className={style.field}>
              <label htmlFor="confirmPassword" className={style.label}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={style.input}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>

            {/* Submit */}
            <button type="submit" className={style.submitBtn}>
              Create account
            </button>
          </form>

          <p className={style.loginPrompt}>
            Already have an account?{" "}
            <Link href="/login" className={style.loginLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
