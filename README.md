# Polymath AI
## _Next.js Programming Task_


## Tasks are performed 

- Ask the user to login (enable login with gmail through Firebase)
- Make a call to any public/free APIs to fetch some data
- Display this data on the screen
- Add a button to save the data
- On click, store the data in a Firebase table


## Tech Used

-  Next.js
-  Firebase database in the backend
-  Tailwind CSS for styling


## Installation

This requires [Node.js](https://nodejs.org/) v14+ to run.

Clone this Github repo

Install the dependencies and the start server.

```sh
cd ploymath_task
npm i
npm run dev
```

After Compiled the code you can open your favorite web browser to see the results
``` http://localhost:3000```

## Working

This task demonstrates Gmail login integration using Firebase authentication in a Nextjs application. The login functionality allows users to sign in using their Gmail accounts.

The process begins with initializing Firebase in the application by providing the Firebase configuration object. The Gmail login is handled using the Firebase authentication API. When the "Sign in with Google" button is clicked, a pop-up window is displayed, allowing users to authenticate themselves with their Gmail accounts. Once the authentication is successful, the user object is logged to the Home.

To ensure a seamless user experience, an authentication state listener is set up using the onAuthStateChanged method. This listener checks if the user is already signed in when the component mounts. If a user is detected, their details are logged to the Home, indicating that the user is already signed in.

Additionally, this task showcases the ability to store quotes in Firestore, a NoSQL cloud database provided by Firebase. After logging in, users can view a random quote fetched from an external free/public API. They also have the option to store the quote in Firestore by clicking the "Store Quote" button. The quote, along with the user's ID and the current timestamp, is saved in a separate collection called "quotes".

To retrieve the stored quotes, a separate page called "Saved" fetches the quotes associated with the current user from Firestore and displays them on the page.

Overall, this task demonstrates the seamless integration of Gmail login using Firebase authentication in Nextjs and the capability to store and retrieve data in Firestore. It provides a solid foundation for incorporating user authentication and database operations in a Nextjs application.