import React from "react";
import Header from "../../components/layout/SearchHeader_trans";
import SwiperCarousel from "./components/SwiperCarousel";
import TagButtons from "./components/TagButtons";

function Index() {
    return (
        <div className="Index container-fluid p-0">
         <Header/>

          <nav className="tag text-center m-0" id="tag-container">
          <TagButtons/>
          </nav>

          {/* <!-- Swiper --> */}
            <SwiperCarousel/>
      </div>
        
    );
  }

export default Index;