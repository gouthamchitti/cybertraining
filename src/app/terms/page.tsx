import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <NavBar />

      {/* Main Content */}
      <main className="py-10 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Last updated: April 1, 2023
            </p>
          </div>

          {/* Terms of Service Content */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="prose prose-indigo max-w-none dark:prose-dark">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using CyberTrainer's website, platform, or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Services.
                </p>
                <p>
                  We may modify these Terms at any time. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
                </p>

                <h2>2. Account Registration</h2>
                <p>
                  To access certain features of the Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p>
                  You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>

                <h2>3. User Conduct</h2>
                <p>
                  You agree not to:
                </p>
                <ul>
                  <li>Use the Services for any illegal purpose or in violation of any laws</li>
                  <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
                  <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                  <li>Attempt to gain unauthorized access to any part of the Services</li>
                  <li>Use the Services to transmit viruses, malware, or other harmful code</li>
                  <li>Harass, threaten, or intimidate any person or entity</li>
                  <li>Impersonate any person or entity</li>
                  <li>Engage in any activity that could disable, overburden, or impair the Services</li>
                </ul>

                <h2>4. Content and Intellectual Property</h2>
                <p>
                  The Services and their contents, including but not limited to text, graphics, images, logos, button icons, software, and other material (collectively, "Content"), are protected by copyright, trademark, and other laws. We or our licensors own the Content, and you may not use it except as provided in these Terms.
                </p>
                <p>
                  We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Services for their intended purposes, subject to these Terms.
                </p>

                <h2>5. User Content</h2>
                <p>
                  You retain ownership of any content you submit, post, or display on or through the Services ("User Content"). By providing User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, create derivative works based upon, distribute, and display your User Content for the purpose of operating and providing the Services.
                </p>
                <p>
                  You represent and warrant that you own or have the necessary rights to your User Content and that it does not violate these Terms or any applicable laws.
                </p>

                <h2>6. Payment Terms</h2>
                <p>
                  Certain aspects of the Services may require payment. You agree to pay all fees and charges associated with your account on a timely basis and according to the fees, charges, and billing terms in effect at the time.
                </p>
                <p>
                  All payments are non-refundable unless otherwise specified in our refund policy or required by law.
                </p>

                <h2>7. Termination</h2>
                <p>
                  We may terminate or suspend your access to the Services at any time, with or without cause, and with or without notice. Upon termination, your right to use the Services will immediately cease.
                </p>
                <p>
                  You may terminate your account at any time by contacting us. Termination of your account may not result in the removal of content you have posted.
                </p>

                <h2>8. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
                </p>

                <h2>10. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>

                <h2>11. Dispute Resolution</h2>
                <p>
                  Any dispute arising from or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996.
                </p>

                <h2>12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p>
                  Email: legal@cybertrainer.in<br />
                  Address: CyberTrainer Legal Department, Hyderabad, India
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
