import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import { getEvents } from "../mock-data";
import userEvent from '@testing-library/user-event';
import EventList from "../components/EventList";

const feature = loadFeature('./src/features/SpecifyNumberOfEvents');

defineFeature(feature, test => {
    test('User able to see the specify number of events on the page', ({ given, when, and, then }) => {

        let AppComponent;
        given('User is on the event listing page ', () => {
            AppComponent = render(<App />);
        });

        when('the user clicks the `filter` button', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
        });

        and('inputs a 32 number to see the events displayed', () => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            await user.click(suggestionsListItems[32]);
        });

        then('the event listing page refresh and the user can see the specific number of events', () => {
            await waitFor(() => {
                expect(EventListItems.length).toBe(32);

            });
        });
    });


    test('User able to see the specify number of events on the page', ({ given, when, and, then }) => {

        let AppComponent;
        given('User is on the event listing page ', () => {
            AppComponent = render(<App />);
        });

        when('the user clicks the `filter` button', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
        });

        and('inputs a 2 number to see the events displayed', () => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            await user.click(suggestionsListItems[2]);
        });

        then('the event listing page refresh and the user can see the specific number of events', () => {
            await waitFor(() => {
                expect(EventListItems.length).toBe(2);

            });
        });
    });
});