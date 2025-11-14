"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white font-urbanist relative overflow-hidden">

      {/* ---------- TOP HERO TEXT ---------- */}
      <div className="relative text-center py-20 px-6 bg-gradient-to-b from-black/40 to-transparent">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let Your Passion Shine Through
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Step into a world where stories echo, every frame, and every flash lights the path to your creative future.
        </p>
        <button className="bg-[#E68A2E] text-white font-medium py-3 px-8 rounded-full hover:bg-[#ff9b3f] transition">
          Capture Your Path →
        </button>
      </div>

      {/* Background Image */}
      <div className="absolute bottom-0 left-0 w-full h-full opacity-90 pointer-events-none">
        <Image
          src="/footer-image.png"
          alt="Footer Background"
          fill
          className="object-cover"
        />
      </div>

      {/* ---------- MAIN FOOTER GRID ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 py-16 px-6 md:px-12">

        {/* ------- Logo + Address + Social Icons ------- */}
        <div>
          <Image src="/logo.png" alt="Light & Life Academy" width={180} height={60} className="mb-6" />

          <p className="text-gray-400 text-sm leading-relaxed flex gap-3">
            <Image src="/location.png" alt="Location" width={18} height={18} />
            Light & Life Academy,<br /> Ooty, Tamil Nadu, India
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <Link href="#"><Image src="/facebook.png" alt="Facebook" width={22} height={22} /></Link>
            <Link href="#"><Image src="/twitter.png" alt="Twitter" width={22} height={22} /></Link>
            <Link href="#"><Image src="/instagram-icon.png" alt="Instagram" width={22} height={22} /></Link>
            <Link href="#"><Image src="/Linked-in.png" alt="LinkedIn" width={22} height={22} /></Link>
          </div>
        </div>

        {/* ------- Quick Links ------- */}
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

        {/* ------- Courses ------- */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#E68A2E]">Courses</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="#">PG Diploma in Professional Photography</Link></li>
            <li><Link href="#">Weekend Workshop</Link></li>
            <li><Link href="#">PG Diploma in Commercial & Corporate Photography</Link></li>
          </ul>
        </div>

        {/* ------- Resources ------- */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#E68A2E]">Resources</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">FAQ</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#222] w-full"></div>

      {/* ---------- PARTNER LOGO STRIP ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12 py-10 px-6">
        <Image src="/lla-outreach.png" alt="LLA Outreach" width={160} height={40} />
        <Image src="/iqbal-logo.png" alt="Iqbals" width={130} height={40} />
        <Image src="/lla-online.png" alt="LLA Online" width={160} height={40} />
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#222] w-full"></div>

      {/* ---------- COPYRIGHT ---------- */}
      <p className="relative z-10 text-white text-[10px] text-center py-4">
        © 2025 Light & Life Academy, Premier College for Professional Photography in India. All rights reserved.
      </p>

    </footer>
  );
};

export default Footer;
