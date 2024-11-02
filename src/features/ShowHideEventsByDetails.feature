Feature: Show/Hide Events by Details

    Scenario: An event element is collapsed by default
        Given User opens the app
        When list of events are render 
        Then it doens't show details of event.

    Scenario: User can expand an event to see its details
        Given User opens the main page
        When the user clicks on the `show details` button
        Then it shows all the details about the events.

    Scenario: User can collapse an event to hide details
        Given User already open the main page
        When the user clicks on the `hide details` button
        Then it hides all the details about the events

