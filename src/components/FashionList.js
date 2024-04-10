import React, { useState } from "react";
import "./FashionList.css";
import FashionItem from "./FashionItem";
import { useNavigate } from "react-router-dom";
import new_button from "../assets/new_button.png";

const FashionList = ({ fashiondata }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    if (!fashiondata) return []; // 오류 방지
    return fashiondata.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div>
      <div className="FashionList">
        <div className="menu_bar">
          <select onChange={onChangeSortType}>
            <option value={"latest"}>최신순</option>
            <option value={"oldest"}>오래된 순</option>
          </select>
          <img
            onClick={() => nav("/new_fashion")}
            src={new_button}
            alt="new_button"
            className="new_button"
          />
        </div>
        <div className="list_wrapper">
          {sortedData.map((item) => (
            <FashionItem
              key={item.id}
              id={item.id}
              createdDate={item.createdDate}
              content={item.content}
              photo={item.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionList;
