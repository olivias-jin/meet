Feature: Show/Hide Events by Details

 Scenario: User able to show events by details 
  Given : User opens the main page
  And : click the events user wants to view more information 
  When : the user clicks on the `show details` button 
  Then : it shows all the details about the events.

 Scenario: User able to hide events by details 
  Given : User already open the main page
  When : the user clicks on the `hide details` button
  Then : it hides all the details about the events
  And : the user can see the main page and title of the events
