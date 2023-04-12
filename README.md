Paper Sales Company Customer Interaction App
============================================

The task for this homework assignment is to complete writing an accessible web app for *Paper Sales Company*. This web app will
allow PSC sales agents to complete interactions with their customers.

The way that PSC represents their customer communications is through abstract models. The models they use are:
* *Customer*:  A customer represents a PSC customer. The model holds the name and email of the customer
* *Agent*: This represents one of the company's sales agent. This model holds the name and email of the agent.
* *Message*: A single, unidirectional message either from an agent to a customer, or from a customer to an agent. It holds a message id, the content of the message and an agent (if the agent is null here, then this means this message came from a customer).
* *Interactions*:  An interaction between a customer and one or many agents. They contain:
  * A customerId, which references which customer this interaction belongs to
  * A collection of messages
  * A collection of notes
* *Note*: It represents a note about the interaction they belong to. A note contains content and the id of the agent who authored the note.

You are provided with the express server api in [server.js](server.js) to access the model. Within this server, you will find the dictionary variable `data` which contains the current state of the app. Be sure to inspect it and see how it implements the models described above through a GraphQL interface.
Your task is to consume the GrapqhQL API provided on [server.js](server.js) to implement this frontend.
![](PaperSalesCompanyMockup.png)

The requirements are:
* Write the frontend application using React.
* Make sure it is accessible
* You must consume the API provided by the server on `server.js`
* Make sure the included "logo.jpg" is shown somewhere on the app
* Make sure that the buttons "Respond to customer" and "Add Note" are functional. If there are missing GraphQL methods on `server.js` to provide that functionality, you must implement them.
* If you have any questions, feel free to make assumptions about what you think is the best decision and state them on your SOLUTION.md file.
* Make sure to have fun while working on this! :)

Deliverables:
1. A runnable app using node stable, Preferably with a docker image to ensure portability.
2. SOLUTION.md - where you outline the approach you took with your implementation and instructions on how to run your program. 
3. ACCESSIBILITY.md - where you provide an explanation about accessibility on your app.

Your submission should be submitted to this repository, feel free to create the subdirectories that you need.

