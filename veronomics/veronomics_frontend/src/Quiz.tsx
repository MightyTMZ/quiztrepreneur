import React, { useEffect, useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";

import axios from "axios";
import "./Quiz.css";

interface Option {
  option_text: string;
  correct: boolean;
}

interface Category {
  title: string;
}

interface Question {
  id: number;
  question_source: string;
  category: Category;
  question_text: string;
  options: Option[];
  explanation: string;
  difficulty: string;
}

const Quiz: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State for dark mode

  console.log(filteredQuestions);

  const backendServerAddress = "https://quiztrepreneur.pythonanywhere.com";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${backendServerAddress}/quiz/categories/`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchQuestionsByCategory = async (category: string) => {
    try {
      const response = await axios.get(
        `${backendServerAddress}/quiz/questions/list-all/?search=${category}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching questions for category ${category}:`,
        error
      );
      return [];
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;

    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Select all categories
      const allCategoryTitles = categories.map((category) => category.title);
      setSelectedCategories(allCategoryTitles);
    } else {
      // Deselect all categories
      setSelectedCategories([]);
    }
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleFilterQuestions = async () => {
    let allQuestions: Question[] = [];
    for (const category of selectedCategories) {
      const questionsForCategory = await fetchQuestionsByCategory(category);
      allQuestions = [...allQuestions, ...questionsForCategory];
    }

    const difficultyFilteredQuestions = allQuestions.filter(
      (question) =>
        !selectedDifficulty || question.difficulty === selectedDifficulty
    );

    setFilteredQuestions(difficultyFilteredQuestions);

    if (difficultyFilteredQuestions.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * difficultyFilteredQuestions.length
      );
      setQuestion(difficultyFilteredQuestions[randomIndex]);
    } else {
      setQuestion(null);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (question) {
      const correctOption = question.options.find((option) => option.correct);
      if (selectedOption === correctOption?.option_text) {
        setFeedback("Correct!");
      } else {
        setFeedback(
          "Incorrect. The correct answer is: " +
            "<strong>" +
            correctOption?.option_text +
            "</strong>"
        );
      }
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption("");
    setFeedback("");
    setShowExplanation(false);
    handleFilterQuestions(); // Fetch a new random question
  };

  return (
    <>
      <div
        className={`container mt-5 afacad-flux ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
      >
        <h1
          className="text-center mb-4 crypto-font"
          style={{ letterSpacing: "3px", fontWeight: "400" }}
        >
          QUIZTREPRENEUR
        </h1>

        {/* Dark Mode Toggle */}
        <div className="text-center mb-4">
          <button
            className="btn btn-secondary toggle-switch"
            style={{ fontWeight: "bold" }}
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            {isDarkMode ? "LIGHT" : "DARK"} MODE
          </button>
        </div>

        <div className="container mt-5 libre-baskerville-bold">
          <blockquote>
            “Most of what I learned as an entrepreneur was by trial and error.”
            <footer>— Gordon Moore</footer>
            <div style={{ height: "30px" }}></div>
          </blockquote>

          <div className={isDarkMode ? "Light" : "Dark"}>
            {/* Dynamic Categories */}
            <div className="category-dropdown mb-3">
              <h2>Category:</h2>
              <div className="category-grid">
                <label
                  key="1"
                  id="selectAllButton"
                  className="category"
                  style={{ marginRight: "16px" }}
                >
                  <input
                    type="checkbox"
                    value={"All"}
                    checked={selectedCategories.length === categories.length} // Check if all categories are selected
                    onChange={handleSelectAll}
                  />
                  All topics
                </label>
                {categories.map((category, index) => (
                  <label
                    key={index}
                    className="category"
                    style={{ marginRight: "16px" }}
                  >
                    <input
                      type="checkbox"
                      value={category.title}
                      checked={selectedCategories.includes(category.title)}
                      onChange={handleCategoryChange}
                    />
                    {category.title}
                  </label>
                ))}
              </div>
            </div>
            {/* Difficulty Filter */}
            <div className="mb-3">
              <label
                htmlFor="difficultySelect"
                className="form-label libre-baskerville-bold"
              >
                <h2>Difficulty:</h2>
              </label>
              <select
                id="difficultySelect"
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
                className={
                  isDarkMode ? "form-select Light" : "form-select Dark"
                }
              >
                <option value="">All Difficulties</option>
                <option value="E">Easy</option>
                <option value="M">Medium</option>
                <option value="H">Hard</option>
              </select>
            </div>
            <p>
              <IoIosInformationCircle /> Make sure to select a topic
            </p>
            <button className="btn btn-primary" onClick={handleFilterQuestions}>
              Give me practice!
            </button>
          </div>
        </div>
        {/* Display Question */}
        {question ? (
          <div
            className={
              isDarkMode
                ? "shadow-sm p-4 dark-card libre-baskerville-regular"
                : "shadow-sm p-4 border-light libre-baskerville-regular"
            }
          >
            <h2
              className={`card-title mb-4 ${isDarkMode ? "text-white" : ""}`}
              dangerouslySetInnerHTML={{ __html: question.question_text }}
            />
            <form onSubmit={handleSubmit}>
              {question.options.map((option, index) => (
                <div className="form-check mb-2" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    id={`option${index}`}
                    value={option.option_text}
                    checked={selectedOption === option.option_text}
                    onChange={handleOptionChange}
                  />
                  <label
                    className={`form-check-label ${
                      isDarkMode ? "text-white" : ""
                    }`}
                    htmlFor={`option${index}`}
                    dangerouslySetInnerHTML={{ __html: option.option_text }}
                  />
                </div>
              ))}
              <button type="submit" className={`btn btn-primary btn-lg w-100`}>
                Submit
              </button>
            </form>
            {feedback && (
              <div
                className={`mt-3 alert ${
                  feedback.startsWith("Correct")
                    ? "alert-success"
                    : "alert-danger"
                } ${isDarkMode ? "dark-alert" : ""}`}
                dangerouslySetInnerHTML={{ __html: feedback }}
              ></div>
            )}
            {showExplanation && question.explanation && (
              <div
                className={`mt-3 alert alert-info ${
                  isDarkMode ? "dark-alert-info" : ""
                }`}
              >
                <strong>Explanation:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: question.explanation }}
                />
              </div>
            )}
            {showExplanation && (
              <button
                className={`btn btn-secondary mt-3 ${
                  isDarkMode ? "dark-btn" : ""
                }`}
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className={isDarkMode ? "text-white" : ""}>
              No questions found or loading...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
