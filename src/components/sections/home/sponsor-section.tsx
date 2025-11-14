
import Image from "next/image";

export default function SponsorSection() {
  const sponsors = [
    { src: "/sponsors/lmw.png", alt: "LMW" },
    { src: "/sponsors/photoquip.png", alt: "Photoquip" },
    { src: "/sponsors/gretag.png", alt: "Gretag Imaging" },
    { src: "/sponsors/kodak.png", alt: "Kodak" },
    { src: "/sponsors/epson.png", alt: "Epson" },
    { src: "/sponsors/calumet.png", alt: "Calumet" },
  ];

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-12 font-urbanist text-center">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="inline-block relative mb-4">
          <span className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E68A2E] opacity-30 -z-10"></span>
          <span className="relative bg-white px-4 text-[#E68A2E] font-semibold text-sm tracking-wide">
            Our Sponsors
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Powered by Those Who Believe in{" "}
          <span className="text-[#E68A2E]">Bright Futures</span>
        </h2>

        <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Our sponsors share our vision to nurture talent and light up the future of photography. 
          Their support fuels creativity, opportunity, and growth at every step.
        </p>
      </div>

      {/* Logos */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-center">
        {sponsors.map((logo, i) => (
          <div
            key={i}
            className="relative w-full h-[60px] md:h-[70px] flex items-center justify-center grayscale hover:grayscale-0 transition duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
