import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import styled from "styled-components";
import { FashionStateContext } from "../App";
import FashionList from "../components/FashionList";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Fashion = () => {
  const nav = useNavigate();
  const fashiondata = useContext(FashionStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, fashiondata);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${
          pivotDate.getMonth() + 1
        }월의 옷차림`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      {/* <Button onClick={() => nav(-1)} text={"< 뒤로가기"} /> */}
      <FashionList fashiondata={monthlyData} />
      <StyledButton onClick={() => nav("/roullet")}>오늘 뭐입지?</StyledButton>
    </div>
  );
};

const StyledButton = styled.button`
  margin-left: 480px;
  position: absolute;
  top: 100px;
  width: 120px;
  height: 40px;
  background: #eae2fd;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 19px;
  cursor: pointer;
`;

export default Fashion;
