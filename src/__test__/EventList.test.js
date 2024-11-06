import { render, within, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../components/EventList';
import App from "../App";
import { act } from 'react';

describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList events={[]} />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    await act(async () => {
      EventListComponent.rerender(<EventList events={allEvents} />);
    });
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});

describe('<EventList /> integration', () => {
  test('renders a non-empty list of events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const EventListDOM = AppComponent.container.querySelector('#event-list');

    expect(EventListDOM).not.toBeNull();
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });
});