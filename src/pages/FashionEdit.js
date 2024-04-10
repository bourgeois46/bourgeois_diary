import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import FashionEditor from "../components/FashionEditor";
import useFashion from "../hooks/useFashion";
import { useContext } from "react";
import { FashionDispatchContext } from "../App";

const FashionEdit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDeleteFashion, onUpdateFashion } = useContext(
    FashionDispatchContext
  );
  const curFashionItem = useFashion(params.id);

  const onClickDelete = () => {
    if (window.confirm("패션 일기를 정말 삭제할까요? 다시 복구되지 않아요!"));
    onDeleteFashion(params.id);
    nav("/fashion", { replace: true });
  };

  const onSubmit = (input) => {
    if (window.confirm("패션 일기를 정말 수정할까요?"));
    onUpdateFashion(
      params.id,
      input.createdDate.getTime(),
      input.content,
      input.photo
    );
    nav("/fashion", { replace: true });
  };

  return (
    <div>
      <Header
        title={"패션 일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />

      <FashionEditor initData={curFashionItem} onSubmit={onSubmit} />
    </div>
  );
};

export default FashionEdit;
