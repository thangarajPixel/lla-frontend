"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LifeSection() {
  const cards = [
    {
      title: "The 25th Year Begins",
      desc: "A special anniversary celebration at LLA.",
      image: "/Rectangle 10.png",
    },
    {
      title: "Conceptual Product Photography",
      desc: "A higher level approach to product design.",
      image: "/Rectangle 14.png",
    },
    {
      title: "Architecture Photography",
      desc: "Specialization by Mohan Tulas.",
      image: "/Rectangle 10.png",
    },
    {
      title: "Architecture Photography",
      desc: "A workshop by Varun Dubey.",
      image: "/Rectangle 10.png",
    },
    {
      title: "Architecture Photography",
      desc: "A recent creative experiment at LLA.",
      image: "/Rectangle 10.png",
    },
  ];

  return (
    <>
    <div>
      <div className="w-full h-[150px] bg-[#ECECEC] ">
       <div className="relative z-10 container mx-auto px-6 lg:px-24 py-24 flex flex-col lg:flex-row items-start justify-between  ">
        {/* ---------- LEFT SECTION ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[340px] -mt-5 lg:mb-0 "
        >
          <h2 className="text-[25px] md:text-[58px]  font-urbanist">
            Life at LLA
          </h2>
          <p className="text-black text-[35px] leading-[40px] mb-2">
            Lorem ipsum dolor sit amet, consectetur{" "}
            <span className="text-[#E97451] font-semibold">adipiscing elit</span>.
          </p>
          <button className="bg-[#E97451] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff984f] transition">
            View More →
          </button>
        </motion.div>
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1   w-full"
        >
          {/* ---- Column 1 (1 card) ---- */}
          <div className="flex flex-col justify-center items-center mt-70 pr-26 opacity-90">
              {cards.slice(0, 1).map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-[#FFFFFF4D] backdrop-blur-md max-h-[250px] lg:w-[230px] max-w-[280px] px-4 py-2 shadow-md overflow-hidden 
                            hover:bg-white hover:backdrop-blur-lg hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-[20px] font-urbanist mb-2 text-black">
                    {card.title}
                  </h3>
                  <div className="relative w-full h-[158px] p-4">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover mb-2"
                    />
                  </div>
                  <p className="text-sm text-gray-600 leading-snug p-2 mb-2">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>


      
<div className="flex flex-col gap-6 opacity-90">
  {cards.slice(1, 3).map((card, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="-ml-10 bg-[#FFFFFF4D] backdrop-blur-md max-h-[250px] lg:w-[230px] max-w-[280px] px-4 py-2 shadow-md overflow-hidden 
                 hover:bg-white hover:backdrop-blur-lg hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-[17px] font-urbanist mb-2 text-black">
        {card.title}
      </h3>
      <div className="relative w-full h-[158px] p-4">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm text-gray-600 leading-snug p-2 mb-2">
        {card.desc}
      </p>
    </motion.div>
  ))}
</div>

{/* ---- Column 3 (2 cards) ---- */}
<div className="flex flex-col gap-6 mt-23 opacity-90">
  {cards.slice(3, 5).map((card, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-[#FFFFFF4D] -ml-10 backdrop-blur-md max-h-[250px] lg:w-[230px] max-w-[280px] px-4 py-2 shadow-md overflow-hidden hover:bg-white hover:backdrop-blur-lg hover:shadow-lg transition-all duration-900">
      <h3 className="text-[17px] font-urbanist mb-2 text-black">
        {card.title}
      </h3>
      <div className="relative w-full h-[158px] p-4">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm text-gray-600 leading-snug p-2 mb-2">
        {card.desc}
      </p>
    </motion.div>
  ))}
</div>

        </motion.div>
        </div>
      </div>
    <section className="relative bg-[#ECECEC] overflow-hidden w-full h-full  py-24 flex  items-center justify-center "
      style={{
        width: "100%",
        height: "900px",
        margin: "0 auto",
      }}
    >
      {/* ---- Background Image ---- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Mask group(1).png"
          alt="Life at LLA background"
          fill
          className="w-full h-[1130px] object-cover object-center overflow-hidden "
          priority
        />
      </div>
    </section>
    </div>
    </>
  );
}
