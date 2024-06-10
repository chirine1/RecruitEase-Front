import React from "react";

const ContactList = ({ messages, currentUserId, selectedMessageIndex, onSelectMessage }) => {
  return (
    <div>
      <ul className="contacts">
        {messages.map((message, index) => (
          <li
            key={index}
            className={index === selectedMessageIndex ? "active" : ""}
          >
            <a
              href="#"
              style={{ display: "flex", flexDirection: "column" }}
              onClick={() => onSelectMessage(index)}
            >
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {currentUserId === message.sender.id
                  ? message.receiver.fullname
                  : message.sender.fullname}
              </div>
              <div style={{ color: "black" }}>{message.subject}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
