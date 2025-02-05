import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      {/*initial prop indicates a starting state before animation */}
      {/*variants prop is useful to re-use previous animation states, defined under a key-animation object pairs */}
      {/*the states of animateion are defined by string keys */}
      <motion.dialog 
        open
        variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y:0} 
        }}
        className="modal"
        initial = 'hidden'
        animate='visible'
        exit='hidden'>
          <h2>{title}</h2>
          {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
