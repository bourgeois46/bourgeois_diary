import { useReducer, useRef, createContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import New from "./pages/New";
import Fashion from "./pages/Fashion";
import Weather from "./pages/Weather";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import Nav from "./components/Nav";
import Roullet from "./components/Roullet";
import NewFashion from "./pages/NewFashion";
import FashionEdit from "./pages/FashionEdit";
import fashion_1 from "./assets/fashion_1.jpg";
import fashion_2 from "./assets/fashion_2.jpg";
import fashion_3 from "./assets/fashion_3.jpg";
import fashion_4 from "./assets/fashion_4.jpg";
import photo_1 from "./assets/photo_1.jpg";
import photo_2 from "./assets/photo_2.jpg";
import photo_3 from "./assets/photo_3.jpg";
import photo_4 from "./assets/photo_4.jpg";
import FashionDiary from "./pages/FashionDiary";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginSignupNav from "./components/LoginSignupNav";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

const fashion_mockData = [
  {
    id: 1,
    createdDate: new Date("2024-03-31").getTime(),
    content: "코로나 + 과잠",
    photo: fashion_1,
  },
  {
    id: 2,
    createdDate: new Date("2024-04-2").getTime(),
    content: "여름과 가을 사이 안국 감성룩",
    photo: fashion_2,
  },
  {
    id: 3,
    createdDate: new Date("2024-04-3").getTime(),
    content: "한강 야경룩",
    photo: fashion_3,
  },
  {
    id: 4,
    createdDate: new Date("2024-04-4").getTime(),
    content: "Y2K 수원 감성",
    photo: fashion_4,
  },
];

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-03-31").getTime(),
    emotionId: 1,
    weatherId: 1,
    photo: photo_1,
    content: "스티키몬스터랩 스틸 라이프 전시회에 다녀왔다",
  },
  {
    id: 2,
    createdDate: new Date("2024-04-1").getTime(),
    emotionId: 2,
    weatherId: 2,
    photo: photo_2,
    content: "인생 첫 LP 카페에 다녀왔다 ",
  },
  {
    id: 3,
    createdDate: new Date("2024-04-2").getTime(),
    emotionId: 3,
    weatherId: 3,
    photo: photo_3,
    content: "반포 무지개 분수를 보고왔다 ",
  },
  {
    id: 4,
    createdDate: new Date("2024-04-3").getTime(),
    emotionId: 4,
    weatherId: 4,
    photo: photo_4,
    content: "한강에서 푸딩을 먹었다",
  },
];

function DiaryReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

function FashionReducer(state, action) {
  switch (action.type) {
    case "CREATE_FASHION":
      return [action.data, ...state];
    case "UPDATE_FASHION":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE_FASHION":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
export const FashionStateContext = createContext();
export const FashionDispatchContext = createContext();

function App() {
  // 일기
  const [data, dispatch] = useReducer(DiaryReducer, mockData);
  const idRef = useRef(Math.max(...mockData.map((item) => item.id)) + 1);

  // 패션
  const [fashiondata, fashiondispatch] = useReducer(
    FashionReducer,
    fashion_mockData
  );
  const idRefFashion = useRef(
    Math.max(...fashion_mockData.map((item) => item.id)) + 1
  );

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, weatherId, content, photo) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        weatherId,
        content,
        photo,
      },
    });
  };

  // 새로운 패션일기 추가
  const onCreateFashion = (createdDate, content, photo) => {
    fashiondispatch({
      type: "CREATE_FASHION",
      fashiondata: {
        id: idRefFashion.current++,
        createdDate,
        photo,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, weatherId, content, photo) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        weatherId,
        content,
        photo,
      },
    });
  };

  // 기존 패션 일기 수정
  const onUpdateFashion = (id, createdDate, content, photo) => {
    fashiondispatch({
      type: "UPDATE_FASHION",
      fashiondata: {
        id,
        createdDate,
        photo,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  // 기존 패션 일기 삭제
  const onDeleteFashion = (id) => {
    fashiondispatch({
      type: "DELETE_FASHION",
      id,
    });
  };

  const { isAuthReady, user } = useAuthContext();

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <FashionStateContext.Provider value={fashiondata}>
            <FashionDispatchContext.Provider
              value={{ onCreateFashion, onDeleteFashion, onUpdateFashion }}
            >
              {isAuthReady ? (
                <>
                  <LoginSignupNav />
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route
                        path="/"
                        element={
                          user ? (
                            <Home />
                          ) : (
                            <Navigate replace={true} to="/login" />
                          )
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          !user ? <Login /> : <Navigate replace={true} to="/" />
                        }
                      />
                      <Route
                        path="/signup"
                        element={
                          !user ? (
                            <Signup />
                          ) : (
                            <Navigate replace={true} to="/" />
                          )
                        }
                      />

                      <Route path="/home" element={<Home />} />
                      <Route
                        path="/new_diary"
                        element={<New onCreate={onCreate} />}
                      />
                      <Route path="/diary/:id" element={<Diary />} />
                      <Route path="/edit/:id" element={<Edit />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="*" element={<Notfound />} />

                      <Route path="/fashion" element={<Fashion />} />
                      <Route path="/roullet" element={<Roullet />} />
                      <Route
                        path="/new_fashion"
                        element={<NewFashion onCreate={onCreateFashion} />}
                      />
                      <Route
                        path="/fashion_diary/:id"
                        element={<FashionDiary />}
                      />
                      <Route
                        path="/fashion_edit/:id"
                        element={<FashionEdit />}
                      />
                    </Route>
                  </Routes>
                </>
              ) : (
                "loading..."
              )}
            </FashionDispatchContext.Provider>
          </FashionStateContext.Provider>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
