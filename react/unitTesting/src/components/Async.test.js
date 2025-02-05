import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe('Async omponent', () => {
    test('renders posts if request succeeds', async () => {
        //do not test code you haven't written
        //for example, built-in function fetch, better to use a mock
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: 'p1', title: 'first post'}],
        });
        render(<Async />);
        
        //this one returns a promise and waits for the http request to succeed
        //default 1 sec of waiting
        const list = await screen.findAllByRole('listitem');
        //list should not be empty
        expect(list).not.toHaveLength(0);
    });
});