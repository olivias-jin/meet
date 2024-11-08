Feature: Filter events by number of events shown

  Scenario: User is able to see the 30 numbers of events on the page
    Given User is on the event listing page
    When the user clicks the filter button
    And inputs 32 numbers to see the events displayed
    Then the event listing page refreshes and the user can see the specific number of events.
    