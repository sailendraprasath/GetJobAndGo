const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-28 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            GetJobAndGo
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl font-medium opacity-95">
            Verified Opportunities for Freshers & Interns
          </p>

          <p className="mt-3 text-base sm:text-lg opacity-90">
            Freshers & Interns க்கான நம்பகமான வேலை வாய்ப்பு தளம்
          </p>

          <p className="mt-8 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed opacity-90">
            A trusted platform where verified companies and verified employees
            connect with freshers and interns — no bots, no fake listings, no
            application overload.
          </p>

          <p className="mt-3 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed opacity-90">
            Verified செய்யப்பட்ட நிறுவனங்கள் மற்றும் employees மட்டும் இணையும்
            பாதுகாப்பான hiring ecosystem.
          </p>

          <div className="mt-10">
            <p className="text-lg sm:text-xl font-semibold">
              🚀 Currently in Development – Launching Soon!
            </p>
            <p className="mt-2 text-base opacity-90">
              ஒவ்வொருவரும் எளிதாக வேலை பெற்று வாழ்க்கையின் அடுத்த கட்டத்திற்கு
              செல்ல.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Our Mission / எங்கள் நோக்கம்
        </h2>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          We empower freshers and interns by providing genuine, verified job
          opportunities. Our goal is to eliminate fake accounts and build a
          transparent hiring system.
        </p>

        <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Fake accounts இல்லாமல், verified வேலை வாய்ப்புகளை வழங்கி freshers
          மற்றும் interns க்கு நம்பகமான சூழலை உருவாக்குவது எங்கள் குறிக்கோள்.
        </p>
      </section>

      {/* WHY VERIFICATION SECTION */}
      <section className="py-24 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            Why Verification Matters / ஏன் Verification முக்கியம்?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-semibold mb-4">Verified Companies</h3>
              <p className="text-gray-600">
                Only trusted organizations can post job opportunities.
              </p>
              <p className="mt-2 text-gray-500 text-sm">
                நம்பகமான நிறுவனங்கள் மட்டும் வேலை பதிவிட முடியும்.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-semibold mb-4">Verified Employees</h3>
              <p className="text-gray-600">
                Real professionals interact with candidates.
              </p>
              <p className="mt-2 text-gray-500 text-sm">
                உண்மையான employees மட்டும் தொடர்பு கொள்ள முடியும்.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-semibold mb-4">
                Limited Applications
              </h3>
              <p className="text-gray-600">
                Only 10–30 applications per job for better visibility.
              </p>
              <p className="mt-2 text-gray-500 text-sm">
                ஒவ்வொரு வேலைக்கும் 10–30 applications மட்டுமே.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Our Vision / எங்கள் Vision
        </h2>

        <p className="text-xl sm:text-2xl leading-relaxed font-medium">
          Make it easy for everyone to{" "}
          <span className="text-blue-600 font-semibold">Get a Job</span> and{" "}
          <span className="text-indigo-600 font-semibold">
            Go to the next chapter
          </span>{" "}
          of their life.
        </p>

        <p className="mt-6 text-lg text-gray-600">
          ஒவ்வொருவரும் எளிதாக ஒரு வேலை பெற்று, வாழ்க்கையின் அடுத்த கட்டத்திற்கு
          முன்னேற வேண்டும்.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-8">
        <p className="opacity-80">© 2026 GetJobAndGo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
