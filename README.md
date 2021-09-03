# One Team Coding Learning Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Head to [Tutorial](#tutorial) to get the project set up and start working through it.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npx prettier --write .`

Runs prettier on all code.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).


# Tutorial
This project is a short introduction to frontend development in React.
If you have questions, send an email to leadership or attend an office hours.

## Setup
Required Tools:
* Text Editor or IDE
  - If you have experience with web development and have an editor you are comfortable with, use it
* Node.js (version 1.16 or later)
* Git (Github Desktop also works)
* Browser (Chromium and Firefox are what we will focus on)
If you have no experience in web development, go to [IDE Setup](#ide-setup)
  
Optional Tools:
* React Browser Extensions
  - These will make debugging React easier since you will be able to inspect the state of React components

### IDE Setup
If you have no experience with web development, install [Visual Studio Code](https://code.visualstudio.com/).
When it finishes installing, add the following plugins and follow the directions in the description to configure them:
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [Set it as the default formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#default-formatter)
    - [Configure Prettier to run on save](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#format-on-save)
    
### Cloning the Repository
If you are using Git from the command line, follow your normal procedure to clone this repository.
If you are using Github Desktop, go to File > Clone Repository…, and paste the [url](https://github.com/KindaOK/1tc-teaching) of this repository.

### Project Setup
After you have the repository cloned, open a terminal in the cloned directory and run the command `npm install`.
You may now run `npm start` to open the development server.

## Notes App
The objective of this tutorial is for you to make a simple Notes app in React.
This project uses a slightly different technology stack than what we will be using for the semester project: instead of using Typescript, we are using JavaScript, and we are not using Material-UI.
This is to simplify this project and shift the focus to learning frontend web development and React.

If you already have experience with web development, feel free to read the [spec](SPEC.md) and jump straight in.
If you are not comfortable jumping straight in, you can continue the [tutorial](TUTORIAL.md) and start with the code skeleton.
If you get stuck at any point, feel free to consult the complete [code](src/components/Notes) to ensure that you understand the basics of React.
The complete code is fairly bare-bones in terms of CSS styling outside of the layout.
This is because this tutorial was quickly thrown together, and because it is meant more to showcase React 
