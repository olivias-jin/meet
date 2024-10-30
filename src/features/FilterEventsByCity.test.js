import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import { getEvents } from "../mock-data";
import userEvent from '@testing-library/user-event';
import EventList from "../components/EventList";

const feature = loadFeature('./src/features/FilterEventsByCity.feature');

defineFeature(feature, test => {
    test('when user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn’t searched for any city', () => {

        });

        let AppComponent;
        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see the list of upcoming events.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

    });

    test('user should see a list of suggestions when they search for a city', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);

        });

        let CitySearchDOM;
        when('user starts typing in the city textbox', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(CitySearchInput, "Berlin");
        });

        then('the user should receive a list of cities (suggestions) that match what they’ve typed',
            async () => {
                const suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionsListItems).toHaveLength(2);
            });
    });

    test('user can select a city from the suggested list', ({ given, and, when, then }) => {

        let AppComponent;
        let AppDOM;
        let CitySearchDOM;
        let CitySearchInput;
        given('user was typing “Berlin” in the city textbox', () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(CitySearchInput, "Berlin");
        });

        let suggestionsListItems;
        and('the list of suggested cities is showing', () => {
            suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionsListItems).toHaveLength(2);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
            const user = userEvent.setup();
            await user.click(suggestionsListItems[0]);
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
            expect(CitySearchInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();

            // filtering the list of all event down to events located in Germany
            // CitySearchInput.value should have the value "Berlin, Germany" at this point

            const berlinEvents = allEvents.filter(event => event.location === CitySearchInput.value)
            expect(EventListItems).toHaveLength(berlinEvents.length);
        });
    });
});