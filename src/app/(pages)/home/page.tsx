import Geners from "@/components/home/Geners";
import HomeSlider from "@/components/home/HomeSlider";
import Recommended from "@/components/home/Recommended";
import Top10 from "@/components/home/Top10";
import TopRated from "@/components/home/TopRated";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";

export default function Home() {
  return (
    <div className="overflow-hidden mb-[70px]">
      <section id="home">
        <HomeSlider />
      </section>
      <section>
        <Top10 />
      </section>
      <section className="section">
        <TopRated />
      </section>
      <section className="section">
        <Recommended />
      </section>
      <section className="section">
        <Geners />
      </section>
      <ToastContainer />
    </div>
  );
}
