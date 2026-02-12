import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-gray-600">{job.companies?.company_name}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {job.job_type}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-gray-700 flex items-center">
          <span className="mr-2">📍</span>
          {job.location}
        </p>
        {job.salary_range && (
          <p className="text-gray-700 flex items-center">
            <span className="mr-2">💰</span>
            {job.salary_range}
          </p>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <Link
        to={`/student/job/${job.id}`}
        className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
