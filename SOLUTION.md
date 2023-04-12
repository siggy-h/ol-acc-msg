## Instructions

1. To install dependencies:
   From the root directory run the command  
   `npm run install` <br>
   This will install in both the /server and /frontend directories

2. To run the app: <br>
   From the root directory run the command  
   `npm run start` <br>
   This will start the GraphQL API server at http://localhost:4000/graphql
   and will also start and open the frontend app in your default browser at http://localhost:3000

---

## Implementation Details

-   The frontend app was bootstrapped with create-react-app using the typescript template.
-   Using Apollo Client & hooks to make requests to the GraphQL server and also handle loading & error messages in the UI.
-   I'm using Tailwind for styling.
-   react-toastify for toast messages (success/error notification when adding a response and note.)
    I chose this because it was quick & had an accessibility setting which triggers a screen reader to announce new toast messages
-   Using react context provider to save the selected interaction id and also a stubbed 'current agent.' (In a real world app, this could come from a logged in sales agent.)
-   The stubbed agent is there to supply an agentId when creating a message/note and also updating the local cache.
    I'm using the agent to determine who sent a message - indicated by different background color on the message and screen reader label
    which indicates who the message is from.
-   The message and note list scrolls if there are a lot of items. This isn't great. It would have been better to set up a pagination component.

### Notes:

-   I made an assumption that it was ok to create a horizontal logo with the logo you provided.
    Typically I'd work with a designer or use a companies provided brand logos (usually they'll have different logo versions & different layouts).
-   The layout is not responsive to different screen sizes right now. I can zoom text to about 150% before the app starts breaking,
    so this would need more work to be production ready.
