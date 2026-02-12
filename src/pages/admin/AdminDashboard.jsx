import { useState, useEffect } from 'react';
import { companiesAPI, jobsAPI } from '../../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [companiesRes, jobsRes] = await Promise.all([
      companiesAPI.getAll(),
      jobsAPI.getAll(),
    ]);

    if (companiesRes.data) setCompanies(companiesRes.data);
    if (jobsRes.data) setJobs(jobsRes.data);

    setLoading(false);
  };

  const handleVerificationUpdate = async (companyId, status) => {
    const { error } = await companiesAPI.updateVerification(companyId, status);

    if (!error) {
      alert('Verification status updated!');
      loadData();
    } else {
      alert('Error updating status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('companies')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'companies'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'jobs'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Jobs
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'companies' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Verifications</h2>
                <div className="space-y-4">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {company.company_name}
                          </h3>
                          <p className="text-gray-600">{company.profiles?.email}</p>
                          <p className="text-gray-700 mt-2">
                            Contact: {company.profiles?.full_name}
                          </p>
                          {company.location && (
                            <p className="text-gray-600">Location: {company.location}</p>
                          )}
                          {company.phone && (
                            <p className="text-gray-600">Phone: {company.phone}</p>
                          )}
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            company.verification_status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : company.verification_status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {company.verification_status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">GST Number:</p>
                          <p className="text-gray-900 font-medium">
                            {company.gst_number || 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">CIN Number:</p>
                          <p className="text-gray-900 font-medium">
                            {company.cin_number || 'Not provided'}
                          </p>
                        </div>
                        {company.website && (
                          <div>
                            <p className="text-sm text-gray-600">Website:</p>
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-800 hover:text-blue-900"
                            >
                              {company.website}
                            </a>
                          </div>
                        )}
                      </div>

                      {company.description && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">Description:</p>
                          <p className="text-gray-700">{company.description}</p>
                        </div>
                      )}

                      {company.verification_status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleVerificationUpdate(company.id, 'approved')}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleVerificationUpdate(company.id, 'rejected')}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {companies.length === 0 && (
                  <p className="text-gray-600 text-center py-8">No companies registered yet.</p>
                )}
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Job Listings</h2>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.companies?.company_name}</p>
                          <p className="text-gray-600">
                            {job.location} • {job.job_type}
                          </p>
                          {job.salary_range && (
                            <p className="text-gray-600">Salary: {job.salary_range}</p>
                          )}
                          <p className="text-gray-500 text-sm mt-2">
                            Posted: {new Date(job.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            job.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Description:</p>
                        <p className="text-gray-700 line-clamp-3">{job.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {jobs.length === 0 && (
                  <p className="text-gray-600 text-center py-8">No jobs posted yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
