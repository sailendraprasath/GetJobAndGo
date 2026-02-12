import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-green-500 bg-clip-text text-transparent">
              GetJobAndGo
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/student/login"
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-lg transition-all duration-300"
                >
                  Student Login
                </Link>
                <Link
                  to="/company/login"
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-lg transition-all duration-300"
                >
                  Company Login
                </Link>
                <Link
                  to="/student/register"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-md"
                >
                  Join as Student
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={
                    profile?.role === 'student'
                      ? '/student/dashboard'
                      : profile?.role === 'company'
                      ? '/company/dashboard'
                      : '/admin/dashboard'
                  }
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-lg transition-all duration-300"
                >
                  Dashboard
                </Link>
                <span className="text-gray-600">{profile?.full_name}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-md"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
