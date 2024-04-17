import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import roullet_pin from "../assets/roullet_pin.png";
import Header from "./Header";
import Button from "./Button";

const Roullet = () => {
  const nav = useNavigate();
  const canvasRef = useRef(null);
  const menuAddRef = useRef(null);
  const product = ["Casual", "Street", "Vintage", "Normcore", "Layered "];
  const colors = [
    "#37ecba",
    "#fed6e3",
    "#e0c3fc",
    "#D2F3F8",
    "#f68084",
    "#deecdd",
    "#667eea",
    "#fbfcdb",
    "#fbc2eb",
    "#f43b47",
    "#d9ded8",
  ];

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    newMake(ctx);
  }, []);

  const newMake = (ctx) => {
    const [cw, ch] = [
      canvasRef.current.width / 2,
      canvasRef.current.height / 2,
    ];
    const arc = Math.PI / (product.length / 2);

    for (let i = 0; i < product.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
      ctx.fill();
      ctx.closePath();
    }

    ctx.fillStyle = "#fff";
    ctx.font = "15px Monaco";
    ctx.textAlign = "center";

    for (let i = 0; i < product.length; i++) {
      const angle = arc * i + arc / 2;

      ctx.save();

      ctx.translate(
        cw + Math.cos(angle) * (cw - 50),
        ch + Math.sin(angle) * (ch - 50)
      );

      ctx.rotate(angle + Math.PI / 2);

      product[i].split(" ").forEach((text, j) => {
        ctx.fillText(text, 0, 30 * j);
      });

      ctx.restore();
    }
  };

  const rotate = () => {
    const $c = canvasRef.current;
    $c.style.transform = `initial`;
    $c.style.transition = `initial`;
    const alpha = Math.floor(Math.random() * 100);

    setTimeout(() => {
      const ran = Math.floor(Math.random() * product.length);
      const arc = 360 / product.length;
      const rotate = ran * arc + 3600 + arc * 3 - arc / 4 + alpha;
      $c.style.transform = `rotate(-${rotate}deg)`;
      $c.style.transition = `2s`;
    }, 1);
  };

  const add = () => {
    const menuValue = menuAddRef.current.value;
    if (menuValue && menuValue.trim() !== "") {
      product.push(menuValue);
      const ctx = canvasRef.current.getContext("2d");
      newMake(ctx);
      menuAddRef.current.value = "";
    } else {
      alert("패션 스타일을 입력한 후 버튼을 클릭 해 주세요");
    }
  };

  return (
    <div>
      <Header
        title={"오늘의 패션 스타일"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
      />
      <StyledCanvas>
        <StyledCanvasArea>
          <canvas ref={canvasRef} width="380" height="380"></canvas>
        </StyledCanvasArea>
        <StyledImage src={roullet_pin} />
        <StyledWrapper>
          <StyledInput type="text" ref={menuAddRef} id="menuAdd" />
          <StyledButton onClick={add}>메뉴 추가</StyledButton>
          <StyledButton onClick={rotate}>룰렛 돌리기</StyledButton>
        </StyledWrapper>
      </StyledCanvas>
    </div>
  );
};

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  position: fixed;
  top: 170px;
`;

const StyledCanvas = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledWrapper = styled.div`
  margin-top: 40px;
  flex-direction: row;
`;

const StyledCanvasArea = styled.div`
  margin-top: 20px;
`;

const StyledInput = styled.input`
  margin-right: 5px;
  border-radius: 10px;
  border-color: #e2e2e2;
  width: 150px;
  height: 25px;
`;

const StyledButton = styled.button`
  margin-right: 8px;
  width: 75px;
  height: 30px;
  background: #e6f1fe;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 17px;
`;

export default Roullet;
