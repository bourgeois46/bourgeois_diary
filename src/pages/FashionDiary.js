import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import FashionViewer from "../components/FashionViewer";
import useFashion from "../hooks/useFashion";
import { getStringedDate } from "../util/get-stringed-date";

const FashionDiary = () => {
  const params = useParams();
  const nav = useNavigate();
  const curFashionItem = useFashion(params.id);

  if (!curFashionItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const { createdDate, content, photo } = curFashionItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button
            onClick={() => nav(`/fashion_edit/${params.id}`)}
            text={"수정하기"}
          />
        }
      />
      <FashionViewer content={content} photo={photo} />
    </div>
  );
};

export default FashionDiary;
