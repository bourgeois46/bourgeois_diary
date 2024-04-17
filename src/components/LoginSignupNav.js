import React from "react";
import styles from "./LoginSignupNav.module.css";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import diary from "../assets/diary.png";

const LoginSignupNav = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <div className={styles.list_nav}>
        {!user && (
          <>
            <div>
              <Link to="/login">로그인</Link>
            </div>
            <div>
              <Link to="/signup">회원가입</Link>
            </div>
          </>
        )}

        {user && (
          <div>
            <strong>{user.displayName}님의 일기장</strong>
            <img src={diary} className={styles.diary} alt="diary" />
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LoginSignupNav;
