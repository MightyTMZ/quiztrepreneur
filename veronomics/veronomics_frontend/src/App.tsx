import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./Quiz";
// import QuizScreen from "./QuizScreen";

function App() {
  return (
    <>
      <Router>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
