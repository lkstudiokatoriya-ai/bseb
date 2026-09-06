import {
  Bell,
  Menu,
  BookOpen,
  FileText,
  Calendar,
  Award,
  Download,
  Info,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

const cards = [
  {
    title: "Syllabus",
    subtitle: "पाठ्यक्रम देखें",
    icon: BookOpen,
  },
  {
    title: "Latest Notice",
    subtitle: "नवीनतम सूचना",
    icon: FileText,
  },
  {
    title: "Exam Routine",
    subtitle: "परीक्षा कार्यक्रम",
    icon: Calendar,
  },
  {
    title: "Admit Card",
    subtitle: "प्रवेश पत्र डाउनलोड",
    icon: ClipboardList,
  },
  {
    title: "Result",
    subtitle: "परिणाम देखें",
    icon: Award,
  },
  {
    title: "Model Paper",
    subtitle: "प्रैक्टिस सेट",
    icon: FileText,
  },
  {
    title: "Notes & Quiz",
    subtitle: "अध्ययन सामग्री",
    icon: GraduationCap,
  },
  {
    title: "Downloads",
    subtitle: "महत्वपूर्ण संसाधन",
    icon: Download,
  },
  {
    title: "About Us",
    subtitle: "बोर्ड की जानकारी",
    icon: Info,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white pb-32">
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-yellow-600 flex items-center justify-center font-bold">
              B
            </div>

            <div>
              <h1 className="text-2xl font-bold">BSEB</h1>
              <p className="text-xs text-white/70">
                Bihar School Examination Board
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-3 rounded-full bg-white/10">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>

            <button className="p-3 rounded-full bg-white/10">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-md mx-auto p-4">
        <div className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          
          <div className="p-6">
            <p className="uppercase tracking-[5px] text-white/70 text-xs">
              Welcome To
            </p>

            <h2 className="text-4xl font-extrabold mt-2">
              BSEB PORTAL
            </h2>

            <p className="mt-3 text-white/80">
              बिहार के हर विद्यार्थी के लिए
              एक विश्वसनीय मंच
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Result",
                "Admit Card",
                "Syllabus",
                "Notice",
                "Model Paper",
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-blue-500/20 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <button className="mt-6 px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 transition">
              Your Future Our Priority →
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-md mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-5 hover:scale-105 transition duration-300"
              >
                <Icon className="w-10 h-10 text-cyan-300 mb-4" />

                <h3 className="font-bold text-lg">
                  {card.title}
                </h3>

                <p className="text-sm text-white/70 mt-1">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quote Section */}
      <section className="max-w-md mx-auto p-4 mt-6">
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-2xl font-bold">
            “ज्ञान ही शक्ति है,
            <br />
            और शिक्षा ही भविष्य”
          </h3>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-4 flex justify-between">
          
          <button className="flex flex-col items-center text-cyan-300">
            <span>🏠</span>
            <span className="text-xs">Home</span>
          </button>

          <button className="flex flex-col items-center">
            <span>📚</span>
            <span className="text-xs">Study</span>
          </button>

          <button className="flex flex-col items-center">
            <span>🎧</span>
            <span className="text-xs">Help</span>
          </button>

        </div>
      </nav>

    </main>
  );
              }
