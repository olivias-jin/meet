import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import { getEvents } from "../mock-data";
import userEvent from "@testing-library/user-event";
import EventList from "../components/EventList";

const feature = loadFeature('./src/features/ShowHideEventsByDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent
        given('user opens the app', () => {
            AppComponent = render(<App />);
        });

        when('list of events are render', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        then('it doens`t show details of event', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).toBeInTheDocument;
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppComponent
        given('user opens the main page', () => {

        });

        let EventComponent;
        when('the user clicks on the `show details` button', () => {
            EventComponent = render(<App />);
        });

        then('it shows all the details about the events', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).toBeInTheDocument;
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        let EventComponent;
        given('User already open the main page', () => {
            EventComponent = render(<App />);

        });


        when('the user clicks on the `hide details` button', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).toBeInTheDocument;

        });

        let AppComponent
        then('it hides all the details about the events', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument;
        });
    });
});
