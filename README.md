# Events Around You - FrontEnd

Events Around You is a web application that allows users to discover and explore events happening around them or in the places they plan to visit. With a user-friendly interface and powerful search capabilities, users can easily find events based on location, interests, date, and more. Additionally, the application enables users to create and share their own events, fostering a vibrant community of event organizers and attendees.
 <a href="https://github.com/SvyatoslavGabuda/EventsAroudYou"><strong>BackEnd Repository »</strong></a>
 
### I have implemented the following functionalities based on authentication:
- For non-registered users, the possibility to view all "sponsored" events in a specific area, with the option to see more information about the event and its location on the map.
- Registered users can view all sponsored and non-sponsored events and filter them by event type, date, and location. They can view the search results on an interactive map or in a list.
- Registered users can like, comment on, and report events.
- Registered users can create and manage their own events.
- Administrators can view user-reported issues, archive them, view user profiles, and block/unblock or delete inappropriate events.

![image](https://github.com/SvyatoslavGabuda/events-around-you/blob/master/public/assets/mainPageEAY.jpg)

<small>The images used are in the public domain (downloaded from Freepik, Pixabay, and Pexels).</small>

## Technologies Used

The FrontEnd has been developed using TypeScript and React as framework. The main technologies used include:

- React
- TypeScript
- Redux
- React Router DOM
- Bootstrap
- Sass
- Date-fns
- React Icons
- React Toastify
- Redux Persist
- Redux Persist Transform Encrypt

## External API
This project utilizes The Bing Maps V8 Map Control SDK as an external API to implement maps. To use this API, you will need to obtain an API key from Bing Maps. The API key should be added to the application's configuration file or stored securely on the server-side.

Please refer to the Bing Maps documentation for more information on using the Bing Maps V8 Map Control SDK.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
