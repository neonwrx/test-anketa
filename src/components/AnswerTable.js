import React from "react";
import { Table, Button } from "reactstrap";

export function AnswerTable({ data }) {
  const sendToServer = () => {
    fetch("http://localhost:8080/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res);
        alert("Успешно отправлено");
      })
      .catch(err => console.error(err));
  };
  return (
    <>
      <Table striped borderless>
        <thead>
          <tr>
            <th>Вопрос</th>
            <th>Ответ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <th>{item.question}</th>
                <td>{item.answer}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button color="secondary" onClick={sendToServer}>
        Отправить на сервер
      </Button>
    </>
  );
}
