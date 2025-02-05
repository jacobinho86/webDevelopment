/*the container by default will be the menu tag, this is a default value for a prop element */
export default function Tabs({children, buttons, ButtonsContainer = 'menu'}){
    /*the identifier needs to start with a capital letter, in this case Buttons Container
     to let the react process search for bult-in components or custom components */
    return (
        <>
            {/*here a prop is used as a component, we can pass a string id like menu in this case, or a custom component could be used*/}
            <ButtonsContainer>
                {buttons}
            </ButtonsContainer>
            {children}
        </>
    );
}