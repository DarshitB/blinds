import React, { useState, useEffect } from "react";
function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function handleClose() {
    setIsOpen(false);
    setTimeout(() => {
      props.onClose();
    }, 500);
  }
  return (
    <div className={`modal ${isOpen ? "open" : "close"}`}>
      <div className={`modal-content ${isOpen ? "open" : "close"}`}>
        <p className="close-button" onClick={handleClose}>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </p>
        <h2>{props.title}</h2>
        <p>{props.description1}</p>
        <p>{props.description2}</p>
        <p>{props.description3}</p>
      </div>
    </div>
  );
}

export default Modal;
