import React, { useEffect, useRef } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import PDFViewer from "pdf-viewer-reactjs";

const ContactUs = () => {
  const navigate = useNavigate();
  const shouldRedirect = true;
  const loaction = useLocation();
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = document.getElementById("myIframe");
    if (iframe) {
      iframe.contentWindow?.document.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === "A" && target.target === "_blank") {
          event.preventDefault();
          alert("Popout disabled!");
        }
      });
    }
  }, []);

  return (

    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Have questions? Reach out to us anytime!
        </p>

        {/* Contact Details Section */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {/* Phone Support */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaPhone className="text-red-500 text-4xl mx-auto" />
            <h3 className="text-lg font-semibold mt-3">Phone Support</h3>
            <p className="text-gray-600">+91 9099763599</p>
            <p className="text-gray-400 text-sm">Available 9 AM - 6 PM</p>
          </div>

          {/* Email Support */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaEnvelope className="text-red-500 text-4xl mx-auto" />
            <h3 className="text-lg font-semibold mt-3">Email Us</h3>
            <p className="text-gray-600">support@eclothstore.com</p>
            <p className="text-gray-400 text-sm">Response within 24 hours</p>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaWhatsapp className="text-green-500 text-4xl mx-auto" />
            <h3 className="text-lg font-semibold mt-3">WhatsApp Chat</h3>
            <p className="text-gray-600">+91 9099763599</p>
            <p className="text-gray-400 text-sm">Instant replies</p>
          </div>
        </div>

        {/* Store Location with Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Visit Our Store
          </h2>
          <p className="text-center text-gray-600">
            Find us at our Ahmedabad location.
          </p>
          <div className="flex flex-col items-center mt-5">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 text-center">
              <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto" />
              <h3 className="text-lg font-semibold mt-3">Our Address</h3>
              <p className="text-gray-600">Kargil, Ahmedabad, India</p>
              <p className="text-gray-400 text-sm">Open: 10 AM - 8 PM</p>
            </div>

            {/* <iframe
              className="w-full h-72"
              allowFullScreen={false}
              src="https://docs.google.com/gview?url=https://s3bucket.onthecloud.in/vega-erp-dev//dms/CRM/1741680827288-Project_Requirements_Document_for_DMS.pdf&embedded=true"
            ></iframe> */}

            {/* <Document file="https://docs.google.com/gview?url=https://s3bucket.onthecloud.in/vega-erp-dev//dms/CRM/1741680827288-Project_Requirements_Document_for_DMS.pdf&embedded=true"></Document> */}
            {/* <PDFViewer
              document={{
                url: "https://arxiv.org/pdf/quant-ph/0410100.pdf",
              }}
            /> */}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 max-w-2xl mx-auto">
            <details className="bg-white p-4 rounded-lg shadow-md mb-3">
              <summary className="font-semibold cursor-pointer">
                How can I track my order?
              </summary>
              <p className="text-gray-600 mt-2">
                Once your order is shipped, you'll receive a tracking link via
                email.
              </p>
            </details>
            <details className="bg-white p-4 rounded-lg shadow-md mb-3">
              <summary className="font-semibold cursor-pointer">
                What is your return policy?
              </summary>
              <p className="text-gray-600 mt-2">
                We offer a 14-day return policy on unused items. Contact support
                for details.
              </p>
            </details>
            <details className="bg-white p-4 rounded-lg shadow-md mb-3">
              <summary className="font-semibold cursor-pointer">
                Do you offer international shipping?
              </summary>
              <p className="text-gray-600 mt-2">
                Yes! We deliver worldwide. Shipping fees and times vary by
                location.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
