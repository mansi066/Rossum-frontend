import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import { contactInfo } from "../constants";

const ContactUs = () => {
  return (
    <Section className="overflow-hidden" id="contact-us">
      <div className="container relative z-2">
        <Heading title="Contact Us" />

        <div className={`grid gap-6 mt-6 
          ${contactInfo.length === 2 ? "grid-cols-1 md:grid-cols-2 justify-center" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
        >
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 text-white rounded-lg shadow-lg text-center cursor-pointer transition-transform duration-500 ease-out hover:scale-110 hover:shadow-lg hover:shadow-gray-900"
            >
              {/* Contact Image */}
              <img
                src={info.url}
                alt={info.title}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
              />

              {/* Contact Details */}
              <h3 className="text-lg font-bold">{info.title}</h3>
              <p>
                <a
                  href={`mailto:${info.email}`}
                  className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
                >
                  {info.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${info.phoneNumber}`}
                  className="text-green-400 hover:text-green-600 transition-colors duration-200"
                >
                  {info.phoneNumber}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ContactUs;