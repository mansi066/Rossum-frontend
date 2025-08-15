import React, { useState } from "react";
import Section from "./Section";
import { socials } from "../constants";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "./Button";
import axios from 'axios';
// import { db } from "./firebase"; // Ensure firebase.js correctly exports db
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Footer = () => {
  const [input, setInput] = useState("");

  const [subscribed, setSubscribed] = useState(false);

  let submitHandler = (e) => {
  e.preventDefault();

  const formData = {
    email: input
  };

  axios.post('http://localhost:8000/api/website/subscribers/insert', formData)
    .then((res) => {
      console.log(res.data);
      alert("🎉 Thank you for subscribing to Rossum! We'll keep you posted on exciting events and updates!");
      setInput("");         
      setSubscribed(true);  
    })
    .catch((error) => {
      console.error("Subscription error:", error);
      alert("Oops! Something went wrong while subscribing. Please try again later.");
    });
};
  // const inputHandler = (e) => {
  //   setInput(e.target.value);
  // };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   if (input) {
  //     console.log("Submitting email:", input);

  //     try {
  //       await addDoc(collection(db, "emails"), {
  //         email: input,
  //         time: serverTimestamp(),
  //       });
  //       setInput("");
  //       alert("Thanks you for subscribing!");
  //       console.log(" Email successfully stored in Firestore!");
  //     } catch (error) {
  //       console.error(" Firestore Error:", error);
  //       alert("Subscription failed! Check the console for details.");
  //     }
  //   } else {
  //     alert("Please enter a valid email address.");
  //   }
  // };

  
  

  
  return (
    <Section crosses className="!px-0 !py-10 bg-gray-900 text-white">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-bold text-red-500">About Us</h2>
          <p className="text-sm">
            Join Rossum, the premier tech hub. Learn, grow, and innovate with fellow tech enthusiasts.
          </p>
          <br />

 <div className="mt-4 flex items-center gap-2">
  {/* Clickable Map Icon */}
  <a
    href="https://www.bing.com/maps?mepi=127%7EDirections%7EUnknown%7EDirection_Button&ty=0&rtp=pos.28.339290618896484_78.26226043701172__Jaypee+University+Anoopshahr__e_%7E&mode=d&v=2&sV=1&cp=28.339312%7E78.262259&lvl=14.5"
    target="_blank"
    rel="noopener noreferrer"
    className="text-red-500"
  >
    <FaMapMarkerAlt className="text-red-500 text-lg cursor-pointer hover:text-red-700 transition-transform duration-300 scale-105" />
  </a>

  {/* Address Text */}
  <p className="text-sm">
    Jaypee University Anoopshahr,<br />
    Bulandshahr, Uttar Pradesh - 203390, India
  </p>
</div>
          <br />
        </div>

        {/* Quick Links Section */}
        <div>
         <h3 className="text-md font-semibold text-red-500">Quick Links</h3>
<ul className="space-y-2">
  <li>
    <a href="#home" className="hover:underline hover:text-green-300">Home</a>
  </li>
  <li>
    <a href="#about" className="hover:underline hover:text-green-300">About Us</a>
  </li>
  <li>
    <a href="#events" className="hover:underline hover:text-green-300">Events</a>
  </li>
  <li>
    <a href="#team" className="hover:underline hover:text-green-300">Our Team</a>
  </li>
  <li>
    <a href="#contact-us" className="hover:underline hover:text-green-300">Contact Us</a>
  </li>
</ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="text-md font-semibold text-red-500">Community</h3>
          <ul className="space-y-2">
            {["Join Us", "FAQ", "Code of Conduct"].map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:underline hover:text-green-400">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-2xl font-bold text-red-500">Subscribe to Our Newsletter</h1>
          <p className="text-sm">Stay updated with our latest events and announcements.</p>
            <form action="" onSubmit={submitHandler} className="mt-4 w-full max-w-md">
              <input
              type="email"
              name="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your email"
              className="p-2 rounded w-full max-w-[70%] sm:w-[70%] text-white bg-gray-800 focus:ring-2 focus:ring-red-500"
              />
            <br />
            <Button className="mt-4 w-[40%] text-center justify-center mx-auto flex " type="submit" white>
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Social Media Links */}
      <h3 className="text-xl font-semibold text-red-500 text-center">Connect with Us</h3>
      <div className="flex justify-center gap-4 mt-4">
        {socials.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-red-500 transition-all duration-300"
          >
            <img src={item.iconUrl} alt={item.title} width={16} />
          </a>
        ))}
      </div>

      <hr className="w-full border-gray-500 my-8" />
      <p className="text-center text-sm">© {new Date().getFullYear()} Rossum. All rights reserved.</p>
    </Section>
  );
};

export default Footer;