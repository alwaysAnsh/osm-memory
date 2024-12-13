import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
      <div className="bg-gray-50 rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Osm-Memory</h1>
        <p className="text-gray-600 mb-6">Your memories, securely stored and easily accessible.</p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/auth-L"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/auth-R"
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/auth-admin"
            className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition duration-300"
          >
            Agent Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
