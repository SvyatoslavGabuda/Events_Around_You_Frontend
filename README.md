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

## External APIs

This project utilizes the following external APIs:

### Bing Maps V8 Map Control SDK


The Bing Maps V8 Map Control SDK is used to implement maps in this project. To use this API, you will need to obtain an API key from Bing Maps.

To configure the API key, follow these steps:

1. Create a new `.env` file in the root directory of the application.
2. Copy the content from the provided `.env.default` file and paste it into the new `.env` file.
3. Obtain an API key from Bing Maps by signing up for an account and creating a new project.
4. Add the obtained API key to the `.env` file as follows:

REACT_APP_BINGMAPS_KEY="your-api-key"

Replace `your-api-key` with the actual API key you obtained from Bing Maps.

Make sure to keep the `.env` file secure and never commit it to a public repository.

Please refer to the [Bing Maps documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/) for more information on using the Bing Maps V8 Map Control SDK.

### Stripe API

The Stripe API is used for payment processing in this project. Stripe provides a secure and reliable platform for handling payments. 
Follow these steps to integrate the Stripe API into this project:

1. Create an account on the Stripe website by visiting stripe.com and signing up. This will provide you with access to the Stripe dashboard and essential features.
2. Once you have created your Stripe account, you need to obtain API keys. These keys serve as the authentication mechanism for your application to communicate securely with the Stripe API.
3. In your project, locate the .env file (if it doesn't exist, create one in the root directory) and update it with the following line:

REACT_APP_STRIPE_KEY="Your-Publishable-key"
Replace "Your-Publishable-key" with the actual publishable key you obtained from Stripe. This key should be the public-facing key and not the secret key.

4. Additionally, for the back end of this application, you need to add the private key to the application.properties file or the appropriate configuration file in your server-side code. This ensures that the back end can securely communicate with the Stripe API using the secret key.

Please refer to the [Stripe documentation](https://stripe.com/docs) for more information on setting up and using the Stripe API for payment processing.



## Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:
   - git clone https://github.com/SvyatoslavGabuda/events-around-you

2. Navigate to the project directory:
   - Use the command line to navigate to the project directory.

3. Install the dependencies using npm:
   - Run `npm install` to install the required dependencies.
 ## Available Scripts
In the project directory, you can run the following scripts:

- npm start: Starts the development server.
- npm build: Builds the app for production.
- npm test: Runs the test suites.
- npm eject: Ejects the app from Create React App.

Please note that you should avoid running the eject script unless you are familiar with the underlying configuration.
## License
This project is licensed under the MIT License. 
