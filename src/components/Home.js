import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { AnswerTable } from "./AnswerTable";
import Question from "./Question";

const QUESTIONS = [
  {
    id: 0,
    title: "Введите имя",
    type: "text",
    answer: "",
    changed: false,
    disabled: true
  },
  {
    id: 1,
    title: "Введите возраст",
    type: "number",
    answer: "",
    changed: false,
    disabled: true
  },
  {
    id: 2,
    title: "Введите пол",
    type: "select",
    options: ["Мужской", "Женский"],
    answer: "Мужской",
    changed: false,
    disabled: true
  },
  {
    id: 3,
    title: "Введите дату рождения",
    type: "date",
    answer: "",
    changed: false,
    disabled: true
  },
  {
    id: 4,
    title: "Введите семейное положение",
    type: "select",
    options: ["Женат", "Холост", "Разведен"],
    answer: "Женат",
    changed: false,
    disabled: true
  },
  {
    id: 5,
    title: "Любите ли вы программировать",
    type: "radio",
    options: ["Да", "Нет"],
    answer: "",
    changed: false,
    disabled: true
  }
];

export default function Home() {
  const [qData, chQData] = useState([]);
  const [aData, chAData] = useState([]);
  const [showQuestion, chShowQuestion] = useState(false);
  const [showResult, chShowResult] = useState(false);
  const [questionId, chQuestionId] = useState(0);
  const [value, chValue] = useState("");
  const [editCount, chEditCount] = useState(0);

  useEffect(() => {
    chQData(QUESTIONS);
  }, []);

  function changeQuestion(val) {
    const qId = questionId + val;
    if (!value && val === 1) {
      alert("Поле не может быть пустым");
      return;
    }
    const questions = qData.map(item => {
      if (item.id === questionId) {
        if (value !== item.answer && item.changed === true) {
          item.disabled = false;
          chEditCount(editCount + 1);
        }
        item.answer = value;
        item.changed = true;
      }
      return item;
    });
    chQData(questions);
    if (qId !== qData.length) {
      chValue(qData[qId].answer);
      chQuestionId(qId);
    } else {
      chShowQuestion(false);
      chQuestionId(0);
      chShowResult(true);
      const answers = qData.map(item => {
        return { question: item.title, answer: item.answer };
      });
      chAData(answers);
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col text-center">
          <h3>Анкета</h3>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col col-md-6">
          {showQuestion ? (
            <Question
              data={qData}
              questionId={questionId}
              chValue={chValue}
              changeQuestion={changeQuestion}
              editCount={editCount}
              value={value}
            />
          ) : showResult ? (
            <AnswerTable data={aData} />
          ) : (
            <div className="text-center	">
              <Button color="secondary" onClick={() => chShowQuestion(true)}>
                Начать
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
