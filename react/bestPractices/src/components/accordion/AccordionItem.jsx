import { createContext, useContext } from "react";

const AccordionItemContext = createContext();

export function useAccordionItemContext(){
    const ctx = useContext(AccordionItemContext);

    if(!ctx){
        throw new Error('Accordion Item related components must be wraped by <Accordion.Item>');
    }
    return ctx;
}

export default function AccordionItem({id, children, className}) {

    return (
        <AccordionItemContext.Provider value={id}>
            <li className={className}>
                {children}            
            </li>
        </AccordionItemContext.Provider>
    );
}