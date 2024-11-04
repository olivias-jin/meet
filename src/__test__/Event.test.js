import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { render, screen } from '@testing-library/react';
import mockData from "../mock-data";

const event = mockData[0];

describe('<Event /> component', () => {
    beforeEach(() => {
        render(<Event event={event} />);
    });

    test('renders event title', () => {
        const eventTitle = screen.queryByText(event.summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const eventTime = screen.queryByText(new Date(event.created).toUTCString());
        expect(eventTime).toBeInTheDocument();
    });

    test('renders event location', () => {
        const eventLocation = screen.queryByText(event.location);
        expect(eventLocation).toBeInTheDocument();
    });
    
    // Show Details button
    test('render event details button', () => {
        const detailButton = screen.queryByText('Show details'); // Make sure to match text exactly
        expect(detailButton).toBeInTheDocument();
    });
    
    // Scenario 1 
    test("event's details are hidden by default", () => {
        const eventDetails = screen.queryByText(/details/i);
        expect(eventDetails).not.toBeInTheDocument(); // Assuming details are not present initially
    });

    // Scenario 2
    test('show details after user clicks on button "Show details"', async () => {
        const user = userEvent.setup();
        const showDetailButton = screen.getByText('Show details');
        await user.click(showDetailButton);

        // Check if the details paragraph is displayed
        const eventDetails = screen.getByText(/details/i); // Match the actual details text
        expect(eventDetails).toBeInTheDocument();
    });

    // Scenario 3
    test('hide details after user clicks on button "Hide details"', async () => {
        const user = userEvent.setup();
        const showDetailButton = screen.getByText('Show details');
        await user.click(showDetailButton); // First show details

        const hideDetailButton = screen.getByText('Hide details'); // Now this should be present
        await user.click(hideDetailButton);

        const eventDetails = screen.queryByText(/details/i); // Match actual content of the details
        expect(eventDetails).not.toBeInTheDocument(); // Verify details are hidden
    });
});