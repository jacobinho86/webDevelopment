import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  /*here useEffect is used to sync the connection between ref and prop */
  useEffect(() => {
    if(open){
      dialog.current.showModal();
    }else{
      dialog.current.close();
    }
  }, [open]);
  /*any value that causes the component function to execute and are used inside the useEffect function are dependencies */

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
