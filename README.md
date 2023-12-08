# travelR

Tetris-React web application is my course project for the ReactJS course (October 2023) in SoftUni.

## Project Overview

1. [Introduction](#introduction)
2. [Client](#client)
   - [Game-Keyboard-Controls](#Game-Keyboard-Controls )
   - [Features](#user-features)
   - [Architecture-Overview](#architecture-overview)
3. [Server](#server)
4. [Database](#database)

## Introduction
The main goal of TravelR is to be like a bonfire place where you are welcome to share the magic of your journeys all over the world through the art of photography.

 The application is designed and implemented according to the ReactJS Course project defense assignment at SoftUni.It has public and private parts.

The public part is visible without authentication and includes the home, scoreboard and about pages, as well as login and register forms.

The private part is for registered users and it is accessible only after successful login. It contains the access to the game and the user profile page that holds all user's scores and the functionality to edit the user's info. Logged in users can play, edit and delete their scores and have the options to like the scores.


## Client

The client-side is build with ReactJS and Vite. To test the application, you have to follow these steps:
* Download the repository.
* Run `npm install` in "game" directory to install the required dependencies.
* Run `npm run dev` for the app to start.
* Navigate to `http://localhost:5173/`.

The application will automatically reload if you change any of the source files.
    
### Game-Keyboard-Controls

* Arrow UP : Rotate
* Arrow DOWN : Fast Drop
* Arrow LEFT : Move Left
* Arrow RIGHT : Move Right
* Key Q : Quit Game
* Key P : Pause Game
* Key SPACE : Instant Drop

### Features 
The main feature of the application is the Tetris Game itself. In order to play the game, you must be a logged in user.

* Home page - displays  Play Tetris button and the three highest scores from the database.
* Play Tetris - Logged in users can play the game and after the game is over, a record with the score details is creatrd in the database.
* ScoreBoard page - Catalogue that displays all scores from the database in separate pages.
* About page - Brief documentaton about the application.
* Register / Login pages - shows Register and Login forms.
* Profile page:
    - dispalys the Player info and all player's scores.
    - Edit Profile - Logged in players can edit their user info.
* Score Details page:
    - shows detailed information about the score and is accessible to all visitors.
    - Logged in users can like the score.
    - The creator of the score can edit the score info and delete the score.
* 404 page - Animated page, that pops up when there is no matching route.    


### Architecture-Overview
React JS is a front-end, open-source, and component-based JavaScript library. Web developers use React JS to design and develop modular user interface with components displaying data in real time. 

- The architecture of React JS refers to a set of components employed to develop the user interface of software applications, such as forms, buttons, API services, and more. It enables the reuse of codebase and simplification of maintenance of web applications.
- React allows the web developer to build more components, making code expansion easy and convenient.
- React also enables the maintenance of global state variables using a state management library like Redux.
- The virtual DOM of the React JS architecture is an object-based replication of the actual DOM. Web developers use virtual DOM to enable the actual DOM to execute nominal DOM operations while re-rendering the user interface.
- The component architecture of React JS is a representation of a portion of the UI of a web application. The React component renders the UI and updates it whenever there is a change in the internal state. It also monitors the events related to the web application’s UI.
- The state represents the dynamic values of React JS components at any instant in time. The architecture of React JS provides a simple and user-friendly API for state management of React JS components. Whenever there is a change in the component’s state, the component re-renders itself by invoking the render () function with the changed state.
- The React hook APIs provide an alternative to writing class-based components, and offer an alternative approach to state management and lifecycle methods. Hooks bring to functional components the things developers once were only able to do with classes, like being able to work with React local state, effects and context through useState, useEffect and useContext hooks.

File Structure Overview:

* business folder - Includes the game logic files.
* components folder - Holds all application componens.
    - Auth - Components and logic about user authentication and autorization:
        - Register Component.
        - Login Component.
        - Profile Page Component - dispalys the player info and all player's scores.
        - Edit Profile Component - Logged in players can edit their user info.
    - common - Reusable comonents, needed for different parts of the application:
        - Card Component
        - LoadingSpinner Component
        - Modal Component
        - Pagination Component
    - GameComponents - Components for the game user interface.
    - guards - Route guards.
    - Layout - Includes Header and Footer components.
    - Views - Holds components and logic about the game scores and displaying tha data.
        - About - Brief documentaton about the application.
        - EditScore - Displays the editScore form.
        - Home - displays the three highest scores from the database.
        - NotFound - Animated page, that pops up when there is no matching route.
        - ScoreBoard - Catalogue that displays all scores from the database in separate pages.
        - ScoreDetails - shows detailed information about the score.
* context folder - Includes the contexts of the application:
    - authContext
    - gameContext
* hooks folder - Set of custom hooks used for providing core functionalities across the components.
    - useBoard -
    - useDropTime -
    - useForm - managing the forms and data validation.
    - useGameOver - functionality that manages the game state and calls the apiService to store the game result in the databese, when the game is over.
    - useGameStats - manages the game stats state.
    - useInterval -
    - useLocalStorage - custom hook that stores the token in the browser's local storage.
    - usePlayer -
* services folder - Holds the logic for communicating with the server:
    - apiService - main requester that sends http request to the Rest api.
    - authService - User authentication and autorization requests.
    - gameService - Game scores requests. 


## Server

The server is a RESTful API that is build with Node.js and Express.js. Run `npm install` in the server directory to install the required dependencies and after that run `npm start` to start the server. The server will automatically reload if you change any of the source files.

* Used libraries:
    - `nodemon` - automaticaly restarts the server during development.
    - `bcrypt`, `cookie-parser`, `jsonwebtoken` - for authentication and authorizaton.
    - `express-validator` - for data validation.
    - `moment` for date manipulation.
    - `mongoose` - for easily working with mongoDB.
    - `multer` - middleware for file storing and file uploads.

## Database

MongoDB with Mongoose are used for storing and managing the data.