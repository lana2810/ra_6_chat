import React from "react";
function Message({ idUser, message }) {
  const tmp = localStorage.getItem("idUser");
  return (
    <div
      className="message"
      style={
        tmp === idUser ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }
      }
    >
      {message}
    </div>
  );
}

export default Message;
