import React, { useLayoutEffect, useRef } from "react";
import Message from "./Message";
import Typing from "./Typing";

function MessageList({ items, waiting }) {
  const el = useRef();
  useLayoutEffect(() => {
    el.current.scrollIntoView(false);
  }, []);
  return (
    <div className="chat-wrapper">
      <div className="chat" ref={el}>
        {items.map((item) => (
          <Message key={item.id} {...item} />
        ))}
        {waiting && <Typing />}
      </div>
    </div>
  );
}

export default MessageList;
