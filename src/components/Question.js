import React from "react";
import { ButtonGroup, Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function Question({
  data,
  questionId,
  chValue,
  changeQuestion,
  editCount,
  value
}) {
  const question = data.find(item => item.id === questionId);
  return (
    <Form>
      <div className="text-center">
        Вопрос {questionId + 1} из {data.length}
      </div>
      {question.type === "radio" ? (
        <div
          className="d-flex justify-content-around mb-4"
          onChange={e => chValue(e.target.value)}
        >
          <Label for={`id-${questionId}`}>{question.title}</Label>
          {question.options.map((item, index) => {
            return (
              <Label key={index} check>
                <Input
                  type="radio"
                  name="radio"
                  disabled={
                    question.disabled && question.changed && editCount === 2
                  }
                  value={item}
                />{" "}
                {item}
              </Label>
            );
          })}
        </div>
      ) : (
        <FormGroup>
          <Label for={`id-${questionId}`}>{question.title}</Label>
          {question.type === "select" ? (
            <Input
              type={question.type}
              name={question.type}
              disabled={
                question.disabled && question.changed && editCount === 2
              }
              id={`id-${questionId}`}
              value={value}
              onChange={e => chValue(e.target.value)}
            >
              {question.options.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </Input>
          ) : (
            <Input
              type={question.type}
              name={question.type}
              disabled={
                question.disabled && question.changed && editCount === 2
              }
              id={`id-${questionId}`}
              placeholder={question.title}
              value={value}
              onChange={e => chValue(e.target.value)}
            />
          )}
        </FormGroup>
      )}
      <div className="text-center">
        <ButtonGroup>
          <Button
            disabled={questionId === 0}
            onClick={() => changeQuestion(-1)}
          >
            Пред.
          </Button>
          <Button onClick={() => changeQuestion(1)}>
            {questionId !== data.length - 1 ? "След." : "Результат"}
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}
