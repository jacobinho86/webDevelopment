import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/*this component is a wraper so that elements render by the code inside it will animate not just desapear */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button 
        whileHover={{scale:1.1, backgroundColor: '#8b11f0'}}
        transition={{type: 'spring', stiffness: 500}}
        onClick={handleStartAddNewChallenge} 
        className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
