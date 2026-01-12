import React from "react";

const PrivacyPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10 font-sans text-gray-800 leading-relaxed">
      
      {/* Main Title */}
      <h1 className="text-center mt-4 mb-10 text-3xl md:text-4xl font-semibold text-[#b0824a]">
        Disclaimer & Privacy Policy
      </h1>

      {/* Disclaimer */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900">Disclaimer</h2>
        <p>
          This website is only for the purpose of providing information regarding
          real estate projects in different regions. By accessing this website,
          the viewer confirms that the information including brochures and
          marketing collaterals on this website is solely for informational
          purposes and the viewer has not relied on this information for making
          any booking/purchase in any project of the company... 
          <br /><br />
          This site is for information purpose only and should not be treated as
          the official website. This is not the official website of developer &
          property, it belongs to authorised marketing partner for information
          purpose only.
        </p>
      </section>

      {/* Privacy Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900 text-balance">Privacy Policy</h2>
        <p>
          In our endeavor and commitment of protecting your personal information,
          we have designed this comprehensive privacy policy. This is to keep your
          interests and information safe on our website.
        </p>
      </section>

      {/* Update Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900 text-balance">Updation of Privacy Policy</h2>
        <p>
          This privacy policy is subject to undergo change and review without any
          prior notice or approval. So to keep yourself updated on the changes
          introduced, please keep visiting and reviewing the terms and conditions
          of this privacy policy.
        </p>
      </section>

      {/* User Information */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900">User Information</h2>
        <p>
          By using our website, you agree to abide by the rules laid out by us and
          consent to collection and use of all such information that you may
          furnish to, or through, our website. In some cases, while you visit our
          website, you may not need to provide any personal information. But in
          certain instances, we must have your personal information in order for
          us to grant you access to some of the links or sites. Such links/ pages
          may ask for your name, e-mail address, phone number etc. The information
          furnished by you is used to provide relevant products and services and
          to acknowledge receipt of your communication or to send out information
          and updates to you. You have option of requesting removal from our
          mailing list. We do not give away your personal information to any third
          party.
        </p>
      </section>

      {/* Security */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900 text-balance">Security</h2>
        <p>
          To ensure security while transferring sensitive information, all the
          ongoing transmissions between client and server are encrypted using
          advanced and standard protocols. We also practice restricted access by
          employees and hold them to high levels of confidentiality. 
          <span className="block mt-4 font-semibold italic text-gray-700">Use of Cookies:</span>
          We may use cookies for security, session continuity, and
          customization purposes. In case of a user opting to reject a cookie,
          he/ she may not be able to gain access to some of the limited services or
          use some features of the site. In case of any queries or suggestions
          regarding privacy statement or your dealings with this web site, please
          contact:
        </p>
      </section>
      
    </div>
  );
};

export default PrivacyPage;