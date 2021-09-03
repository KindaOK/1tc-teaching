# Notes App

The objective of this project is to build a basic note-taking web application that allows the user to create timestamped
notes, remove them, and save them when the page closes and reload them when the page is next opened.

## General Information

Before starting this tutorial, skim the [spec](SPEC.md) to get an idea of what this project is asking. If you have never
done any web-related development before, you should also first go through
the [MDN HTML Tutorial](https://developer.mozilla.org/en-US/docs/Learn/HTML) and
the [MDN JavaScript Tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps).
The [CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) is also useful, but should not be
your primary concern.

This tutorial does assume that you have basic knowledge of JavaScript and of HTML, so be sure to check the tutorials if
you find yourself getting lost in either of those.

## Setup
To switch between the completed Notes app and the tutorial version, go to [App.js](src/App.js) and comment out `<Notes />` and uncomment `<NoteManagerSkeleton />`.

## Components

At its core, this application uses [React components](https://reactjs.org/docs/components-and-props.html). A component
is a special kind of function that returns HTML. To generate the HTML code, we use a special syntax. The following code
features the `HelloUser` component, which takes a parameter called `name` and renders it next to the string `Hello`.

```jsx
function HelloUser(props) {
    const message = "I hope you are having a good day!"
    return (
        <p>
            Hello {props.name}! {message}
        </p>
    )
}
```

The function can be used in the matter below

```jsx
<HelloUser name={"John Cena"}/>
```

And will be turned into the following html on render.

```html
<p>Hello John Cena! I hope you are having a good day</p>
```

Each time the components are rendered (the function is called), the output is returned and then rendered in the browser.
The skeletons of the components we will be writing can be found [here](src/components/NotesManagerSkeleton).

## Storing Notes

The first thing this application has to be able to do is store the notes the user adds. To accomplish this, we will be
using the [`useState`](https://reactjs.org/docs/hooks-state.html) hook. This hook allows us to save information between
component renders. To use this hook, we use the code below.

```jsx
const [notes, setNotes] = useState([
    {title: "My First Note", body: "Hello, World!", dateCreated: new Date()},
]);
```

The array(`[...]`) of objects(`{...}`) in the function call is the default value of the notes, which means that the
first time this component is rendered, the value of `notes` will be set to it. The first variable set as a result of the
hook, `notes`, is immutable, meaning it will not change during this render cycle (function call). To change the value,
you have to use the `setNotes` function. Adding a note, for example, can be done the following way.

```jsx
setNotes([...notes, {title: "New Note", body: "I added another note", dateCreated: new Date()}]);
```

This uses the spread (`...`) operator to copy all of the old notes into a new array, and then adds the new note at the
end.

## Rendering Notes

Now that we can store and modify the notes in the application, let's render them. We will be rendering individual notes
using the [NoteSkeleton](src/components/NotesManagerSkeleton/NoteSkeleton/NoteSkeleton.js) component. Add the following
code to the return statement of [NoteManagerSkeleton](src/components/NotesManagerSkeleton/NoteManagerSkeleton.js) inside
of the `<div className="Notes">` tag.

```jsx
{
    notes.map((note) => (
        <NoteSkeleton
            note={note}
            key={note.dateCreated}
        />
    ))
}
```

This code iterates over each `note` in `notes` and renders a new `Note` component. The code also passes in the
information in the note as a parameter. The `key` parameter is a special field that helps React know when a component
needs to be re-rendered. Generally, this should be something that is unique for each item in the list.

Now we can go to the [NoteSkeleton](src/components/NotesManagerSkeleton/NoteSkeleton/NoteSkeleton.js) component and make
it render the note. Use your knowledge so far to create the HTML template for the Note. If you are familiar with CSS,
this is a good time to use it. If you are struggling, you can simply copy-paste the jsx and CSS from the
completed [Note](src/components/Notes/Note/Note.js).

## Removing Notes

Now we want to remove notes. We have a problem though: since the Note does not have access to the setNote function, it
cannot change the `notes` variable. To resolve this, we can pass in a function into the Note component that handles the
deletion of the note. First we need to create a helper function in the NotesManager Component

```jsx
const removeNote = (index) =>
    // keep all notes whose index does not match the target index
    setNotes(notes.filter((_, i) => index !== i));
```

This function removes the note at the given index from the `notes` array. To give this function to the Note, we will
need to wrap it first though. This prevents the function from running immediately when we pass it in, meaning that the
Note can call the function when it deems fit.

```jsx
<NoteSkeleton
    note={note}
    deleteFunction={() => removeNote(i)}
    key={note.dateCreated}
/>
```

Now inside of the Note's template, we can add a button that calls the function, deleting the entry from the `notes`
variable in the NoteManager.

```jsx
<button onClick={props.deleteFunction}>Remove</button>
```

## Adding Notes

Next, we need a way to add more notes. We will be doing so using `input` html elements. There are two main ways to
configure inputs: one is controlled, and the other is uncontrolled. Controlled inputs have their values manually
determined using JavaScript by intercepting all interaction the user has with them. Uncontrolled inputs allow the user
to freely interact with them and can have their values queried when the programmer sees fit. We will use controlled
inputs so we can keep the application state and input state tightly synced.

First, add two input elements and a button under the `<div className="inputs">` tag. Label them as per the spec. Now add
another `useState` hook called `newNote` for managing the state of those inputs. Next, create a helper method to add
the `newNote` to the existing `notes` with the current date and time. This method should also clear the values of the
input fields.

```jsx
 const addNote = () => {
    // ... TODO: add the `newNote` to `notes`
    setNewNote({
        title: "",
        body: "",
        dateCreated: new Date(), // create a Date object with the current date and time
    });
};
```

To bind the button to this, pass in this function to the `onClick` property of the button. To control the inputs
with `newNote`, set the `value` property to the respective property of `newNote`, and bind the `onChange` property as
shown below.

```jsx
<input
    // ... TODO: bind the value here
    onChange={(event) =>
        setNewNote({...newNote, body: event.target.value})
    }
/>
```

The current value in the input field after the user interacts with can be found in `event.target.value`. We use the
object spread syntax then to only change the `body` property of `newNote` when the user inputs a value.

With this, you can now add new notes

## Saving and Loading Notes

At this point, the user can add and remove notes. If they refresh the page, however, all of their hard work is gone
forever. With the [`useEffect`](https://reactjs.org/docs/hooks-effect.html) hook, we can both save the notes locally any
time they change, and load them when the user reopens the page.

### Saving

First we will add an autosave. The `useEffect` hook takes a function and an array of dependencies, and then runs the
function any time the dependencies change. Thus, anything in the below hook will be run any time the `notes` variable
changes, whether its via a note being added or removed.

```jsx
useEffect(() => {
    console.log("notes was changed");
}, [notes])
```

We can take advantage of this behavior to save to localStorage every time `notes` updates. Adding the below segment of
code will save the current value of `notes` to the `notes` key in local storage.

```jsx
localStorage.setItem("notes", JSON.stringify(notes));
```

### Loading

Lastly, we need to load the saved notes any time the user opens this page. When no dependencies are added to `useEffect`
, it will only run on the first render of the component.

```jsx
useEffect(() => {
    console.log("I only run once!")
}, [])
```

When we start loading, we first need to check if there even are notes to load. We can do this using
the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
, which returns the right-side value if the left-sided one is `null` or `undefined`.

```jsx
const loadedNotes = localStorage.getItem("notes");
const savedNotes = JSON.parse(loadedNotes ?? "[]");
```

Next we need to convert all of the timestamp strings back into Date objects. We use a `forEach` because we want to
modify each of the entries.

```jsx
savedNotes.forEach(
    (note) => (note.dateCreated = new Date(note.dateCreated))
);
```

Lastly, we only want to load the notes if there are some to load.

```jsx
if (savedNotes?.length) {
    setNotes(savedNotes);
}
```

After adding all of this code, test it by adding a few notes, closing the page, then opening it again to see the same
notes you had earlier.

### Next Steps

If you still have time after completing this tutorial, feel free to continue adding features to it. Some possibilities
are making notes editable, scheduling notes and adding notifications when a time on a note has come to pass, or saving
the notes to a backend or IndexedDB. Hopefully you will have a better grasp of frontend development and can hit the
ground running once we begin meeting to work on the project.

