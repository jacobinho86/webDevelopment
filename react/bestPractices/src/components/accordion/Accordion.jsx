import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();

export function useAccordionContext() {
    const ctx = useContext(AccordionContext);

    if(!ctx){
        throw new Error('Accordion related component must be wrapped by <Accordion>.');
    }

    return ctx;
}

/*this component will create a shell for the functionality */
export default function Accordion({children, className}){

    const [openItemId, setOpenItemId] = useState();

    function toggleItem(id) {
        setOpenItemId(previd => previd === id ? null : id);
    }
    
    const contextValue = {openItemId, toggleItem};

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={className}>
                {children}
            </ul>
        </AccordionContext.Provider>
    );
}

/*adding properties to the component, this makes clear that accordionitem goes with accordion */
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;