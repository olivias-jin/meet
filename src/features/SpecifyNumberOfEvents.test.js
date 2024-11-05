import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('User able to see the 30 numbers of events on the page', ({ given, when, and, then }) => {
        let AppComponent;
        let EventListDOM;

        given('User is on the event listing page', async () => {
            await act(async () => {
                AppComponent = render(<App />);
            }
            );
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
        });

        when('the user clicks the filter button', async () => {  // Update to match feature file step exactly
            const user = userEvent.setup();
            const filterButton = within(EventListDOM).getByRole('button', { name: /filter/i });
            await user.click(filterButton);
        });

        and('inputs 30 numbers to see the events displayed', async () => {
            const input = within(EventListDOM).getByRole('textbox');
            await userEvent.clear(input);  // Clear the input field if needed
            await userEvent.type(input, '30');
        });

        then('the event listing page refresh and the user can see the specific number of events.', async () => {  // Update to match feature file step exactly
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(30);
            });
        });
    });

    test('User able to see the specific number of events on the page', ({ given, when, and, then }) => {
        let AppComponent;
        let EventListDOM;

        given('User is on the event listing page', async () => {
            await act(async () => {
                AppComponent = render(<App />);
            });
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
        });

        when('the user clicks the filter button', async () => {  // Update to match feature file step exactly
            const user = userEvent.setup();
            const filterButton = within(EventListDOM).getByRole('button', { name: /filter/i });
            await user.click(filterButton);
        });

        and('inputs a specific number to see the events displayed', async () => {
            const input = within(EventListDOM).getByRole('textbox');
            await userEvent.clear(input);  // Clear the input field if needed
            await userEvent.type(input, '2');
        });

        then('the event listing page refresh and the user can see the specific number of events.', async () => {  // Update to match feature file step exactly
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(2);
            });
        });
    });
});