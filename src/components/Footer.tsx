import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 relative overflow-hidden mt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-800 blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center group cursor-pointer">
              <div className="relative w-10 h-10 overflow-hidden mr-2 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-md shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-1.5 7.5v-3a1.5 1.5 0 0 1 3 0v3h-3Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">CyberTrainer.in</span>
            </div>
            <p className="text-gray-300 text-base">
              Premier cybersecurity training platform offering hands-on courses in ethical hacking, penetration testing, network security, and defensive security. Learn from industry experts and advance your cybersecurity career.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/in/chittigouthamkumar/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-300 transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-purple-300 tracking-wider uppercase">Platform</h3>
                <ul className="mt-4 space-y-4">
                  <li>

                  </li>
                  <li>
                    {/* Challenges link removed */}
                  </li>
                  <li>
                    <Link href="/demo" className="text-base text-gray-300 hover:text-purple-300 transition-colors duration-200">
                      Trainer AI
                    </Link>
                  </li>
                  <li>

                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-purple-300 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>

                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-300 hover:text-purple-300 transition-colors duration-200">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    {/* FAQ link removed */}
                  </li>
                  <li>
                    {/* Community link removed */}
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-purple-300 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-300 hover:text-purple-300 transition-colors duration-200">
                      About
                    </Link>
                  </li>
                  <li>
                    {/* Blog link removed */}
                  </li>
                  <li>
                    {/* Careers link removed */}
                  </li>
                  <li>

                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} CyberTrainer.in by Goutham Kumar. All rights reserved. | Professional Cybersecurity Training, Ethical Hacking Courses, Network Security, Penetration Testing | Visit us at <a href="https://cybertrainer.in" className="hover:text-purple-300 transition-colors">cybertrainer.in</a>
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <Link href="/contact" className="text-gray-400 hover:text-purple-300 transition-colors duration-200 text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
