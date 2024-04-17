import React, { useState, useEffect } from "react";
import "./FashionEditor.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/get-stringed-date";
import upload_img from "../assets/upload_img.png";

const FashionEditor = ({ initData, onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    photo: "",
    content: "",
  }); // 입력값 저장

  const [uploadedImage, setUploadedImage] = useState(null);

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    setInput({
      ...input,
      photo: imageUrl,
    });
  };

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)), // 객체 형태로 저장
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);

    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value); // 객체로 변환
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input); // new 컴포넌트
  };

  return (
    <div className="FashionEditor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>

      <section className="img_section">
        <h4>코디 사진</h4>
        <div className="img_section">
          {input.photo ? (
            <img src={input.photo} alt="input.photo" />
          ) : (
            <img src={upload_img} alt="upload_img" />
          )}
          <label htmlFor="file">
            <div className="btn-upload">파일 업로드하기</div>
          </label>
          <input type="file" name="file" id="file" onChange={onChangeImage} />
        </div>
      </section>

      <section className="content_section">
        <h4>코디 설명</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘의 패션은..."
        />
      </section>

      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onClickSubmitButton}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default FashionEditor;
