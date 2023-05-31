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


## Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation
1. Clone the repository:

```shell
git clone https://github.com/SvyatoslavGabuda/events-around-you ```

