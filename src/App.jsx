const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">GetJobAndGo</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-indigo-600 transition">
            Home
          </a>
          <a href="#" className="hover:text-indigo-600 transition">
            Jobs
          </a>
          <a href="#" className="hover:text-indigo-600 transition">
            Companies
          </a>
          <a href="#" className="hover:text-indigo-600 transition">
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-20">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Every Application{" "}
          <span className="text-indigo-600">Gets a Response</span>
        </h2>
        <p className="mt-6 text-lg md:w-2/3 text-gray-600">
          A verified hiring platform connecting students with trusted companies.
          No more silent rejections. Transparent hiring. Real opportunities.
        </p>
        <div className="mt-8 space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
            Post a Job
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose GetJobAndGo?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">Verified Companies</h4>
            <p className="text-gray-600">
              Only GST/CIN verified companies can post jobs on our platform.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">Application Tracking</h4>
            <p className="text-gray-600">
              Track your application status – Applied, Shortlisted, Rejected.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">Guaranteed Response</h4>
            <p className="text-gray-600">
              Companies must update application status. No more ghosting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white text-center py-16 px-6">
        <h3 className="text-3xl font-bold mb-4">
          Start Your Career Journey Today
        </h3>
        <p className="mb-6">
          Join thousands of students finding verified opportunities.
        </p>
        <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © 2026 GetJobAndGo. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
