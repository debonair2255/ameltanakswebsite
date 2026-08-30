import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import img1 from "../assets/microscopy.jpg.jpg";
import img2 from "../assets/microscopy2.jpg.jpg";
import img3 from "../assets/phlebotomy1.jpg";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-black">

      {/* =========================
          IMAGE SLIDER
      ========================= */}
      <div className="absolute inset-0">
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${index * (100 / images.length)}%)`,
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                width: `${100 / images.length}%`,
                flex: `0 0 ${100 / images.length}%`,
              }}
            >
              <img
                src={src}
                alt={
                  i === 0
                    ? "Medical laboratory microscopy"
                    : i === 1
                    ? "Medical laboratory workspace"
                    : "Professional phlebotomy procedure"
                }
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          DARK OVERLAY
      ========================= */}
      <div className="absolute inset-0 bg-black/55" />

      {/* =========================
          HERO CONTENT
      ========================= */}
      <div className="relative z-10 flex min-h-[calc(100svh-76px)] items-center">

        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">

          <div className="max-w-4xl">

            {/* =========================
                MAIN HEADING
            ========================= */}
            <h1
              className="
                text-[clamp(2rem,9vw,4.5rem)]
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-white
              "
            >
              Welcome to AMELTAN
            </h1>

            {/* =========================
                DESCRIPTION
            ========================= */}
            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-6
                text-white/90
                sm:mt-6
                sm:text-lg
                sm:leading-8
                lg:text-xl
              "
            >
              AMELTAN represents Medical Laboratory Technicians and
              Assistants of Nigeria, promoting excellence, professionalism,
              and ethical practice.
            </p>

            {/* =========================
                BUTTONS
                GUESTS ONLY
            ========================= */}
            {!isAuthenticated && (
              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3
                  sm:mt-8
                  sm:flex-row
                "
              >

                {/* JOIN AMELTAN */}
                <Link
                  to="/register"
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-ameltan
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-ameltan-dark
                    hover:shadow-xl
                    sm:w-auto
                    sm:px-7
                    sm:text-base
                  "
                >
                  Join AMELTAN

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                {/* EXPLORE COMMUNITY */}
                <Link
                  to="/community"
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/70
                    bg-white/10
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white
                    hover:text-ameltan
                    sm:w-auto
                    sm:px-7
                    sm:text-base
                  "
                >
                  Explore Our Community
                </Link>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* =========================
          SLIDER INDICATORS
      ========================= */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-20
          flex
          -translate-x-1/2
          items-center
          gap-2
          sm:bottom-8
          sm:gap-3
        "
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              h-2
              rounded-full
              transition-all
              duration-300
              ${
                index === i
                  ? "w-8 bg-white sm:w-10"
                  : "w-2 bg-white/50 hover:bg-white"
              }
            `}
          />
        ))}
      </div>

      {/* =========================
          SLIDE COUNTER
      ========================= */}
      <div
        className="
          absolute
          bottom-6
          right-5
          z-20
          hidden
          items-center
          gap-2
          text-xs
          font-semibold
          text-white/80
          sm:flex
          lg:right-10
          sm:text-sm
        "
      >
        <span className="text-white">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span>/</span>

        <span>
          {String(images.length).padStart(2, "0")}
        </span>
      </div>

    </section>
  );
};

export default Hero;
