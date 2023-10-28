import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "../redux/actions/translateActions";
import Select from "react-select";
import { clearAnswer } from "../redux/slices/translateSlice";
const MainPage = () => {
  const state = useSelector((store) => store.translateSlice);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });

  // hedef dli state'i > ilk değer ingilizce
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  console.log(state);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  const handleChange = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);
    // inputları temizleme
    setText("");
    dispatch(clearAnswer());
  };

  return (
    <div className="main-page">
      <div className="container">
        <h1>Çeviri+</h1>
        <div className="translate-area">
          {/*Sol */}
          <div className="left">
            <Select
              value={sourceLang}
              onChange={(e) => setSourceLang(e)}
              isDisabled={state.isLoading}
              isLoading={state.isLoading}
              className="select"
              options={state.languages}
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          {/*Orta*/}
          <button onClick={handleChange} className="change-btn">
            Değiş
          </button>
          {/*Sağ */}
          <div className="right">
            <Select
              value={targetLang}
              onChange={(e) => setTargetLang(e)}
              isDisabled={state.isLoading}
              isLoading={state.isLoading}
              className="select"
              options={state.languages}
            />
            <textarea disabled value={state.answer}></textarea>
          </div>
        </div>
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          className="submit-btn"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default MainPage;
