"use client";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
   <footer className="w-full bg-black text-white font-urbanist relative overflow-hidden lg:px-20 font-urbanist mx-auto">
         <div className="relative bg-gradient-to-b from-[#E68A2E]/60 to-transparent text-center py-15 px-6">
           <h2 className="text-3xl md:text-3xl font-bold mb-4">
             Your Journey Begins with a Spark
           </h2>
           <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
             Step into a world where creativity ignites. Every frame is a journey through thought,
             heart, and vision for the future.
           </p>
           <button className="bg-[#E68A2E] text-black font-medium py-3 px-8 rounded-full hover:bg-[#ff9b3f] transition">
             Ignite Your Vision
           </button>
         </div>
         <div className="h-[1px] bg-white w-full"></div>
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 py-12 px-6 md:px-12">
           <div>
             <Image
               src="/logo.png"
               alt="Light & Life Academy"
               width={180}
               height={60}
               className="mb-6"
             />
             <p className="text-gray-400 text-sm leading-relaxed flex">
                <Image
               src="/location.png"
               alt="Light & Life Academy"
               width={20}
               height={20}
               className="mb-6"
             />
               Light & Life Academy,<br /> Ooty, Tamil Nadu, India
             </p>
             <div className="flex space-x-4 mt-6">
               <Link href="#">
                 <Image src="/facebook.png" alt="Facebook" width={22} height={22} />
               </Link>
                <Link href="#">
                 <Image src="/twitter.png" alt="Twitter" width={22} height={22} />
               </Link>
               <Link href="#">
                 <Image src="/instagram-icon.png" alt="Instagram" width={22} height={22} />
               </Link>
               <Link href="#">
                 <Image src="/Linked-in.png" alt="Linked-in" width={22} height={22} />
               </Link>
             </div>
           </div>
           <div>
             <h4 className="text-lg font-semibold mb-4 text-[#E68A2E]">Quick Links</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
               <li><Link href="#">About LLA</Link></li>
               <li><Link href="#">Academics</Link></li>
               <li><Link href="#">Faculty</Link></li>
               <li><Link href="#">Gallery</Link></li>
               <li><Link href="#">Contact Us</Link></li>
             </ul>
           </div>
           <div>
             <h4 className="text-lg font-semibold mb-4 text-[#E68A2E]">Courses</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
               <li><Link href="#">PG Diploma in Professional Photography</Link></li>
               <li><Link href="#">Weekend Workshop</Link></li>
               <li><Link href="#">PG Diploma in Commercial & Corporate Photography</Link></li>
             </ul>
           </div>
           <div>
             <h4 className="text-lg font-semibold mb-4 text-[#E68A2E]">Resources</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
               <li><Link href="#">Blog</Link></li>
               <li><Link href="#">Privacy Policy</Link></li>
               <li><Link href="#">FAQ</Link></li>
             </ul>
           </div>
         </div>
         <div className="h-[1px] bg-[#222] w-full"></div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-8 px-42 space-y-6 md:space-y-0">
           <div className="flex flex-wrap gap-12 justify-center md:justify-start items-center gap-8">
             <Image src="/lla-outreach.png" alt="LLA Outreach" width={160} height={40} />
             <Image src="/iqbal-logo.png" alt="Global Center" width={120} height={40} />
             <Image src="/lla-online.png" alt="LLA Light" width={160} height={40} />
           </div>
         </div>
         <div className="h-[1px] bg-[#222] w-full mb-4"></div>
          <p className="text-white text-[10px] mt-4 md:mt-0 text-center md:text-center mb-4">
            © 2025 Light & Life Academy,Premier College for Professional Photography in India.All rights reserved.
           </p>
       </footer>
  )
};

export default Footer;