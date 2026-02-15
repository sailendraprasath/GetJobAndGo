import { useState } from "react";
import { Helmet } from "react-helmet"; // <-- use Helmet instead of next/head

/* ContactForm Component */
function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "afab1879-6b36-452c-b944-7dd1bc3b1407");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form submitted successfully!");
        event.target.reset();
      } else {
        setResult("Error: " + (data.message || "Try again"));
      }
    } catch (error) {
      setResult("Network error: Try again later");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full p-3 border rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        className="w-full p-3 border rounded h-32"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Submit
      </button>
      {result && <p className="text-center text-gray-700 mt-2">{result}</p>}
    </form>
  );
}

/* Home Component */
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Engineering Jobs in Tamil Nadu | GetJobAndGo</title>
        <meta
          name="description"
          content="GetJobAndGo offers verified engineering and IT fresher jobs in Tamil Nadu. Track applications, apply safely, and connect with verified companies."
        />
        <meta
          name="keywords"
          content="Engineering Jobs, IT Jobs, Tamil Nadu Jobs, Fresher Jobs, Verified Companies"
        />
        <meta name="author" content="GetJobAndGo" />
        {/* Open Graph / Social */}
        <meta
          property="og:title"
          content="Engineering Jobs in Tamil Nadu | GetJobAndGo"
        />
        <meta
          property="og:description"
          content="Verified engineering and IT fresher jobs in Tamil Nadu with real-time application tracking."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getjobandgo.com" />
        <meta
          property="og:image"
          content="https://getjobandgo.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-indigo-600">GetJobAndGo</div>
        <div className="space-x-6 hidden md:flex">
          <a href="/" className="hover:text-indigo-600 transition">
            Home
          </a>
          <a href="/" className="hover:text-indigo-600 transition">
            Jobs
          </a>
          <a href="/" className="hover:text-indigo-600 transition">
            Companies
          </a>
          <a href="/" className="hover:text-indigo-600 transition">
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Engineering Jobs in Tamil Nadu
          <span className="text-indigo-600 block mt-2">
            Every Application Gets a Response
          </span>
        </h1>
        <p className="mt-6 text-lg md:w-2/3 text-gray-600">
          GetJobAndGo is a verified hiring platform offering engineering jobs in
          Tamil Nadu and IT jobs for freshers in Tamil Nadu. We connect students
          with GST and CIN verified companies to ensure safe, transparent and
          real career opportunities.
        </p>
        <div className="mt-8 space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Apply for Jobs
          </button>
          <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
            Post a Job
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-16 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          Verified Job Portal for Engineering & IT Freshers
        </h2>
        <p className="text-gray-600 text-center max-w-4xl mx-auto">
          Unlike traditional job portals, GetJobAndGo focuses only on verified
          engineering jobs in Tamil Nadu and fresher IT job openings. Every
          company is validated before posting jobs. Students can track real-time
          application status without facing silent rejection or ghosting.
        </p>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose GetJobAndGo?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Verified Companies Only
            </h3>
            <p className="text-gray-600">
              We verify GST and CIN details before allowing companies to post
              engineering and IT fresher jobs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Transparent Application Tracking
            </h3>
            <p className="text-gray-600">
              Track job application status – Applied, Shortlisted, Interviewed
              or Rejected.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Designed for Tamil Nadu Students
            </h3>
            <p className="text-gray-600">
              Focused platform for Tamil Nadu engineering graduates and IT
              freshers searching for trusted opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Career with Engineering & IT Jobs in Tamil Nadu
        </h2>
        <p className="mb-6">
          Join students finding verified career opportunities across Tamil Nadu.
        </p>
        <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
          Create Free Account
        </button>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">
          Have questions? Reach out to us using the form below.
        </p>
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 text-sm">
        <p>© 2026 GetJobAndGo. All Rights Reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
