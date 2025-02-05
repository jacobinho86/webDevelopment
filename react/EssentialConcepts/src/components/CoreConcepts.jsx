import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data.js";

export default function CoreConcepts(){
    return (
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/*this is the most direct way to access the attributes of the props*/}
            {/* <CoreConcept title={CORE_CONCEPTS[0].title}
                         description={CORE_CONCEPTS[0].description} 
                         image={CORE_CONCEPTS[0].image}
            />*/} 
            {/*but we can destructure when the key value pairs of the props are equal to the ones used in the component */}
            {/* <CoreConcept {...CORE_CONCEPTS[1]}/>
            <CoreConcept {...CORE_CONCEPTS[2]}/>
            <CoreConcept {...CORE_CONCEPTS[3]}/>*/}
            {/*This is how we can dynamically show the list of the core concepts, using the map function of js */}
            {CORE_CONCEPTS.map((concept) => <CoreConcept key={concept.title} {...concept}/>)}
            {/*the special key prop is necessary to distinguish each child of the list, this is an advaced topic used in later projects */}
            {/*look how we can return JSX code even within an arrow function, this is something to keep in mind */}
          </ul>
        </section>
    );
}