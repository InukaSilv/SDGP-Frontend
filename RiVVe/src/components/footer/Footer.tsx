// src/components/Footer.js
import React from 'react';
import { Facebook, Music2, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800/50 border-t border-gray-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">RiVVE</h3>
            <p className="text-gray-400">Connecting students with hostel experiences Sri Lanka.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/rivvelk" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@rivvelk?_t=ZS-8uZP1OvKvti&_r=1" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Music2 className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/rivve_lk" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:rivvelk@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-center text-lg font-semibold text-white mb-4"></h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-right text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="text-right space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/hostel" className="text-gray-400 hover:text-blue-400 transition-colors">Find Hostels</a></li>
              <li><a href="/Contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="https://www.rivve.online" className="text-gray-400 hover:text-blue-400 transition-colors">Marketing Web</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 RiVVE. All rights reserved.</p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made by #teamRiVVE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
