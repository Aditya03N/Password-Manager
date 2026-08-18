import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4 flex items-center justify-between">
      {/* Logo / Brand Name */}
      <div className="text-white text-xl font-bold cursor-pointer">
        MyLogo
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 font-semibold">
        <li>
          <a href="/" className="text-white hover:text-gray-200">Home</a>
        </li>
        <li>
          <a href="/about" className="text-white hover:text-gray-200">About</a>
        </li>
        <li>
          <a href="/contact" className="text-white hover:text-gray-200">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

