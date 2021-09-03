# Notes App
The objective of this project is to build a basic note-taking web application that allows the user to create timestamped notes, remove them, and save them when the page closes and reload them when the page is next opened.

## General Information
If you are not confident in creating all the components, use the skeleton to help structure your code. Otherwise, feel free to start from scratch.
The primary focus of this project is HTML and JavaScript. CSS is definitely a good thing to practice as well, but since it carries less weight in the interactivity and structure of the app, we will be discounting it a little.
Lastly, you may not add additional dependencies unless you wish to expand upon the base project. This is meant to be a learning tool, and adding additional dependencies to avoid writing code is not good practice

## Creating Notes
At the top of the page, there should two text fields, one labeled "Title", and the other labeled "Body".
At the top right, there should be a button labeled "Add Note". The button should only be clickable when at least one of the fields contains text.
When the "Add Note" Button is clicked, a new note should be added at the top of the note list with the respective "Title" and "Body" and the date and time of creation between them.

## Displaying Notes
Each individual Note should be a React component. It should have the Note "Title" at the top, with the date and time of creation below it, and then the "Body" text below those two.
Additionally, each note should have a delete button that removes it from the collection without modifying any other notes or their relative order. 
Notes should be ordered from newest to oldest.

## Saving Notes
Any time the user adds or removes a note, the application should detect it and save the notes locally. Ideally this should be done using IndexedDB. Because IndexedDB is quite tricky though, feel free to use localStorage as I did.
If the page is closed at any time and opened later, the notes should be reloaded and appear the same way they did before the page closed. 
