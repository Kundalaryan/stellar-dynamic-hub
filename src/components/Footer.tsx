
import React from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">ResearchLab</h3>
            <p className="text-navy-200 mb-4">
              Advancing knowledge through interdisciplinary research and innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-navy-200 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-navy-200 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-navy-200 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-navy-200 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-navy-200 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-navy-200 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#publications" className="text-navy-200 hover:text-white transition-colors">
                  Publications
                </a>
              </li>
              <li>
                <a href="#team" className="text-navy-200 hover:text-white transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#events" className="text-navy-200 hover:text-white transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="text-navy-200 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Research Database
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Student Opportunities
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Funding Opportunities
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Press Releases
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-navy-200 mb-4">
              Subscribe to our newsletter to receive updates on our research and events.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md flex-grow bg-navy-800 text-white border border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-navy-300 text-sm">
            &copy; {new Date().getFullYear()} ResearchLab. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-navy-300 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-navy-300 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-navy-300 hover:text-white text-sm">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
