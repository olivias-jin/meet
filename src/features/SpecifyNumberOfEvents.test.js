import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {
  
  test('User is able to see the 30 numbers of events on the page', ({ given, when, and, then }) => {
    jest.setTimeout(10000);
    let AppComponent;
    let EventListDOM;
    let user;

    given('User is on the event listing page', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
    });

    when('the user clicks the filter button', async () => {
      user = userEvent.setup();
      const filterButton = await waitFor(() =>
        within(EventListDOM).findByRole('button', { name: /filter/i }),
        { timeout: 5000 }
      );
      await user.click(filterButton);
    });

    and('inputs 30 numbers to see the events displayed', async () => {
      const input = within(EventListDOM).getByRole('textbox');
      await userEvent.clear(input);  // Clear the input field
      await userEvent.type(input, '30');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(30);
      });
    });

    then('the event listing page refreshes and the user can see the specific number of events.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(30);  // Ensure correct number of events are displayed
    });
  });
});
