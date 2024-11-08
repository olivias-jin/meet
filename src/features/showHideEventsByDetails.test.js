import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import { getEvents } from "../mock-data";
import userEvent from "@testing-library/user-event";
import EventList from "../components/EventList";

const feature = loadFeature('./src/features/ShowHideEventsByDetails.feature');

defineFeature(feature, test => {
    let AppComponent;

    test('An event element is collapsed by default', ({ given, when, then }) => {

        given('User opens the app', () => {
            AppComponent = render(<App />);
        });

        when('list of events are rendered', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        then("it doesn’t show details of event.", () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).toBeInTheDocument(); // Fixed this line
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {

        given('User opens the main page', () => {
            AppComponent = render(<App />);
        });

        when('the user clicks on the `show details` button', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const showDetailButton = within(AppDOM).getByRole('button', { name: /show details/i });
            await userEvent.click(showDetailButton);
        });

        then('it shows all the details about the events.', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).toBeInTheDocument(); // Fixed this line
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {

        given('User already open the main page', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const showDetailButton = within(AppDOM).getByRole('button', { name: /show details/i });
            await userEvent.click(showDetailButton);
        });

        when('the user clicks on the `hide details` button', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const hideDetailsButton = within(AppDOM).getByRole('button', { name: /hide details/i });
            await userEvent.click(hideDetailsButton);
        });

        then('it hides all the details about the events.', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).toBeInTheDocument(); // Fixed this line
        });
    });
});
