export default function BackgroundVideo() {
  return (
   <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/banner-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
  );
}
