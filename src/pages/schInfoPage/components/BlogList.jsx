import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // 從 API 獲取部落格資料
    axios
      .get("http://localhost:8080/schInfo/YtAndBlog")
      .then((response) => {
        setBlogs(response.data); // 更新狀態
      })
      .catch((error) => {
        console.error("無法取得部落格資料:", error);
      });
  }, []);

  return (
    <>
      {blogs.map((blog, index) => (
        <a
          key={index}
          href={blog.blog_url}
          target="_blank"
          rel="noopener noreferrer"
          className="my-3 Blog card p-0 text-decoration-none"
        >
          <div className="custom-card row">
            {/* 左邊的圖片 */}
            <div className="col-lg-4 col-md-4 col-sm-12 m-0">
              <img src={blog.blog_Img} alt="Blog Thumbnail" className="custom-img" />
            </div>

            {/* 右邊的文字內容 */}
            <div className="col-lg-8 col-md-8 col-sm-12 card-body">
              <h4 className="card-title fw-bolder text-truncate p-2">
                {blog.blog_title}
              </h4>
              <div className="d-flex justify-content-end align-items-center mt-2 card-text p-2">
                <h6 className="m-0">{blog.blog_author}</h6>
                <p className="date my-0 ms-3">{blog.blog_year_month}</p>
              </div>
              <hr />
              <p className="card-text p-2">{blog.blog_paragh}</p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default BlogList;
