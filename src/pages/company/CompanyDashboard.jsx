import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { jobsAPI, applicationsAPI, companiesAPI } from '../../services/api';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    gst_number: '',
    cin_number: '',
    website: '',
    description: '',
    location: '',
    phone: '',
  });
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    job_type: 'full-time',
    salary_range: '',
  });

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const [profileRes, jobsRes] = await Promise.all([
      companiesAPI.getProfile(user.id),
      jobsAPI.getByCompany(user.id),
    ]);

    if (profileRes.data) {
      setProfile(profileRes.data);
      setProfileData({
        gst_number: profileRes.data.gst_number || '',
        cin_number: profileRes.data.cin_number || '',
        website: profileRes.data.website || '',
        description: profileRes.data.description || '',
        location: profileRes.data.location || '',
        phone: profileRes.data.phone || '',
      });
    }

    if (jobsRes.data) setJobs(jobsRes.data);

    setLoading(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const { error } = await companiesAPI.update(user.id, profileData);

    if (!error) {
      alert('Profile updated successfully!');
      loadData();
    } else {
      alert('Error updating profile');
    }
  };

  const handleJobCreate = async (e) => {
    e.preventDefault();

    const { error } = await jobsAPI.create({
      ...jobData,
      company_id: user.id,
      status: 'active',
    });

    if (!error) {
      alert('Job posted successfully!');
      setJobData({
        title: '',
        description: '',
        requirements: '',
        location: '',
        job_type: 'full-time',
        salary_range: '',
      });
      loadData();
    } else {
      alert('Error posting job');
    }
  };

  const handleInputChange = (e, setData) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loadApplicants = async (jobId) => {
    setSelectedJob(jobId);
    const { data } = await applicationsAPI.getByJob(jobId);
    if (data) setApplicants(data);
  };

  const handleStatusUpdate = async (appId, status) => {
    const { error } = await applicationsAPI.updateStatus(appId, status);
    if (!error) {
      alert('Status updated successfully!');
      if (selectedJob) loadApplicants(selectedJob);
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Company Dashboard</h1>
          {profile && (
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-gray-600">Verification Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  profile.verification_status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : profile.verification_status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {profile.verification_status}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'profile'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Company Profile
              </button>
              <button
                onClick={() => setActiveTab('postJob')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'postJob'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Post Job
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'jobs'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Jobs
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number
                      </label>
                      <input
                        type="text"
                        name="gst_number"
                        value={profileData.gst_number}
                        onChange={(e) => handleInputChange(e, setProfileData)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter GST number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CIN Number
                      </label>
                      <input
                        type="text"
                        name="cin_number"
                        value={profileData.cin_number}
                        onChange={(e) => handleInputChange(e, setProfileData)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter CIN number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={profileData.website}
                      onChange={(e) => handleInputChange(e, setProfileData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.yourcompany.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange(e, setProfileData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter company location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange(e, setProfileData)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Description
                    </label>
                    <textarea
                      name="description"
                      value={profileData.description}
                      onChange={(e) => handleInputChange(e, setProfileData)}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your company"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'postJob' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h2>
                {profile?.verification_status !== 'approved' ? (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
                    <p className="font-semibold">⚠ Company Verification Required</p>
                    <p className="text-sm mt-1">
                      Your company needs to be verified before you can post jobs. Please complete
                      your profile with GST/CIN details and wait for admin approval.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleJobCreate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={jobData.title}
                        onChange={(e) => handleInputChange(e, setJobData)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Senior Software Engineer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description
                      </label>
                      <textarea
                        name="description"
                        required
                        value={jobData.description}
                        onChange={(e) => handleInputChange(e, setJobData)}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the role and responsibilities"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Requirements
                      </label>
                      <textarea
                        name="requirements"
                        value={jobData.requirements}
                        onChange={(e) => handleInputChange(e, setJobData)}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="List the required skills and qualifications"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={jobData.location}
                          onChange={(e) => handleInputChange(e, setJobData)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Mumbai, Remote"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Type
                        </label>
                        <select
                          name="job_type"
                          value={jobData.job_type}
                          onChange={(e) => handleInputChange(e, setJobData)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="internship">Internship</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        name="salary_range"
                        value={jobData.salary_range}
                        onChange={(e) => handleInputChange(e, setJobData)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., ₹8-12 LPA"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md"
                    >
                      Post Job
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posted Jobs</h2>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">
                            {job.location} • {job.job_type}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
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
                      <button
                        onClick={() => loadApplicants(job.id)}
                        className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-xl transition-all duration-300"
                      >
                        View Applicants
                      </button>
                    </div>
                  ))}
                </div>
                {jobs.length === 0 && (
                  <p className="text-gray-600 text-center py-8">No jobs posted yet.</p>
                )}

                {selectedJob && applicants.length > 0 && (
                  <div className="mt-8 border-t pt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Applicants</h3>
                    <div className="space-y-4">
                      {applicants.map((app) => (
                        <div
                          key={app.id}
                          className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">
                                {app.students?.profiles?.full_name}
                              </h4>
                              <p className="text-gray-600">{app.students?.profiles?.email}</p>
                              <p className="text-gray-700 mt-2">{app.students?.degree}</p>
                              {app.students?.skills && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {app.students.skills.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <p className="text-gray-500 text-sm mt-2">
                                Applied: {new Date(app.applied_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                app.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : app.status === 'shortlisted'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>
                          {app.cover_letter && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700">Cover Letter:</p>
                              <p className="text-gray-600 mt-1">{app.cover_letter}</p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(app.id, 'shortlisted')}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                            >
                              Shortlist
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app.id, 'rejected')}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
