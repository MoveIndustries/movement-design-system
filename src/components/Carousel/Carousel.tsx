import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps, SwiperSlideProps, SwiperRef } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// Import required modules
import { Pagination, Navigation } from "swiper/modules";

export interface CarouselProps extends Omit<SwiperProps, "children"> {
  /**
   * Array of React nodes to render as carousel slides.
   * Each child will be wrapped in a SwiperSlide component.
   */
  children: React.ReactNode[];
  /**
   * Props to pass to each SwiperSlide component.
   * Useful for customizing individual slide behavior.
   */
  slideProps?: Omit<SwiperSlideProps, "children">;
}

/**
 * A responsive carousel component built on top of Swiper.js.
 *
 * Features:
 * - Touch/swipe support
 * - Responsive breakpoints
 * - Pagination and navigation
 * - Auto-play capabilities
 * - Customizable slide behavior
 *
 * Usage:
 * ```tsx
 * <Carousel
 *   slidesPerView={3}
 *   spaceBetween={32}
 *   pagination={{ clickable: true }}
 *   navigation={true}
 * >
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 *   <div>Slide 3</div>
 * </Carousel>
 * ```
 */
export const Carousel = React.forwardRef<SwiperRef, CarouselProps>(
  ({ children, slideProps, ...swiperProps }, ref) => {
    return (
      <Swiper
        ref={ref}
        // Default props for better UX
        slidesPerView="auto"
        spaceBetween={32}
        centeredSlides={true}
        grabCursor={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        // Allow all custom props to override defaults
        {...swiperProps}
      >
        {children?.map((child, index) => (
          <SwiperSlide key={index} {...slideProps}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
);

Carousel.displayName = "Carousel";

// Export individual components for advanced usage
export { SwiperSlide } from "swiper/react";
export type { SwiperProps, SwiperSlideProps, SwiperRef } from "swiper/react";
