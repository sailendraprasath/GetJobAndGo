import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jobsAPI, applicationsAPI } from '../../services/api';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    loadJob();
    checkApplication();
  }, [id, user]);

  const loadJob = async () => {
    const { data } = await jobsAPI.getById(id);
    if (data) {
      setJob(data);
    }
    setLoading(false);
  };

  const checkApplication = async () => {
    const { data } = await applicationsAPI.getByStudent(user.id);
    if (data) {
      const applied = data.some((app) => app.job_id === id);
      setHasApplied(applied);
    }
  };

  const handleApply = async () => {
    setApplying(true);

    const { error } = await applicationsAPI.create({
      job_id: id,
      student_id: user.id,
      cover_letter: coverLetter,
      status: 'pending',
    });

    setApplying(false);

    if (!error) {
      alert('Application submitted successfully!');
      setHasApplied(true);
    } else {
      alert('Error submitting application: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Job not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-800 hover:text-blue-900 mb-6 flex items-center"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600">{job.companies?.company_name}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                {job.job_type}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-gray-700">
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{job.location}</span>
              </div>
              {job.salary_range && (
                <div className="flex items-center">
                  <span className="mr-2">💰</span>
                  <span>{job.salary_range}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>

            {job.requirements && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About Company</h2>
              <p className="text-gray-700">
                {job.companies?.description || 'No description available'}
              </p>
              {job.companies?.website && (
                <a
                  href={job.companies.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:text-blue-900 mt-2 inline-block"
                >
                  Visit Company Website →
                </a>
              )}
            </div>
          </div>

          {!hasApplied ? (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Apply for this position</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write a brief cover letter to introduce yourself..."
                  />
                </div>

                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg">
                <p className="font-semibold">✓ You have already applied to this position</p>
                <p className="text-sm mt-1">Check your applications tab to track the status</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
