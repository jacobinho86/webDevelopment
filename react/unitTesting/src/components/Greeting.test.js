import Greeting from "./Greeting";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//this function creates a test suite, a set of related test under a same description
describe('Greeting Component', ()=>{
    test('Renders Hello World as text', ()=>{
        //1.-set up test conditions, test data and test environment
    
        //you pass jsx code to the render method
        render(<Greeting />);
    
        //2.-run the logic that should be tested
        //nothing to do in this example...
    
        //3.-compare the execution results with expected resutls
    
        //find the desired text in the virtual dom
        const string = screen.getByText('Hello World', {exact:false});
    
    
        expect(string).toBeInTheDocument();
    });

    //check if we get the default greeting
    test('renders "good to see you", if button was NOT clicked', () => {
        render(<Greeting />);

        const outputElement = screen.getByText('good to see you', {exact: false});
        expect(outputElement).toBeInTheDocument();
    });

    //test if text changes when a button is pressed
    test('renders "Changed!", if the button WAS clicked', () => {
        render(<Greeting />);
        
        const button = screen.getByRole('button');
        //userEvent is an object to perform events in objects of the virtual DOM
        userEvent.click(button);

        const outputElement = screen.getByText('Changed!', {exact: false});

        expect(outputElement).toBeInTheDocument();

    });

    test('does not render "good to see you" if the button was clicked', () => {
        render(<Greeting />);
        
        const button = screen.getByRole('button');
        //userEvent is an object to perform events in objects of the virtual DOM
        userEvent.click(button);

        //querybyText returns null if the element is not found
        const outputElement = screen.queryByText('good to see you', {exact: false});
        expect(outputElement).toBeNull();
    });
});

