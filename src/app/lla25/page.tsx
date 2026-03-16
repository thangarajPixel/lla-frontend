
import React from "react";
import { Logo, LogoBlack } from "@/helpers/ImageHelper";
import Image from "next/image";

export const metadata = {
  title: 'Light & Life Academy’s 25th Anniversary Celebration',
  description: 'Watch the live streaming of Light & Life Academy’s 25th Anniversary Celebration on 21st March 2026 from 11:00 AM to 1:00 PM.',
  
};



export default function Page() {
  return (
    <div className="html_page">
        <div className="container">
        <Image src={LogoBlack} alt="logo"/>
      <p>
        Watch the live streaming of Light & Life Academy’s 25th Anniversary
        Celebration on 21st March 2026 from 11:00 AM to 1:00 PM.
      </p>

      <iframe
        id="iframe"
        src="https://avslive-backend-hpf7w.ondigitalocean.app/frontend/player/avslive?channelName=star2"
        height="360"
        width="640"
        allowFullScreen
      ></iframe>
      </div>
    </div>
  );
}