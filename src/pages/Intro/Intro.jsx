import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../services/firebase";

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User already logged in
        navigate("/dashboard", { replace: true });
      } else {
        // User is not logged in
        navigate("/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <main className="intro-screen">
      <div className="intro-content">
        <img
          src="/logo.png"
          alt="BSEB Portal"
          className="intro-logo"
        />

        <h1>BSEB PORTAL</h1>
        <p>Loading...</p>

        <div className="intro-loader">
          <span></span>
        </div>
      </div>
    </main>
  );
}
