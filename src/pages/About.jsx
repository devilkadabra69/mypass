import React from "react";

function About() {
  const coffeeId = "adarshak.731@oksbi"; // Replace this with your actual ID for Buy Me a Coffee
  const qrCodeUrl = "./src/assets/GPAY_QR.png"; // Replace this with the actual path to your QR code image

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto p-4 lg:p-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          nulla auctor, vestibulum magna sed, convallis ex.
        </p>
        <img
          src="team.jpg"
          alt="Team Photo"
          className="rounded-md shadow-md mb-8"
        />
        <p className="text-lg leading-relaxed mb-8">
          Our team is dedicated to providing the best experience possible for
          our users. Learn more about our mission and values below.
        </p>
        <ul className="list-none mb-8">
          <li className="mb-4 flex items-center">
            <i className="fas fa-check-square text-green-600 mr-2" />
            <span>Commitment to Excellence</span>
          </li>
          <li className="mb-4 flex items-center">
            <i className="fas fa-users text-orange-600 mr-2" />
            <span>Collaborative Teamwork</span>
          </li>
          <li className="mb-4 flex items-center">
            <i className="fas fa-lightbulb text-blue-600 mr-2" />
            <span>Innovative Solutions</span>
          </li>
        </ul>
        <img
          src="office.jpg"
          alt="Office Photo"
          className="rounded-md shadow-md mb-8"
        />
        <p className="text-lg leading-relaxed mb-8">
          Want to learn more about our company culture? Check out our blog for
          the latest updates and insights.
        </p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md">
          Read Our Blog
        </button>

        {/* Buy Me a Coffee Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Support Our Work</h2>
          <p className="text-lg leading-relaxed mb-4">
            Support our work by buying us a coffee. Scan the QR code or use the
            ID below:
          </p>
          <img
            src={qrCodeUrl}
            alt="Buy Me a Coffee QR Code"
            className="mx-auto mb-4"
            style={{ width: "200px", height: "200px" }}
          />
          <p className="text-lg leading-relaxed mb-8">
            ID: <strong>{coffeeId}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
