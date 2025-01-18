import React from "react";
import Header from "../../components/layout/SearchHeader_trans";
import Footer from "../../components/layout/Footer";
import TopCarousel from "./components/TopCarousel";
import SearchForm from "../../components/ui/SearchForm";
import CardWithLike from "../../components/ui/CardWithLike";
import SiteCards from "../../components/ui/SiteCards";
import YtCarousel from "./components/YtCarousel";
import BlogList from "./components/BlogList";

function SchInfo() {
  return (
    <div className="shcInfo">
      <Header />
      {/* <!-- 這是top slider --> */}
      <div className="container-fluid p-0 HeroBox">
        <div className="TopHero text-light fw-bloder">
          <h1>熱門推薦行程</h1>
        </div>
        <div className="row m-0 swiper mySwiper_1">
          <div className="swiper-wrapper p-0">
            <TopCarousel />
          </div>
          {/* <!-- Pagination --> */}
          <div className="swiper-pagination swiper-pagination_1"></div>
        </div>
      </div>

      {/* <!-- 搜尋bar --> */}
      <SearchForm />

      {/* <!-- schedule title --> */}
      <div className="container d-flex justify-content-between my-5">
        <h4 className="text-dark text-nowrap fs-2 fw-bolder">最新行程</h4>
        <div className="divider"></div>
      </div>

      {/* <!-- 行程card --> */}
      <div className="container-fluid d-md-flex flex-wrap p-0">
        <div id="SchRecommendCards">
          <div id="SchcardBox" className="row m-0">
          <CardWithLike />
          </div>
        </div>

        {/* <!-- 行程more --> */}
        <nav className="container d-flex justify-content-center align-items-center my-5">
          <a href="schMore">
            <button
              className="btn btn-secondary"
              style={{
                borderRadius: "50px",
                color: "#fff",
                borderWidth: "0px",
                height: "37px",
                width: "auto",
              }}
            >
              更多熱門行程
            </button>
          </a>
        </nav>
      </div>

      {/* <!-- 參考景點 --> */}
      <div className="container d-flex justify-content-between my-5">
        <h4 className="text-dark text-nowrap fs-2 fw-bolder">景點參考</h4>
        <div className="divider"></div>
      </div>

      {/* <!-- 景點card --> */}
      <div className="container-fluid d-md-flex flex-wrap p-0">
        <div id="SchRecommendCards2">
          <div id="SchcardBox2" className="row m-0">
          <SiteCards />
          </div>
        </div>
        {/* <!-- 景點more --> */}
        <nav className="container d-flex justify-content-center align-items-center my-5">
          <a href="allSite.html">
            <button
              className="btn btn-secondary"
              style={{
                borderRadius: "50px",
                color: "#fff",
                borderWidth: "0px",
                height: "37px",
                width: "auto",
              }}
            >
              更多熱門景點
            </button>
          </a>
        </nav>

        {/* <!-- Youtube --> */}
        <div className="bg-primary py-5 container-fluid">
          <div className="container d-flex justify-content-between">
            <h4 className="text-light text-nowrap fs-2 fw-bolder">
              Youtube 最新推薦
            </h4>
            <div className="divider2"></div>
          </div>
        </div>

        {/* <!-- youtube video --> */}
        <div className="container-fluid p-0 bg-primary">
          <div className="swiper mySwiper_2 bg-primary">
            <div className="swiper-wrapper">
              <YtCarousel />
            </div>
            {/* <!-- Pagination --> */}
            <div className="swiper-pagination"></div>
            {/* <!-- Navigation buttons --> */}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </div>

      {/* <!--Blog --> */}
      <div className="BlogBox m-0 py-5 container-fluid">
        {/* <!-- blog title --> */}
        <div className="container d-flex justify-content-between">
          <h4 className="text-dark text-nowrap fs-2 fw-bolder">
            部落客最新推薦
          </h4>
          <div className="divider"></div>
        </div>
        {/* <!-- blog 卡片 --> */}
        <div className="container my-5">
          <div className="row justify-content-center" id="blogbox">
            <BlogList />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SchInfo;
