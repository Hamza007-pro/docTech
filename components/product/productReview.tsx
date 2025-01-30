"use client";

const ProductReview = () => {
  return (
    <div className="py-8">
      <div className="space-y-4">
        {/* First div - can be image or video */}
        <div className="w-full h-[400px] relative">
          <video 
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          >
            <source src="/videos/heroVideo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Second div - background image */}
        <div 
          className="w-full h-[400px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/landing_banner1.jpg")'
          }}
        />

        {/* Third div - background image */}
        <div 
          className="w-full h-[400px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/landing_banner2.jpg")'
          }}
        />
      </div>
    </div>
  );
};

export default ProductReview;
