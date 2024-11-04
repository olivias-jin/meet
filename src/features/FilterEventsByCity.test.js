import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from '../App';
import { getEvents } from "../mock-data";
import userEvent from '@testing-library/user-event';
// import EventList from "../components/EventList";

const feature = loadFeature('./src/features/FilterEventsByCity.feature');

defineFeature(feature, test => {
    test("when user hasn’t searched for a city, show upcoming events from all cities.", ({ given, when, then }) => {
        let AppComponent;

        given("User hasn’t searched for any event", () => {
            // No setup needed here since we are just starting fresh
        });

        when("the user opens the app", () => {
            AppComponent = render(<App />);
        });

        then("the user should see the list of all upcoming events.", async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(30); // Adjust this based on the expected count
            });
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        let AppComponent;
    
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });
    
        when('user starts typing in the city textbox', async () => {
            const user = userEvent.setup();
            const CitySearchDOM = await AppComponent.findByTestId('city-search');
            const CitySearchInput = within(CitySearchDOM).getByRole('textbox');
            await user.type(CitySearchInput, "Berlin");
        });
    
        then('the user should receive a list of cities (suggestions) that match what they’ve typed', async () => {
            const CitySearchDOM = await AppComponent.findByTestId('city-search');
            const suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionsListItems).toHaveLength(2); // Adjust based on expected suggestions
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        let AppComponent;
        let CitySearchDOM;
        let CitySearchInput;

        given('user was typing “Berlin” in the city textbox', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            CitySearchDOM = await AppComponent.findByTestId('city-search');
            CitySearchInput = within(CitySearchDOM).getByRole('textbox');
            await user.type(CitySearchInput, "Berlin");
        });

        and('the list of suggested cities is showing', async () => {
            const suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionsListItems).toHaveLength(2);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
            const suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
            const user = userEvent.setup();
            await user.click(suggestionsListItems[0]); // Ensure suggestions are available here
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', async () => {
            expect(CitySearchInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            const EventListDOM = AppComponent.container.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();

            // Filter the list of events down to events located in Germany
            const berlinEvents = allEvents.filter(event => event.location === CitySearchInput.value);
            expect(EventListItems).toHaveLength(berlinEvents.length);
        });
    });
});