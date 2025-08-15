import React from "react";
import Section from "./Section";
import Heading from "./Heading";
import { events } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Events";
import ClipPath from "../assets/svg/ClipPath";
import { FaCalendarAlt } from "react-icons/fa"; // Import the calendar icon from React Icons

const Events = () => {
  return (
    <Section id="events">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Events"
          subtitle="Join us at our upcoming events and webinars."
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {events.map((item) => (
            <div
              key={item.id}
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]
                         transition-all duration-500 ease-in-out hover:shadow-xl hover:bg-gradient-to-r 
                         hover:from-red-300 hover:to-white rounded-lg"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h2 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>

                {/* Date and Date Icon Section */}
                <div className="flex items-center gap-2 mb-4 text-n-3">
                  <FaCalendarAlt className="text-primary text-lg" /> {/* Using React Icons */}
                  <p className="text-sm font-bold">{item.date}</p>
                </div>

                {/* <div className="flex items-center mt-auto">
                  <p className="ml-auto text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <Arrow />
                </div> */}
              </div>

              {item.light && <GradientLight />}

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Events;