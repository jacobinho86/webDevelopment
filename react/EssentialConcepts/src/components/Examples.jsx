import TabButton from "./TabButton.jsx";
import { useState} from 'react'; //this is a built-in react hook
import { EXAMPLES } from '../data.js';
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";

export default function Examples() {
    //hooks only can be invoked in the top level of a component function or inside other hooks
  //calling hooks inside nested code statemets (functions, if statements, etc) is illegal also
  //useState always returns two elements:
  //the first element is the current data snapshot of the component execution cycle.
  //the second element is a function provided by react that update the stored state, invoking it triggers an state update
  const [selectedTopic, setSelectedTopic] = useState(); 
  //event handler
  function handleClick(selectedButton){
    //selectedButton => 'components','jsx', 'props', 'state'
    //this is a state changing function returned by the useState hook
    setSelectedTopic(selectedButton);
  }

  /*this variable will be used to render jsx content conditionally*/
  let tabContent = <p>Select a topic...</p>;
  if(selectedTopic){
    tabContent = (
    <div id="tab-content">            
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>{EXAMPLES[selectedTopic].code}</code>
      </pre>
      </div>);
    }

    return (
        <Section id="examples" title="Examples">
          <Tabs
            buttons={
            <>
              {/*use the event handler pointer and sent it as a prop */}
              <TabButton isSelected={selectedTopic === 'components'} onSelect={() => handleClick('components')}>Components</TabButton>
              <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => handleClick('jsx')}>JSX</TabButton>
              <TabButton isSelected={selectedTopic === 'props'} onSelect={() => handleClick('props')}>Props</TabButton>
              <TabButton isSelected={selectedTopic === 'state'} onSelect={() => handleClick('state')}>State</TabButton>
            </>
          }>
            {tabContent}
          </Tabs>          
        </Section>
    );
}