import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-black mb-12">404 Not Found</h1>
      <p className="text-xl mb-12">
      Your visited page not found. You may go home page.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-[#DB4444]  text-white rounded-lg font-semibold hover:bg-[rgb(219, 68, 60, 0.1)] transition"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default NotFound;
