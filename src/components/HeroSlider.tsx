import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { banner } from "@/data/products";
import { getBanners, Banner } from "@/services/banners";


const HeroSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const loadBanners = async () => {

      try {

        const data = await getBanners();

        setBanners(data);

      } catch (error) {

        console.error(
          "Failed to load banners:",
          error
        );

      }

    };


    loadBanners();

  }, []);



  useEffect(() => {

    if (banners.length === 0) return;


    const timer = setInterval(() => {

      setCurrent(
        prev => (prev + 1) % banners.length
      );

    }, 5000);


    return () => clearInterval(timer);


  }, [banners]);



  const prev = () => {

    setCurrent(
      p => (p - 1 + banners.length) % banners.length
    );

  };



  const next = () => {

    setCurrent(
      p => (p + 1) % banners.length
    );

  };



  if (banners.length === 0) {

    return null;

  }

  const banner = banners[current];

  return (
    <section className="relative h-[520px] sm:h-[450px] md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={banner.url}
            alt={banner.title}
            className="w-full h-full object-cover object-center"
            width={1920}
            height={800}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20 md:to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="container px-5 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-xl"
              >

                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="
                  font-heading 
                  text-2xl 
                  sm:text-3xl 
                  md:text-5xl 
                  font-bold 
                  text-primary-foreground 
                  mb-3 
                  leading-tight 
                  drop-shadow-lg
                "
                >
                  {banner.title}
                </motion.h1>


                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="
                  text-primary-foreground/90 
                  text-sm 
                  sm:text-lg 
                  md:text-xl 
                  mb-5 
                  md:mb-6 
                  drop-shadow 
                  max-w-lg
                "
                >
                  {banner.subtitle}
                </motion.p>


                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3"
                >

                  <a href="/products">
                    <button
                      className="
                      w-full sm:w-auto
                      bg-secondary 
                      text-secondary-foreground 
                      px-5 
                      py-2.5 
                      md:px-6 
                      md:py-3 
                      rounded-lg 
                      font-semibold 
                      hover:opacity-90 
                      transition-all 
                      hover:shadow-lg
                    "
                    >
                      Our Products
                    </button>
                  </a>


                  <a href="/contact">
                    <button
                      className="
                      w-full sm:w-auto
                      border-2 
                      border-primary-foreground 
                      text-primary-foreground 
                      px-5 
                      py-2.5 
                      md:px-6 
                      md:py-3 
                      rounded-lg 
                      font-semibold 
                      hover:bg-primary-foreground/10 
                      transition-all
                    "
                    >
                      Contact Us
                    </button>
                  </a>

                </motion.div>

              </motion.div>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>


      {/* Previous Arrow */}
      <button
        onClick={prev}
        className="
        absolute 
        left-2 
        md:left-4 
        top-1/2 
        -translate-y-1/2 
        w-9 
        h-9 
        md:w-12 
        md:h-12 
        bg-card/80 
        backdrop-blur 
        rounded-full 
        flex 
        items-center 
        justify-center 
        hover:bg-card 
        transition-colors 
        z-10 
        shadow-lg
      "
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
      </button>


      {/* Next Arrow */}
      <button
        onClick={next}
        className="
        absolute 
        right-2 
        md:right-4 
        top-1/2 
        -translate-y-1/2 
        w-9 
        h-9 
        md:w-12 
        md:h-12 
        bg-card/80 
        backdrop-blur 
        rounded-full 
        flex 
        items-center 
        justify-center 
        hover:bg-card 
        transition-colors 
        z-10 
        shadow-lg
      "
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
      </button>


      {/* Dots */}
      <div className="
      absolute 
      bottom-4 
      left-1/2 
      -translate-x-1/2 
      flex 
      gap-2 
      z-10
    ">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`
            h-3 
            rounded-full 
            transition-all 
            ${i === current
                ? "bg-secondary w-8"
                : "bg-primary-foreground/50 w-3"
              }
          `}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );

};

export default HeroSlider;
