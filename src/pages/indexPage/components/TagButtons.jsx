import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TagButtons = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // 載入標籤資料
    axios.get('http://localhost:8080/herotag')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error('無法獲取標籤資料:', error);
      });
  }, []);

  const handleTagClick = (tagId) => {
    console.log(tagId);
    localStorage.setItem('tag_id', tagId);
    window.location.href = `/schMore`;
  };

  return (
    <div id="tag-container">
      {tags.map((tag) => (
        <button
          key={tag.tag_id}
          type="button"
          className="IndexBtn btn btn-outline btn-sm mx-2 mb-2"
          onClick={() => handleTagClick(tag.tag_id)}
        >
          {tag.tag_name}
        </button>
      ))}
    </div>
  );
};

export default TagButtons;
