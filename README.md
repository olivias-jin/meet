# Meet App

# Live Link
[Meet App](https://olivias-jin.github.io/meet)


# Table of Contents

1. [Project Feature](#project-feature)
2. [Technologies Used](#technologies-used)

# Project Feature
## Feature 1: Filter Events By City
As a user,
I should be able to filter events by city
So that I can see the diveristy city on the app 

Given: The user is viewing city that contains the events. <br />
When: The user clicks the main button for check the list of city.<br />
Then: The total city list shows up and then click the suggested city.

## Feature 2: Show/Hide Events by Details
As a user,
I should be able showing and hiding events by details
So that I can view more information about an event only when needed and hide it when I'm done.

Given the user has expanded an event's details <br />
When the user clicks on the "hide details" button for the same event<br />
Then the event details should collapse and become hidden from the user <br />

## Featrue 3: Specify Number of Events
As a user,
I should be able to specify the number of events to be shown
So that I can view that specific number of events on the page.

Given: The user is on the event listing page.<br />
When: The user inputs a specific number on a the menu to see the number of evetns displayed.<br />
Then: The events listing page refreshes, and displays the speicified number of events.

## Feature 4: Use the App When Offline
As a user,
I should be able to use the app when I am offline,
So that I can still access previously loaded event information without an internet connection.

Given: the user is offline <br />
When: the user tries to load new event data <br />
Then: the app should display a message indicating that new data cannot be loaded while offline

## Feature 5: Add an App Shortcut to the Home Screen
As a user,
I should be able to add an app shortcut to my home screen,
So that I can quickly access the app directly from my device’s home screen.

Given: the user has added the app shortcut to their home screen<br />
When: the user taps the app icon from the home screen<br />
Then: the app should open and behave like a native app without needing to open the browser

## Feature 6: Display Charts Visualizing Event Details
As a user,
I should be able to view charts that visualize event details,
So that I can easily understand data related to events, such as attendee statistics, event popularity, or other metrics.

Given: the user is viewing a chart for an event<br />
When: the user hovers over or clicks on specific parts of the chart (e.g., a bar or point on a graph)<br />
Then: additional detailed data related to that part of the chart should be shown (e.g., exact numbers, dates)

# Technologies Used
- React - Component-based front-end framework.
- Google Calendar API - Integration for event data.
- Serverless Functions - Backend functionality using AWS Lambda.
- Jest & Cucumber - For testing components and features.
- Enzyme - Testing utilities for React.
- CSS - Styling the user interface.
- Service Workers - Enabling offline functionality.
