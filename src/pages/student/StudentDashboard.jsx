import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { jobsAPI, applicationsAPI, studentsAPI } from '../../services/api';
import JobCard from '../../components/JobCard';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    degree: '',
    skills: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const [profileRes, jobsRes, appsRes] = await Promise.all([
      studentsAPI.getProfile(user.id),
      jobsAPI.getAll(),
      applicationsAPI.getByStudent(user.id),
    ]);

    if (profileRes.data) {
      setProfile(profileRes.data);
      setProfileData({
        degree: profileRes.data.degree || '',
        skills: profileRes.data.skills ? profileRes.data.skills.join(', ') : '',
        phone: profileRes.data.phone || '',
        bio: profileRes.data.bio || '',
      });
    }

    if (jobsRes.data) setJobs(jobsRes.data);
    if (appsRes.data) setApplications(appsRes.data);

    setLoading(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const skillsArray = profileData.skills.split(',').map((s) => s.trim()).filter((s) => s);

    const { error } = await studentsAPI.update(user.id, {
      degree: profileData.degree,
      skills: skillsArray,
      phone: profileData.phone,
      bio: profileData.bio,
    });

    if (!error) {
      alert('Profile updated successfully!');
      loadData();
    } else {
      alert('Error updating profile');
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Student Dashboard</h1>

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
                Profile
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'jobs'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Browse Jobs
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'applications'
                    ? 'border-blue-800 text-blue-800'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Applications
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree / Education
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={profileData.degree}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., B.Tech in Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={profileData.skills}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., React, Node.js, Python"
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
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself"
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

            {activeTab === 'jobs' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Jobs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                {jobs.length === 0 && (
                  <p className="text-gray-600 text-center py-8">No jobs available at the moment.</p>
                )}
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {app.jobs?.title}
                          </h3>
                          <p className="text-gray-600">{app.jobs?.companies?.company_name}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            Applied on: {new Date(app.applied_at).toLocaleDateString()}
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
                    </div>
                  ))}
                </div>
                {applications.length === 0 && (
                  <p className="text-gray-600 text-center py-8">
                    You haven't applied to any jobs yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
