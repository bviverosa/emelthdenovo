import Image from "next/image";
import Facebook from "./iconos/facebook";
import Cheems from "./img/cheems.jpg";

export default function Carrusel() {
  const logos = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Facebook",
      style: "none",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Disney",
      style: "none",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Airbnb",
      style: "none",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Apple",
      style: "none",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Spark",
      style: "none",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Samsung",
      style: "none",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Quora",
      style: "none",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoxAWeRN1dPT9ZHJQXq-7GuHOzO0-NDkcMweWee8_uw&s",
      alt: "Sass",
      style: "none",
    },
  ];

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll ">
        {logos.map((logo, index) => (
          <li key={index}>
            <img src={logo.src} alt={logo.alt} />
          </li>
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {logos.map((logo, index) => (
          <li key={index}>
            <img src={logo.src} alt={logo.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}
