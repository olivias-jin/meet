Feature: Specify Number of Events

    Scenario: User able to see the 30 numbers of events on the page
        Given User is on the event listing page
        When the user clicks the filter button
        And inputs 30 numbers to see the events displayed
        Then the event listing page refresh and the user can see the specific number of events.

    Scenario: User able to see the specific number of events on the page
        Given User is on the event listing page
        When the user clicks the filter button
        And inputs a specific number to see the events displayed
        Then the event listing page refresh and the user can see the specific number of events.