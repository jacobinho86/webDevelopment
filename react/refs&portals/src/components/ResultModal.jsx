import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

/*ref pointers are not props! You cannot forward refs through components, this is why 'forwardRef' exists*/
/*the return value is a react component adjusted to have the forwarded ref*/
/*the second parameter (after the prop object) is a ref parameter, this is where it is forwarded, btw IT SHOULD BE CALLED red SO it is recognized*/
const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref) {
    //this is to expose all of the properties defined in this hook to the world
    const dialog = useRef();

    const userLost = (remainingTime <= 0);
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1-(remainingTime / (targetTime*1000)))*100);

    /*this is a way to expose selected properties of the component through the ref, so we can detach the functionality and separate
    the development of components, meaning, the designer of TimerChallenge doesn't need to know how ResultModal implements its functionality
    it will only expose an API which internal logic is a responsability of the designer of this component. All of this can be done 
    through the useImperativeHandle hook*/

    /*the first parameter of the hooks HAS TO BE the ref that contains the properties that we want to selectively expose to the world.
    The second parameter is a function that returns an object that gathers all such properties*/
    useImperativeHandle(ref, () => {
        return {
            //this method will implement the logic to show the dialog, is this method that will be callabale outside this component
            showDialog() {
                dialog.current.showModal();
            }
        };
    });
    /*the idea behind a portal is to render the jsx code of a component in a different part of the DOM */
    return createPortal(
        /*pay attention to the ref that is hooked to the dialog component is the one created for the imperativeHandle hook */
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds</strong>.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime}</strong>.</p>
            {/*This is plain html-a form with the "dialog" method inside the method element- 
            any button that submit the form will close it  */}
            <form method="dialog" onSubmit={onReset} onClose={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal") //the element to which this code should be "transported" is passed as the second parameter
    );
});

export default ResultModal;