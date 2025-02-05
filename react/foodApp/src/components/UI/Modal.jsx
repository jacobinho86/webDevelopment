import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, className = '', onClose}) {
    const dialog = useRef();
    const cssClass = 'modal '+className;

    useEffect(() => {
        const modal = dialog.current;
        
        if(open){
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    //`modal $(className)`
    return createPortal(
        <dialog className={cssClass} ref={dialog} onClose={onClose}>
            {children}
        </dialog>, document.getElementById("modal")
    );
}