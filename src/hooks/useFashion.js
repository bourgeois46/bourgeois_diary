import { useContext, useState, useEffect } from "react";
import { FashionStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useFashion = (id) => {
  const fashiondata = useContext(FashionStateContext);
  const [curFashionItem, setCurFashionItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentFashionItem = fashiondata.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentFashionItem) {
      window.alert("존재하지 않는 패션 일기입니다.");
      nav("/fashion", { replace: true });
    }

    setCurFashionItem(currentFashionItem);
  }, [id, fashiondata, nav]);

  return curFashionItem;
};

export default useFashion;
