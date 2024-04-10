import React from "react";
import "./FashionItem.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const FashionItem = ({ id, createdDate, content, photo }) => {
  const nav = useNavigate();

  return (
    <div className="FashionItem">
      <div onClick={() => nav(`/fashion_diary/${id}`)} className="img_section">
        <img src={photo} alt={photo} />
      </div>
      <div onClick={() => nav(`/fashion_diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/fashion_edit/${id}`)} text={"수정하기"} />
      </div>
    </div>
  );
};

export default FashionItem;
