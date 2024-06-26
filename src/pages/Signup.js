import React, { useState } from "react";
import styles from "./Signup.module.css";
import useSignup from "../hooks/useSignup";
import Header from "../components/Header";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignup();

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    } else if (event.target.type === "text") {
      setDisplayName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 이벤트 x(페이지 리로딩)
    signup(email, password, displayName);
  };

  return (
    <>
      <Header title="일기장 시작 !" />

      <form className={styles.signup_form} onSubmit={handleSubmit}>
        <fieldset
          style={{
            border: `1px solid rgb(226, 226, 226)`,
            borderRadius: "10px",
          }}
        >
          <legend>회원가입</legend>
          <label htmlFor="myEmail">email :</label>
          <input
            type="email"
            id="myEmail"
            required
            value={email}
            onChange={handleData}
          />

          <label htmlFor="myPassWord">password :</label>
          <input
            type="password"
            id="myPassWord"
            required
            value={password}
            onChange={handleData}
          />

          <label htmlFor="myNickName">nickname :</label>
          <input
            type="text"
            id="myNickName"
            required
            value={displayName}
            onChange={handleData}
          />

          <button type="submit" className={styles.btn}>
            회원가입
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Signup;
