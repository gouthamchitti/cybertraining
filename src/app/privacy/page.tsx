import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <NavBar />

      {/* Main Content */}
      <main className="py-10 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Last updated: April 1, 2023
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="prose prose-indigo max-w-none dark:prose-dark">
                <h2>Introduction</h2>
                <p>
                  CyberTrainer ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                </p>

                <h2>Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us when you:
                </p>
                <ul>
                  <li>Register for an account</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request information or support</li>
                  <li>Participate in surveys or contests</li>
                  <li>Communicate with us</li>
                </ul>
                <p>
                  The types of information we may collect include:
                </p>
                <ul>
                  <li>Personal identifiers (name, email address, phone number)</li>
                  <li>Account credentials</li>
                  <li>Payment information</li>
                  <li>Educational and professional information</li>
                  <li>Communication preferences</li>
                </ul>

                <h2>Automatically Collected Information</h2>
                <p>
                  When you visit our website or use our platform, we automatically collect certain information about your device and usage, including:
                </p>
                <ul>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring website</li>
                  <li>Pages you view</li>
                  <li>Time spent on pages</li>
                  <li>Links you click</li>
                  <li>Other usage patterns</li>
                </ul>
                <p>
                  We collect this information using cookies, web beacons, and similar technologies. For more information about our use of these technologies, please see our <Link href="/cookie-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Cookie Policy</Link>.
                </p>

                <h2>How We Use Your Information</h2>
                <p>
                  We may use the information we collect for various purposes, including to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information, such as updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Communicate with you about products, services, offers, and events</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Protect against harmful or unlawful activity</li>
                </ul>

                <h2>Sharing Your Information</h2>
                <p>
                  We may share your information with:
                </p>
                <ul>
                  <li>Service providers who perform services on our behalf</li>
                  <li>Partners with whom we offer co-branded services or joint marketing activities</li>
                  <li>Third parties in connection with a business transaction</li>
                  <li>Law enforcement or other third parties as required by law</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties.
                </p>

                <h2>Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul>
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate or incomplete information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction or objection to processing</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@cybertrainer.in.
                </p>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                </p>

                <h2>International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
                </p>

                <h2>Children's Privacy</h2>
                <p>
                  Our services are not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this privacy policy frequently to stay informed about how we are protecting your information.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions or concerns about this privacy policy or our privacy practices, please contact us at:
                </p>
                <p>
                  Email: privacy@cybertrainer.in<br />
                  Address: CyberTrainer Privacy Team, Hyderabad, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
