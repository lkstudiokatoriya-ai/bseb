import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import {
  Bell,
  Menu,
  BookOpen,
  FileText,
  CalendarDays,
  CreditCard,
  Trophy,
  ClipboardList,
  Download,
  Info,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { auth, database } from "../../services/firebase";

const services = [
  {
    title: "Syllabus",
    subtitle: "पाठ्यक्रम देखें",
    icon: BookOpen,
    path: "/syllabus",
  },
  {
    title: "Latest Notice",
    subtitle: "नवीनतम सूचना",
    icon: FileText,
    path: "/notices",
  },
  {
    title: "Exam Routine",
    subtitle: "परीक्षा कार्यक्रम",
    icon: CalendarDays,
    path: "/exam-routine",
  },
  {
    title: "Admit Card",
    subtitle: "प्रवेश पत्र",
    icon: CreditCard,
    path: "/admit-card",
  },
  {
    title: "Result",
    subtitle: "परिणाम देखें",
    icon: Trophy,
    path: "/result",
  },
  {
    title: "Model Paper",
    subtitle: "अभ्यास प्रश्नपत्र",
    icon: ClipboardList,
    path: "/model-paper",
  },
  {
    title: "Notes & Quiz",
    subtitle: "Study Material",
    icon: BookOpen,
    path: "/notes-quiz",
  },
  {
    title: "Downloads",
    subtitle: "महत्वपूर्ण सामग्री",
    icon: Download,
    path: "/downloads",
  },
  {
    title: "About Us",
    subtitle: "हमारे बारे में",
    icon: Info,
    path: "/about",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Student");
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();

          if (userData.name) {
            setUserName(userData.name);
          }
        }
      } catch (error) {
        console.error("User data error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleServiceClick = (path) => {
    navigate(path);
  };

  return (
    <main className="home-page">

      {/* ================= HEADER ================= */}

      <header className="home-header">

        <div className="home-header-left">

          <div className="home-logo">
            <img
              src="/logo.png"
              alt="BSEB Portal"
            />
          </div>

          <div className="home-brand">
            <h1>BSEB PORTAL</h1>
            <p>Bihar School Examination Board</p>
          </div>

        </div>

        <div className="home-header-actions">

          <button
            className="icon-button notification-button"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell size={21} />

            {notificationCount > 0 && (
              <span className="notification-badge">
                {notificationCount > 9
                  ? "9+"
                  : notificationCount}
              </span>
            )}
          </button>

          <button
            className="icon-button"
            onClick={() => {}}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

        </div>

      </header>

      {/* ================= CONTENT ================= */}

      <div className="home-content">

        {/* ================= WELCOME ================= */}

        <section className="welcome-section">

          <div>

            <p className="welcome-label">
              <Sparkles size={14} />
              WELCOME BACK
            </p>

            <h2>
              Hello, {loading ? "Student" : userName} 👋
            </h2>

            <p className="welcome-description">
              आपकी पढ़ाई और परीक्षा से जुड़ी सभी
              जरूरी जानकारी एक ही जगह।
            </p>

          </div>

        </section>

        {/* ================= HERO ================= */}

        <section className="hero-card">

          <div className="hero-content">

            <span className="hero-tag">
              BSEB • STUDENT PORTAL
            </span>

            <h2>
              Your Future,
              <br />
              Our Priority.
            </h2>

            <p>
              Notes, Syllabus, Result, Admit Card,
              Notice और बहुत कुछ।
            </p>

            <button
              className="hero-button"
              onClick={() => navigate("/study")}
            >
              Start Learning
              <ChevronRight size={18} />
            </button>

          </div>

          <div className="hero-glow"></div>

        </section>

        {/* ================= SERVICES ================= */}

        <section className="services-section">

          <div className="section-heading">

            <div>
              <p className="section-label">
                QUICK ACCESS
              </p>

              <h2>
                Important Services
              </h2>
            </div>

          </div>

          <div className="services-grid">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <button
                  key={service.title}
                  className="service-card"
                  onClick={() =>
                    handleServiceClick(service.path)
                  }
                >

                  <div className="service-icon">
                    <Icon size={23} />
                  </div>

                  <div className="service-info">

                    <h3>
                      {service.title}
                    </h3>

                    <p>
                      {service.subtitle}
                    </p>

                  </div>

                  <ChevronRight
                    size={17}
                    className="service-arrow"
                  />

                </button>
              );
            })}

          </div>

        </section>

        {/* ================= LATEST UPDATE ================= */}

        <section className="update-card">

          <div className="update-icon">
            <Bell size={22} />
          </div>

          <div className="update-content">

            <span>
              LATEST UPDATE
            </span>

            <h3>
              नए Notices और Updates के लिए
              Notifications देखते रहें।
            </h3>

          </div>

          <button
            onClick={() => navigate("/notices")}
            className="update-arrow"
            aria-label="View notices"
          >
            <ChevronRight size={20} />
          </button>

        </section>

        {/* ================= FOOTER SPACE ================= */}

        <div className="home-bottom-space"></div>

      </div>

      {/* ================= BOTTOM NAVIGATION ================= */}

      <nav className="bottom-navigation">

        <button
          className="bottom-nav-item active"
          onClick={() => navigate("/home")}
        >
          <span className="bottom-nav-icon">
            🏠
          </span>

          <span>
            Home
          </span>
        </button>

        <button
          className="bottom-nav-item"
          onClick={() => navigate("/study")}
        >
          <span className="bottom-nav-icon">
            📚
          </span>

          <span>
            Study
          </span>
        </button>

        <button
          className="bottom-nav-item"
          onClick={() => navigate("/help")}
        >
          <span className="bottom-nav-icon">
            🎧
          </span>

          <span>
            Help
          </span>
        </button>

      </nav>

    </main>
  );
}
