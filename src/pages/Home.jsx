import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  const features = [
    {
      icon: '✓',
      title: 'Verified Companies',
      description: 'All companies are verified with GST/CIN to ensure authenticity and trust.',
    },
    {
      icon: '⚡',
      title: 'Fast Hiring',
      description: 'Quick application process and direct connection with hiring companies.',
    },
    {
      icon: '📝',
      title: 'Easy Apply',
      description: 'Simple one-click application process with your profile and resume.',
    },
    {
      icon: '📈',
      title: 'Career Growth',
      description: 'Find opportunities that match your skills and career aspirations.',
    },
  ];

  return (
    <div>
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get Job and Go – Your Career Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100">
              Connecting talented students with verified companies for meaningful career opportunities
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/student/register"
                className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Join as Student
              </Link>
              <Link
                to="/company/register"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Register as Company
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose GetJobAndGo?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of students and companies finding the perfect match
            </p>
            <Link
              to="/student/register"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
