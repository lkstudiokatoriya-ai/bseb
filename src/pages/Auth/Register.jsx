import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

import { auth, database } from "../../services/firebase";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    className: "",
    stream: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    const {
      name,
      mobile,
      email,
      password,
      confirmPassword,
      className,
      stream,
      district,
    } = form;

    // Required fields
    if (
      !name ||
      !mobile ||
      !email ||
      !password ||
      !confirmPassword ||
      !className ||
      !stream ||
      !district
    ) {
      setError("कृपया सभी जानकारी भरें।");
      return;
    }

    // Mobile validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("सही 10 अंकों का Mobile Number डालें।");
      return;
    }

    // Password length
    if (password.length < 6) {
      setError("Password कम से कम 6 characters का होना चाहिए।");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      setError("Password और Confirm Password समान नहीं हैं।");
      return;
    }

    try {
      setLoading(true);

      // Create Firebase account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = userCredential.user;

      // Save profile in Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        uid: user.uid,
        name: name.trim(),
        mobile: mobile,
        email: email.trim().toLowerCase(),
        className,
        stream,
        district,
        createdAt: Date.now(),
      });

      // Go to Home
      navigate("/home", { replace: true });

    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("इस Email ID से पहले से account बना हुआ है।");
          break;

        case "auth/invalid-email":
          setError("सही Email ID डालें।");
          break;

        case "auth/weak-password":
          setError("Password थोड़ा मजबूत रखें।");
          break;

        default:
          setError("Registration नहीं हो पाया। कृपया फिर कोशिश करें।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">

      <section className="register-box">

        {/* Header */}
        <div className="register-header">
          <img
            src="/logo.png"
            alt="BSEB Portal"
          />

          <h1>Create Account</h1>

          <p>
            BSEB Portal पर अपना Account बनाएँ
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>

          {/* Name */}
          <div className="register-field">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="अपना पूरा नाम"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Mobile */}
          <div className="register-field">
            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              placeholder="10 अंकों का Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              maxLength={10}
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="register-field">
            <label>Email ID</label>

            <input
              type="email"
              name="email"
              placeholder="अपना Email ID"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Class */}
          <div className="register-field">
            <label>Class</label>

            <select
              name="className"
              value={form.className}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">
                Class Select करें
              </option>

              <option value="10">Class 10</option>
              <option value="12">Class 12</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Stream */}
          <div className="register-field">
            <label>Stream / Subject</label>

            <select
              name="stream"
              value={form.stream}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">
                Stream Select करें
              </option>

              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* District */}
          <div className="register-field">
            <label>District</label>

            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">
                District Select करें
              </option>

              <option value="banka">Banka</option>
              <option value="bhagalpur">Bhagalpur</option>
              <option value="patna">Patna</option>
              <option value="gaya">Gaya</option>
              <option value="muzaffarpur">Muzaffarpur</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div className="register-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Password बनाएँ"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Confirm Password */}
          <div className="register-field">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Password दोबारा डालें"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading
              ? "Account बनाया जा रहा है..."
              : "CREATE ACCOUNT"}
          </button>

        </form>

        {/* Login */}
        <div className="already-account">
          <span>पहले से Account है?</span>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login करें
          </button>
        </div>

      </section>

    </main>
  );
}
