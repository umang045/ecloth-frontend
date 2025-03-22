import React from "react";
import { SiNike, SiZara, SiAdidas } from "react-icons/si";
import { cn } from "@/lib/utils";
import { Marquee } from "../magicui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const brandLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Balenciaga_Logo.svg/640px-Balenciaga_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/640px-1960s_Gucci_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Louis_Vuitton_SVG_Monogram_Logo.svg/640px-Louis_Vuitton_SVG_Monogram_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Versace_old_logo.svg/640px-Versace_old_logo.svg.png",
];

const ReviewCard = ({ name, username, body, img }) => (
  <div className="flex items-center space-x-4 p-4 shadow-lg">
    <img
      src={img}
      alt={`${name}'s avatar`}
      className="h-8 w-8 rounded-full"
    />
    <div>
      <div className="font-bold">{name}</div>
      <div className="text-sm text-gray-500">{username}</div>
      <p className="mt-2">{body}</p>
    </div>
  </div>
);

const Marque = () => {
  return (
    // <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
    //   <Marquee pauseOnHover className={cn("[--duration:40s]", "flex items-center")}>
    //     {reviews.map((review, index) => (
    //       <ReviewCard key={index} {...review} />
    //     ))}
    //   </Marquee>
    //   <Marquee reverse pauseOnHover className={cn("[--duration:40s]", "flex items-center")}>
    //     {reviews.map((review, index) => (
    //       <ReviewCard key={index} {...review} />
    //     ))}
    //   </Marquee>
    //   <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
    //   <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    // </div>
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {/* <Marquee
        pauseOnHover
        className={cn("[--duration:40s]", "flex items-center space-x-10")}
      >
        {brandLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Brand ${index + 1}`}
            className="h-16 w-auto"
          />
        ))}
      </Marquee> */}
      <Marquee
        reverse
        pauseOnHover
        className={cn("[--duration:20s]", "flex items-center space-x-20")}
      >
        {brandLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Brand ${index + 1}`}
            className="h-16 w-auto"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Marque;
