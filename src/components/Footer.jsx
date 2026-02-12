import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
              GetJobAndGo
            </h3>
            <p className="text-gray-400">
              Your career starts here. Connecting students with verified companies.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">For Students</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/student/register" className="text-gray-400 hover:text-white transition-all duration-300">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/student/login" className="text-gray-400 hover:text-white transition-all duration-300">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/company/register" className="text-gray-400 hover:text-white transition-all duration-300">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/company/login" className="text-gray-400 hover:text-white transition-all duration-300">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 GetJobAndGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
