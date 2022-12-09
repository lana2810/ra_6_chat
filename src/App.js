import "./App.css";
import React, { useEffect, useState } from "react";
import InputMessage from "./Component/InputMessage";
import MessageList from "./Component/MessageList";
import { nanoid } from "nanoid";
import API from "./api";

function App() {
  const initialStateForm = {
    message: "",
  };

  const [form, setForm] = useState(initialStateForm);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);

  function loadData() {
    setLoading(true);
    const last = messages.length;
    API.getMessages(last).then((response) => {
      setMessages(response);
      setLoading(false);
      setWaiting(false);
    });
  }

  useEffect(() => {
    const tmp = nanoid();
    localStorage.setItem("idUser", tmp);
    loadData();

    let interval = setInterval(() => {
      loadData();
    }, 10000);
    return () => {
      localStorage.removeItem("idUser");
      clearInterval(interval);
    };
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const tmp = localStorage.getItem("idUser");
    await API.createMessage({ idUser: tmp, message: form.message });
    setForm(initialStateForm);
    setWaiting(true);
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <h4>Загрузка</h4>
        ) : (
          <MessageList items={messages} waiting={waiting} />
        )}
      </div>
      <div className="div-input">
        <InputMessage
          form={form}
          onChange={handleChange}
          onClick={handleClick}
        />
      </div>
    </>
  );
}

export default App;
