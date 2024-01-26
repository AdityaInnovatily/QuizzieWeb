import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Trial.css";
// import TrendingCard from "../../components/trendingCard/TrendingCard";
// import DeleteIcon from "../../assets/images/delete-icon.svg";
// import EditIcon from "../../assets/images/edit-icon.svg";
// import ShareIcon from "../../assets/images/share-icon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FadeLoader } from "react-spinners";
// import Confetti from "react-confetti";


const TrendingCard = ({ quizName2, impressions, creationDate }) => {
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
  
    const [activeScreen, setActiveScreen] = useState("dashboard");
  
   
    //for createQuiz Screen
    const [email, setEmail] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quizType, setQuizType] = useState("");
  

  
    const handleCancelQuizQuestionModal = () => {
      setShowQuestionModal(false);
    };
  
    //Question Modal -
    //for question numbers
    const [questions, setQuestions] = useState([1]);
    const handleAddQuestion = () => {
      if (questions.length < 5) {
        setQuestions([...questions, { title: "" }]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };
  
    const handleDeleteQuestion = (index) => {
      if (questions.length > 1) {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
  
        if (currentQuestionIndex === index) {
          setCurrentQuestionIndex(index > 0 ? index - 1 : 0);
        } else if (currentQuestionIndex > index) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      }
      // setCurrentQuestionIndex(index-1)
    };
  
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
    useEffect(() => {
      // Perform side effects here when currentQuestionIndex changes
    }, [currentQuestionIndex]);
  
    // Update question number change handler to set current question index
    const handleQuestionNoChange = (index) => {
      setCurrentQuestionIndex(index);
    };
  
    //for questions and options
    const [showQuestionModal, setShowQuestionModal] = useState(false);
  
    const handleOptionTypeSelect = (index) => {
      setSelectedOptionType(index);
    };
  
    const [pollQuestion, setPollQuestion] = useState({});

    const handleQuestionTextChange = (e, index) => {
      const updatedQuestions = { ...pollQuestion };
      updatedQuestions[index] = e.target.value;
      setPollQuestion(updatedQuestions);
    };
  
    const [options, setOptions] = useState(
      Array(5)
        .fill()
        .map(() => [
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
        ])
    );
  
    const [selectedOptionType, setSelectedOptionType] = useState(0);
    const [ansOption, setAnsOption] = useState({});

    const handleRadioSelect = (index) => {
      const updatedAnsOptions = { ...ansOption };
      updatedAnsOptions[currentQuestionIndex] = index;
      setAnsOption(updatedAnsOptions);
    };
  
    const [timerType, setTimerType] = useState({});
  
    const [newQuizId, setNewQuizId] = useState(null);
  
    const handleTimerTypeSelect = (value) => {
      const updatedTimerTypes = { ...timerType };
      updatedTimerTypes[currentQuestionIndex] = value;
      setTimerType(updatedTimerTypes);
    };
  
    const handleCreateQuizSubmit = () => {
      // Validate all fields are filled
  
      const isPollQuestionFilled = pollQuestion[0] !== "";
      const isOptionsFilled = options.some((option) =>
        option.some((item) => item.text !== "" || item.imageURL !== "")
      );
      const isAnsOptionFilled = Object.values(ansOption).some(
        (value) => value !== null
      );
      const isTimerTypeFilled =
        quizType !== "Poll Type"
          ? Object.values(timerType).some((value) => value !== "")
          : true;
      if (!isPollQuestionFilled) {
        alert("Poll question is not filled. Please fill it.");
        return;
      }
      if (selectedOptionType === null) {
        alert("Selected option type is not set. Please set it.");
        return;
      }
      if (!isOptionsFilled) {
        alert("Options are not filled. Please fill it.");
        return;
      }
      if (!isAnsOptionFilled) {
        alert("Answer option is not set. Please set it.");
        return;
      }
      if (!isTimerTypeFilled) {
        alert("Timer type is not set. Please set it.");
        return;
      }
  
      if (!quizName || !quizType) {
        alert("Please fill in the Quiz Name and Quiz Type");
        return;
      }
  
      console.log(options);
  
      const questions = [
        {
          pollQuestion,
          timerType,
          options,
          ansOption,
        },
      ];
  
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/createquiz`,
          { quizName, quizType, questions, email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setNewQuizId(response.data.id);
        })
        .catch((error) => {
          console.error("An error occurred while saving the quiz:", error);
        });
  
      // delete data in states
      setPollQuestion("");
      setOptions(
        Array(5)
          .fill()
          .map(() => [
            { text: "", imageURL: "" },
            { text: "", imageURL: "" },
            { text: "", imageURL: "" },
            { text: "", imageURL: "" },
          ])
      );
      setAnsOption({});
      setTimerType({});
      setQuizName("");
      setQuizType("");
      setQuestions([1]);
      setCurrentQuestionIndex(0);
      setShowQuizPublishedModal(true);
      setShowQuestionModal(false);
      setNewQuizId(null);
    };
  
    const handleOptionTextChange = (e, questionIndex, optionIndex) => {
      const updatedOptions = [...options];
      updatedOptions[questionIndex][optionIndex] = {
        ...updatedOptions[questionIndex][optionIndex],
        text: e.target.value,
      };
      setOptions(updatedOptions);
    };
  
    const handleOptionImageURLChange = (e, questionIndex, optionIndex) => {
      const updatedOptions = [...options];
      updatedOptions[questionIndex][optionIndex] = {
        ...updatedOptions[questionIndex][optionIndex],
        imageURL: e.target.value,
      };
      setOptions(updatedOptions);
    };
  
    //for analytics tab
    const [quizzes, setQuizzes] = useState([]);
    const [isAnalyticsLoading, setAnalyticsLoading] = useState(true);
  
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/quizzes?email=${email}`)
        .then((response) => {
          setQuizzes(response.data);
          setTimeout(() => {
            setAnalyticsLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.error("An error occurred while fetching the quizzes:", error);
        });
    }, [activeScreen, email]);
  
    //for quiz published modal
    const [showQuizPublishedModal, setShowQuizPublishedModal] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    const jwtToken = localStorage.getItem("jwt");
    // console.log("jwt from local storage:", jwtToken);
  
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/isloggedin`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        if (response.data.isLoggedIn) {
          setEmail(response.data.user.email);
          setIsLoggedIn(response.data.isLoggedIn);
        } else {
          console.log("User is not logged in");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  
 
  
    //for quiz data in dashboard
    const [quizData, setQuizData] = useState(null);
    const [trendingQuizzes, setTrendingQuizzes] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(true);
  
    useEffect(() => {
      // Fetch data for dashboard main container
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/userData?email=${email}`)
        .then((response) => {
          const { quizzes, questions, impressions } = response.data;
          setQuizData({ quizzes, questions, impressions });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
  
      // Fetch trending quizzes
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/trendingQuizzes?email=${email}`
        )
        .then((response) => {
          setTrendingQuizzes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching trending quizzes:", error);
        });
    }, [email]);
  
    useEffect(() => {
      if (quizData !== null && trendingQuizzes) {
        setTimeout(() => {
          setDashboardLoading(false);
        }, 600);
      }
    }, [quizData, trendingQuizzes]);
  
    return (
    <>
      <div className={styles.modalContent}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className={styles.questionNoContainer}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: ".5rem",
                      alignItems: "center",
                    }}
                  >
                    {questions.map((question, index) => (
                      <div
                        className={`${styles.questionNo} ${
                          index === currentQuestionIndex
                            ? styles.activeQuestionNumber
                            : ""
                        }`}
                        key={index}
                        onClick={() => handleQuestionNoChange(index)}
                      >
                        {index + 1}
                        {index !== 0 && (
                          <span
                            className={styles.crossBtn}
                            onClick={() => handleDeleteQuestion(index)}
                          >
                            x
                          </span>
                        )}
                      </div>
                    ))}
                    {questions.length < 5 && (
                      <div
                        className={styles.addBtn}
                        onClick={handleAddQuestion}
                      >
                        +
                      </div>
                    )}
                  </div>
                  <p>Max 5 Questions</p>
                </div>
                <div className={styles.questionContent}>
                  <div>
                    <input
                      type="text"
                      placeholder="Poll Question"
                      value={pollQuestion[currentQuestionIndex] || ""}
                      onChange={(e) =>
                        handleQuestionTextChange(e, currentQuestionIndex)
                      }
                      className={styles.pollQuestion}
                    />
                  </div>

                  <div
                    className={styles.pollOptionType}
                    style={{ display: "flex" }}
                  >
                    <div style={{ marginRight: "1.5rem" }}>Option Type:</div>
                    <label className={styles.modalLabel}>
                      <input
                        type="radio"
                        name="optionType"
                        checked={selectedOptionType === 0}
                        onChange={() => handleOptionTypeSelect(0)}
                      />
                      Text
                    </label>
                    <label
                      className={styles.modalLabel}
                      style={{ marginLeft: ".5rem" }}
                    >
                      <input
                        type="radio"
                        name="optionType"
                        checked={selectedOptionType === 1}
                        onChange={() => handleOptionTypeSelect(1)}
                      />
                      Image URL
                    </label>
                    <label
                      className={styles.modalLabel}
                      style={{ marginLeft: ".5rem" }}
                    >
                      <input
                        type="radio"
                        name="optionType"
                        checked={selectedOptionType === 2}
                        onChange={() => handleOptionTypeSelect(2)}
                      />
                      Text and Image URL
                    </label>
                  </div>
                  <div
                    className={styles.pollOptions}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {[0, 1, 2, 3].map((index) => (
                      <div className={styles.modalLabel} key={index}>
                        <input
                          type="radio"
                          name="ansOption"
                          checked={ansOption[currentQuestionIndex] === index}
                          onChange={() => handleRadioSelect(index)}
                        />
                        {selectedOptionType === 0 && (
                          <input
                            type="text"
                            name={`optionText_${index}`}
                            value={options[currentQuestionIndex][index].text}
                            placeholder="Option"
                            onChange={(e) =>
                              handleOptionTextChange(
                                e,
                                currentQuestionIndex,
                                index
                              )
                            }
                            className={`${styles.optionInput} ${
                              ansOption &&
                              ansOption[currentQuestionIndex] === index
                                ? styles.greenBackground
                                : ""
                            }`}
                          />
                        )}
                        {selectedOptionType === 1 && (
                          <input
                            type="url"
                            name={`optionImageURL_${index}`}
                            value={
                              options[currentQuestionIndex][index].imageURL
                            }
                            placeholder="Option Image URL"
                            onChange={(e) =>
                              handleOptionImageURLChange(
                                e,
                                currentQuestionIndex,
                                index
                              )
                            }
                            className={`${styles.optionInput} ${
                              ansOption &&
                              ansOption[currentQuestionIndex] === index
                                ? styles.greenBackground
                                : ""
                            }`}
                          />
                        )}
                        {selectedOptionType === 2 && (
                          <>
                            <input
                              type="text"
                              name={`optionText_${index}`}
                              value={options[currentQuestionIndex][index].text}
                              placeholder="Option"
                              onChange={(e) =>
                                handleOptionTextChange(
                                  e,
                                  currentQuestionIndex,
                                  index
                                )
                              }
                              className={`${styles.optionInput} ${
                                ansOption &&
                                ansOption[currentQuestionIndex] === index
                                  ? styles.greenBackground
                                  : ""
                              }`}
                            />

                            <input
                              type="url"
                              name={`optionImageURL_${index}`}
                              value={
                                options[currentQuestionIndex][index].imageURL
                              }
                              placeholder="Option Image URL"
                              onChange={(e) =>
                                handleOptionImageURLChange(
                                  e,
                                  currentQuestionIndex,
                                  index
                                )
                              }
                              className={`${styles.optionInput} ${
                                ansOption &&
                                ansOption[currentQuestionIndex] === index
                                  ? styles.greenBackground
                                  : ""
                              }`}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {quizType !== "Poll Type" && (
                    <div
                      className={styles.timerType}
                      style={{ display: "flex" }}
                    >
                      <div style={{ marginRight: "auto" }}>Timer Type:</div>
                      <label className={styles.modalLabel}>
                        <input
                          type="radio"
                          name="timerType"
                          value="5 Sec"
                          checked={timerType[currentQuestionIndex] === "5 Sec"}
                          onChange={() => handleTimerTypeSelect("5 Sec")}
                        />{" "}
                        5 Sec
                      </label>
                      <label
                        className={styles.modalLabel}
                        style={{ marginLeft: ".5rem" }}
                      >
                        <input
                          type="radio"
                          name="timerType"
                          value="10 Sec"
                          checked={timerType[currentQuestionIndex] === "10 Sec"}
                          onChange={() => handleTimerTypeSelect("10 Sec")}
                        />
                        10 Sec
                      </label>
                      <label
                        className={styles.modalLabel}
                        style={{ marginLeft: ".5rem" }}
                      >
                        <input
                          type="radio"
                          name="timerType"
                          value="OFF"
                          checked={timerType[currentQuestionIndex] === "OFF"}
                          onChange={() => handleTimerTypeSelect("OFF")}
                        />{" "}
                        OFF
                      </label>
                    </div>
                  )}
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={handleCancelQuizQuestionModal}
                      className={styles.cancelModalButton}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateQuizSubmit}
                      className={styles.confirmCreateQuizButton}
                    >
                      Create Quiz
                    </button>
                  </div>
                </div>
              </div>
    </>
  );
};

export default TrendingCard;