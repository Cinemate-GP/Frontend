import Geners from "@/components/home/Geners";
import HomeSlider from "@/components/home/HomeSlider";
import Recommended from "@/components/home/Recommended";
import Top10 from "@/components/home/Top10";
import TopRated from "@/components/home/TopRated";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";

export default function Home() {
  return (    <div className="overflow-hidden mb-[70px]">
      <section id="home" className="sm:mb-64 lg:mb-64">
        <HomeSlider />
      </section>      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <section className=" sm:mt-24 mb-[4rem] md:mb-0">
          <Top10 />
        </section>
        <section className=" sm:mt-24 mb-[4rem] md:mb-0">
          <TopRated />
        </section>
        <section className=" sm:mt-24 mb-[4rem] md:mb-0">
          <Recommended />
        </section>
        <section className=" sm:mt-24 mb-[4rem] md:mb-0">
          <Geners />
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
