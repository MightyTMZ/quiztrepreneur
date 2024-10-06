import { useState } from "react";
import Quiz from "./Quiz";

const QuizScreen = () => {
  // const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#000");

  let currentMode = localStorage.getItem("darkModeEnabled");

  if (currentMode == "false") {
    setBackgroundColor("#000");
  } else {
    setBackgroundColor("#fff");
  }

  console.log(backgroundColor);

  return (
    <div>
      <Quiz />
    </div>
  );
};

export default QuizScreen;
