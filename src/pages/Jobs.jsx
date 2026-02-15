import { useEffect } from "react";

const jobsData = [
  {
    id: 1,
    title: "Mechanical Engineer - Fresher",
    company: "Chennai Precision Pvt Ltd",
    location: "Chennai, Tamil Nadu, India",
    salary: "18000",
    type: "FULL_TIME",
    datePosted: "2026-02-15",
  },
  {
    id: 2,
    title: "Software Developer - Entry Level",
    company: "TechNova Solutions",
    location: "Coimbatore, Tamil Nadu, India",
    salary: "400000",
    type: "FULL_TIME",
    datePosted: "2026-02-15",
  },
];

const Jobs = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";

    const jobSchema = jobsData.map((job) => ({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: `${job.title} position available at ${job.company} located in ${job.location}. Apply through GetJobAndGo.`,
      datePosted: job.datePosted,
      employmentType: job.type,
      hiringOrganization: {
        "@type": "Organization",
        name: job.company,
        sameAs: "https://www.getjobandgo.com",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location,
          addressCountry: "IN",
        },
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: {
          "@type": "QuantitativeValue",
          value: job.salary,
          unitText: "YEAR",
        },
      },
      applicantLocationRequirements: {
        "@type": "Country",
        name: "India",
      },
    }));

    script.innerHTML = JSON.stringify(jobSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">
        Engineering & IT Jobs in Tamil Nadu
      </h1>

      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
        Explore verified engineering and IT fresher jobs in Tamil Nadu. All
        listings are curated and validated.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {jobsData.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-indigo-600 font-medium mt-1">{job.company}</p>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>📍 {job.location}</p>
              <p>💼 {job.type.replace("_", " ")}</p>
              <p>💰 ₹ {job.salary}</p>
            </div>

            <a
              href="https://www.getjobandgo.com/jobs"
              className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
