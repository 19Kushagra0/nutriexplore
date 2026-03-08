"use client";
import { useState } from "react";
import style from "./Create.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const res = await fetch("api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
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
      router.push("/login");
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

          {error && (
            <p
              className={style.errorMessage}
              style={{ color: "red", marginBottom: "1rem" }}
            >
              {error}
            </p>
          )}
          <form className={style.form} onSubmit={handleSubmit}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={style.submitBtn}
              disabled={loading}
            >
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
