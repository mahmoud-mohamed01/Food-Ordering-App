import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "", onClose }) {
  useEffect(() => {
    const modal = diallog.current;
    if (open) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [open]);

  let diallog = useRef();
  return createPortal(
    <dialog className={`modal ${className}`} ref={diallog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
