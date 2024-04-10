import React, { useState, useEffect } from "react";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import WeatherItem from "./WeatherItem";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { weatherList } from "../util/constants_weather";
import { getStringedDate } from "../util/get-stringed-date";
import upload_img from "../assets/upload_img.png";

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    weatherId: 3,
    content: "",
    photo: "",
  }); // 입력값 저장

  const [uploadedImage, setUploadedImage] = useState(null);

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
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
    // console.log(e.target.name); // 어떤 요소에 입력이 들어온건지
    // console.log(e.target.value); // 입력된 값이 무엇인지?

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
    <div className="Editor">
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
        <h4>오늘의 사진</h4>
        <div className="img_section">
          {uploadedImage ? (
            <img src={uploadedImage} alt="" />
          ) : (
            <img src={upload_img} alt="" />
          )}
          <label htmlFor="file">
            <div className="btn-upload">파일 업로드하기</div>
          </label>
          <input type="file" name="file" id="file" onChange={onChangeImage} />
        </div>
      </section>

      <section className="emotion_section">
        <h4>오늘의 기분</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>

      <section className="weather_section">
        <h4>오늘의 날씨</h4>
        <div className="weather_list_wrapper">
          {weatherList.map((item) => (
            <WeatherItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "weatherId",
                    value: item.weatherId,
                  },
                })
              }
              key={item.weatherId}
              {...item}
              isSelected={item.weatherId === input.weatherId}
            />
          ))}
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은..."
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

export default Editor;
