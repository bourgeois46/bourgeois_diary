import React from "react";
import "./FashionViewer.css";

const FashionViewer = ({ content, photo }) => {
  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>코디 사진</h4>
        <div className="img_wrapper">
          <img src={photo} alt={photo} />
        </div>
      </section>

      <section className="content_section">
        <h4>코디 설명</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default FashionViewer;
