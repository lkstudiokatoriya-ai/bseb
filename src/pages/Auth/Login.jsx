import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../services/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  // Already logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home", { replace: true });
      }

      setChecking(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Email ID और Password दर्ज करें।");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Email ID या Password गलत है।");
      } else if (error.code === "auth/invalid-email") {
        setError("सही Email ID दर्ज करें।");
      } else {
        setError("Login नहीं हो पाया। कृपया फिर कोशिश करें।");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="login-loading">
        Loading...
      </div>
    );
  }

  return (
    <main className="login-page">

      <div className="login-box">

        {/* Logo / Title */}
        <div className="login-header">
          <img
            src="/logo.png"
            alt="BSEB Portal"
          />

          <h1>BSEB PORTAL</h1>

          <p>अपने Account में Login करें</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="login-field">
            <label htmlFor="email">
              Email ID
            </label>

            <input
              id="email"
              type="email"
              placeholder="अपना Email ID डालें"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="login-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="अपना Password डालें"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* Login */}
          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Login हो रहा है..." : "LOGIN"}
          </button>

        </form>

        {/* Registration */}
        <div className="new-user">

          <p>नया User हैं?</p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register-button"
          >
            नया User Registration करें
          </button>

        </div>

      </div>

    </main>
  );
}
