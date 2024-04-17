import React, { useState } from "react";
import styles from "./Login.module.css";
import useLogin from "../hooks/useLogin";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 이벤트 x(페이지 리로딩)
    // console.log(email, password);
    login(email, password);
  };

  return (
    <>
      <Header title="일기장 시작 !" />

      <form
        className={styles.login_form}
        onSubmit={handleSubmit}
        action=""
        method=""
      >
        <fieldset
          style={{
            border: `1px solid rgb(226, 226, 226)`,
            borderRadius: "10px",
          }}
        >
          <legend>로그인</legend>
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

          {!isPending && (
            <button type="submit" className={styles.btn}>
              로그인
            </button>
          )}
          {isPending && <div>로그인 진행중입니다...</div>}
          {error && <strong>{error}</strong>}
        </fieldset>
      </form>
    </>
  );
};

export default Login;
