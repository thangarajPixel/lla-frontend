"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "For me, Light and Life is home. I always have a great time talking with Iqbal Sir, listening to his array of stories and enjoying his brilliant sense of humour.. I believe every student who goes out of LLA becomes an artist. Thank you LLA for bringing artists to this world",
      name: "Nachiket Pimpriwar",
      role: "Alumnus, Batch ’21",
    },
    {
      text: "LLA helped me discover my creative side. The mentorship and environment are truly inspiring. I’ve built lifelong connections and confidence here.",
      name: "Priya Sharma",
      role: "Student, Batch ’23",
    },
    {
      text: "For me, Light and Life is home. I always have a great time talking with Iqbal Sir, listening to his array of stories and enjoying his brilliant sense of humour.. I believe every student who goes out of LLA becomes an artist. Thank you LLA for bringing artists to this world discipline.",
      name: "Ravi Kumar",
      role: "Alumnus, Batch ’20",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextTestimonial = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const { text, name, role } = testimonials[current];

  return (
    <section className="relative bg-[#ECECEC] py-20 lg:px-56  px-6 overflow-hidden">
      <div className="flex lg:flex-row items-center justify-between gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[420px] text-center lg:text-start py-0"
        >
          <h2 className="text-4xl md:text-5xl font-regular font-urbanist mb-4 leading-tight">
            Testimonials
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Lorem ipsum dolor{" "}
            <span className="text-[#E97451] font-semibold">sit amet,</span>{" "}
            consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Etiam sed mi elementum sapien tincidunt consequat.
          </p>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md p-8 max-w-[600px] lg:w-[500px] lg:h-[350px] max-h-[400px] relative border text-center border-[#E97451] "
        >
          <Quote className="text-[#E97451] w-10 h-10 mb-4 justify-center " />
          <p className="text-black text-lg leading-relaxed mb-6">{text}</p>
          <p className="font-semibold text-[#E97451]">{name}</p>
          <p className="text-black text-sm">{role}</p>
         
        </motion.div>
      </div>
       <div className="flex justify-end gap-1 mt-6 py-3 px-10 lg:px-27 max-w-4xl mx-auto">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full hover:bg-[#E97451]/10 transition"
            >
               <Image
                    src="/arrow-right-black.png"
                    alt="right"
                    width={18}
                    height={18}
                    className="w-9 h-9 text-[#E97451] cursor-pointer"
                  />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-1 rounded-full  hover:bg-[#E97451]/10 transition"
            >
               <Image
                    src="/arrow-narrow-right.png"
                    alt="right"
                   
                    width={18}
                    height={18}
                    className="w-9 h-9 text-[#E97451] cursor-pointer"
                  />
            </button>
        </div>
    </section>
  );
}
