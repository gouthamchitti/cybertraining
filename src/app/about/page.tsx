import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <NavBar />

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              About CyberTrainer
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Our mission is to make cybersecurity education accessible, engaging, and effective for everyone.
            </p>
          </div>

          {/* Our Story */}
          <div className="relative py-16">
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
              <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
                <svg className="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
                  <defs>
                    <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect x="0" y="0" width="4" height="4" className="text-indigo-200 dark:text-indigo-900" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
                </svg>
              </div>
            </div>
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Our Story
                </h2>
                <div className="mt-6 text-gray-500 dark:text-gray-400 space-y-6">
                  <p className="text-lg">
                    CyberTrainer is a specialized cybersecurity education platform created by industry professionals with extensive experience in both offensive and defensive security operations.
                  </p>
                  <p className="text-lg">
                    We observed that while cybersecurity threats continue to grow increasingly sophisticated, educational resources often remain fragmented, overly theoretical, and disconnected from real-world applications.
                  </p>
                  <p className="text-lg">
                    Our platform bridges this gap by providing hands-on, practical training that simulates real-world scenarios. We focus on developing both technical skills and critical thinking abilities essential for modern cybersecurity professionals.
                  </p>
                  <p className="text-lg">
                    CyberTrainer serves learners at all levels - from beginners exploring cybersecurity fundamentals to experienced professionals seeking to enhance their specialized skills in areas like penetration testing, threat hunting, and security operations.
                  </p>
                </div>
              </div>
              <div className="mt-12 relative lg:mt-0">
                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none">
                  <div className="relative rounded-2xl shadow-xl overflow-hidden">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                      alt="Team working on cybersecurity"
                    />
                    <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mt-16">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Values
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                The principles that guide everything we do
              </p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accessibility</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    We believe cybersecurity education should be accessible to everyone, regardless of their background or prior experience.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Practicality</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    We focus on practical, hands-on learning that prepares you for real-world cybersecurity challenges.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Integrity</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    We promote ethical practices and responsible use of cybersecurity knowledge in all our courses.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Team Section */}
          

        </div>
      </main>

      <Footer />
    </div>
  );
}
