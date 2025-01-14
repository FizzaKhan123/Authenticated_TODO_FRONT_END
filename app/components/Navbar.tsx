'use client';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const logout = useLogout();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
