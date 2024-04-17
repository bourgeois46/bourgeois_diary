import React, { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import FashionEditor from "../components/FashionEditor";
import { useNavigate } from "react-router-dom";
import { FashionDispatchContext } from "../App";

const NewFashion = () => {
  const { onCreateFashion } = useContext(FashionDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    console.log(JSON.stringify(input));
    onCreateFashion(input.createdDate.getTime(), input.content, input.photo);
    nav("/fashion", { replace: true });
  };

  return (
    <div>
      <Header
        title={"오늘은 어떤 옷을 입었나요?"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
      />
      <FashionEditor onSubmit={onSubmit} />
    </div>
  );
};

export default NewFashion;
