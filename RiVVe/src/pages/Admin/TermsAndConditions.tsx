import { ScrollText } from "lucide-react";

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center space-x-3">
          <ScrollText className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 mb-6">
                Welcome to RiVVE, a hostel marketplace web application
                connecting students and landlords for hostel accommodations. By
                using our website and services, you agree to comply with these
                Terms and Conditions. If you do not agree, please do not use our
                platform.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. User Accounts
              </h2>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li className="mb-2">
                  To access certain features, users must create an account.
                </li>
                <li className="mb-2">
                  Users must provide accurate and updated information.
                </li>
                <li className="mb-2">
                  Users are responsible for maintaining the confidentiality of
                  their account credentials.
                </li>
                <li>
                  RiVVE is not liable for unauthorized access to your account.
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. User Responsibilities
              </h2>
              <p className="text-gray-600 mb-6">
                Users (both students and landlords) must ensure that the
                information they provide (hostel listings, reviews, messages,
                etc.) is accurate, legal, and non-misleading. Users must not
                engage in any activity that violates applicable laws, including
                fraud, harassment, or misleading advertisements.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Listings and Bookings
              </h2>
              <p className="text-gray-600 mb-6">
                Landlords are responsible for ensuring that their hostel
                listings are accurate, up-to-date, and comply with legal
                standards. RiVVE does not verify the authenticity of listings
                and is not responsible for disputes between users.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Payments and Fees
              </h2>
              <p className="text-gray-600 mb-6">
                RiVVE may introduce transaction fees for bookings or premium
                features. Users agree to pay applicable fees and understand that
                RiVVE does not process payments directly, but may use
                third-party payment processors.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Content and Intellectual Property
              </h2>
              <p className="text-gray-600 mb-6">
                By submitting content (images, reviews, descriptions), users
                grant RiVVE a non-exclusive, royalty-free license to use,
                modify, and display the content. Users must not upload
                copyrighted, offensive, or illegal content.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Messaging and Communication
              </h2>
              <p className="text-gray-600 mb-6">
                Users can communicate through RiVVE's chat feature. Any
                harassment, spam, or abusive behavior is strictly prohibited.
                RiVVE does not monitor private conversations but may investigate
                reports of misconduct.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Privacy Policy
              </h2>
              <p className="text-gray-600 mb-6">
                RiVVE collects and stores user data as per our Privacy Policy.
                Personal data is used for platform functionality and will not be
                shared with third parties without user consent, except as
                required by law.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Termination of Accounts
              </h2>
              <p className="text-gray-600 mb-6">
                RiVVE reserves the right to suspend or terminate accounts that
                violate these terms. Users may request account deletion, but
                certain data may be retained for legal or security reasons.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Disclaimer of Liability
              </h2>
              <p className="text-gray-600 mb-6">
                RiVVE does not own or manage any hostel listings and is not
                responsible for landlord-tenant disputes. RiVVE is not liable
                for damages arising from the use of the platform.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-600 mb-6">
                RiVVE reserves the right to update these terms at any time.
                Users will be notified of significant changes, and continued use
                of the platform implies acceptance of the updated terms.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                13. Contact Information
              </h2>
              <p className="text-gray-600">
                For any questions, contact{" "}
                <a
                  href="mailto:support@rivve.com"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  support@rivve.com
                </a>
              </p>
            </div>

            {/* Last Updated */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TermsAndConditions;
