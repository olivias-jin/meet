import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import { getEvents } from "../mock-data";
import userEvent from '@testing-library/user-event';
import EventList from "../components/EventList";

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppComponent;
    let EventListDOM;

    test('User able to see the 30 numbers of events on the page', ({ given, when, and, then }) => {
        given('User is on the event listing page ', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
        });

        when('the user clicks the `filter` button', async () => {
            const user = userEvent.setup();
            const filterButton = within(EventListDOM).getByRole('button', { name: /filter/i });
            await user.click(filterButton); // Assuming you have a filter button to trigger the event display
        });

        and('inputs 30 numbers to see the events displayed', async () => {
            const input = within(EventListDOM).getByRole('textbox'); // Get the input field for the number
            await userEvent.type(input, '30'); // Type '30' into the input field
        });

        then('the event listing page refresh and the user can see the specific number of events.', async () => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(30);
            });
        });
    });

    test('User able to see the specific number of events on the page', ({ given, when, and, then }) => {
        given('User is on the event listing page', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
        });

        when('the user clicks the `filter` button', async () => {
            const user = userEvent.setup();
            const filterButton = within(EventListDOM).getByRole('button', { name: /filter/i });
            await user.click(filterButton); // Trigger the filter action
        });

        and('inputs a specific number to see the events displayed', async () => {
            const input = within(EventListDOM).getByRole('textbox'); // Get the input field for the number
            await userEvent.type(input, '2'); // Type '2' into the input field
        });

        then('the event listing page refresh and the user can see the specific number of events', async () => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(2);
            });
        });
    });
});