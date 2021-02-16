import React from "react";

const Pics = ({ pics, loading }) => {
  if (loading) {
    return (
      <div className="text-center">
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <div>
      {pics.map((pic, i) => (
        <a
          key={pic.id}
          target="_blank"
          href={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_q.jpg`}
          download
        >
          <img
            key={pic.id}
            src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_q.jpg`}
            alt="IMG"
            className="img-gallery"
          />{" "}
        </a>
      ))}
    </div>
  );
};

export default Pics;
