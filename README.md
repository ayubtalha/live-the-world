# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Runs the app in the development mode.

The page will install all the relevant packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Assumptions

- In the wireframe, it is mentioned that the 'current activity's marker should be different from the one's in the nearby carousel'. I didn't find any nearby markers in API so I just went with the current activity marker. Also, the implementation would be a one-liner just map all the markers with Marker Tag (for ref please check the MAPBOX section in LTWActivity.js).

- I have shown the Modal of Login on Top of the Activity Page but I really don't know whether the background should be blurred or not so I went without this blur Activity Page. Now you would only see the Login Page. To verify I am showing the Modal on top of the Activity Page just open the Network tabs you will see all the API's are hit which are required for the Activity Page.

- At the Nearby activities in Readmore I didn't know whether the page should be rendered on the same page or a new tab so I went with the new tab.

- You may find different carousels for the Activity and NearBy activity. As you mentioned in the assignment I may go/choose the UX so I went with two different approaches but I did some research most of the places/websites are using the same carousel as of Avtivity which I am using so I went with it. But on the other hand, it is quite easy if we want to make each one's same.

- Nearby Activities are on the left side and take up a half portion of the screen in wireframe. I did check/try it, it was not matching with the upper content so I changed it to cover full width.

- You may see that the Save button in the Activity carousel is not looking fine. My first priority was to make sure everything is working fine end-to-end then improve the UI/UX. So if you don't find anything good looking it can be improved as it is the UI/UX but the functionality is 100% as you have written in the assignment.

- It was not mentioned which page should be shown as soon as the User logged in so I have made the `castle-of-gerald-the-devil` as the landing page once the user logged in.

### Nice To Have Features

- Logout feature. This is not mentioned in the assignment. I have added the Logout mechanism along with that all the routes are protected meaning that if a user is not logged in he won't be able to have a look at it. Secondly once the user logs out jwt would be erased from the browser.

- I have added comments at each place so you have a better understanding of the code. As per experience it really eases the functionality understanding.

- Folder structure is quite easy to understand.
  - Components [Has all the React Components]
  - Constants [Has all the constants functions, variables or API End Points]
  - Pages [All the Pages Login, SignUp, NotFound and many alike these fall under this]
  - Routes [Has all the routes. One main purpose was it might happen that the application is extended to further two threads so each application would have different routes]
  - Services [All the API services]
  - Utils [Contains the utility functions]

### Things which I personally think can further be improved

- As you can see I have used one component for the LTWActivity. it can further be broken down into multiple child components for better code understanding.

- I have used multiple states and they can be reduced. I used a new state for each one i.e lat, lng just for ease but they and some others can be further merged and it will improve the code performance while it may affect the code readability.

- All the tokens should be moved into .env and they should be fetched from there. Currently, I have placed it directly for MapBox due to time constraints.

- Lastly, Apart from that I don't see any margin for improvement. Please do share your opinions if you think there is anything that can be improved.
