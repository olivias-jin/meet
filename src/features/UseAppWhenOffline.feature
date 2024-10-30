Feature: Use the App When Offline

 Scenario: A user should be able to use/see the previously loaded events information  when the app is offline. 
  Given : the app is offline.
   When : the user tries to refresh new event data
  Then : the app can’t fresh the data and pop up a message `offline`
