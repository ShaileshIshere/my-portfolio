import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

const ProjectCarousel = ({ images, title }: ProjectCarouselProps) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        className: "project-carousel-slide",
        // beforeChange: (current: number, next: number) => {
        //     // Add transition class to the slides
        //     const slides = document.querySelectorAll('.slick-slide');
        //     slides.forEach(slide => {
        //         slide.classList.add('transitioning');
        //     });
        // },
        // afterChange: (current: number) => {
        //     // Remove transition class after animation
        //     const slides = document.querySelectorAll('.slick-slide');
        //     slides.forEach(slide => {
        //         slide.classList.remove('transitioning');
        //     });
        // }
    };
      
    return (
        <div className="carousel-outer w-full max-w-5xl mx-auto">
            <div className="carousel-container relative">
                <Slider {...settings}>
                  {images.map((image, index) => (
                      <div key={index} className="slide-wrapper">
                          <div className="w-full relative rounded-lg overflow-hidden" style={{ paddingBottom: '55.25%' }}>
                              <Image
                                  src={`/project-galary/${image}`}
                                  fill
                                  alt={`${title} - Image ${index + 1}`}
                                  className="absolute top-0 left-0 w-full h-full object-cover"
                                  priority
                              />
                          </div>
                      </div>
                  ))}
                </Slider>
            </div>
        </div>
    );
};

// Add custom type for arrow props
interface ArrowProps {
  onClick?: () => void;
}

const PrevArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-[-80px] top-1/2 -translate-y-1/2 z-20 p-4 text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
      aria-label="Previous slide"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

const NextArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-[-80px] top-1/2 -translate-y-1/2 z-20 p-4 text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
      aria-label="Next slide"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ProjectCarousel;