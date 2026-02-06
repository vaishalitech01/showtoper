import React from "react";

const PrivacyPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10 font-sans text-gray-800 leading-relaxed">
      
      <h1 className="text-center mt-4 mb-10 text-3xl md:text-4xl font-semibold text-[#b0824a]">
        Disclaimer & Privacy Policy
      </h1>

      {/* Disclaimer */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900">Disclaimer</h2>
        <p>
          This website is an independent marketing and information platform created
          for the purpose of providing general information about real estate
          projects in different regions. All content, including brochures,
          pricing, layouts, and marketing materials, is shared strictly for
          informational purposes only.
          <br /><br />
          This website is not the official website of any developer or real estate
          company. It is owned and operated by an authorized marketing partner and
          does not claim to represent any developer officially. Users are advised
          to verify all details directly with the respective developer or official
          sources before making any decisions.
        </p>
      </section>

      {/* Privacy Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900">Privacy Policy</h2>
        <p>
          We are committed to protecting your privacy and ensuring transparency in
          how your personal information is collected and used. This privacy policy
          explains how we handle user data responsibly and lawfully.
        </p>
      </section>

      {/* Policy Updates */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900">Updation of Privacy Policy</h2>
        <p>
          This privacy policy may be updated from time to time without prior
          notice. Any changes will be reflected on this page, and users are
          encouraged to review it periodically.
        </p>
      </section>

      {/* User Information */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900">User Information & Consent</h2>
        <p>
          Users may browse this website without providing personal information.
          Personal details such as name, phone number, or email address are
          collected only when users voluntarily submit them through inquiry or
          contact forms with clear consent.
          <br /><br />
          The information provided by users is used strictly for the purpose of
          responding to inquiries, sharing relevant project details, and
          connecting users with authorized real estate service providers based on
          their request. We do not use personal data for misleading purposes, spam,
          or unsolicited communication.
          <br /><br />
          We do not sell, rent, trade, or disclose user data to any unauthorized
          third party. User information is shared only with relevant service
          providers to fulfill the user’s inquiry and only with consent.
        </p>
      </section>

      {/* Security & Cookies */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900">Data Security & Cookies</h2>
        <p>
          We implement reasonable technical and organizational measures to protect
          personal information from unauthorized access, misuse, or disclosure.
          All data transmission between the user and server is encrypted using
          standard security protocols.
          <br /><br />
          <span className="font-semibold">Use of Cookies:</span> We may use cookies
          to enhance user experience, analyze traffic, and ensure proper website
          functionality. Users may choose to disable cookies through their browser
          settings; however, some features of the website may not function
          properly.
        </p>
      </section>

    </div>
  );
};

export default PrivacyPage;
