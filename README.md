# Etcd Frontend
## Overview
Etcd is a distributed key-value store that is often used for service discovery, configuration management, and coordination in distributed systems. It provides a simple, reliable way to store and retrieve data across a cluster of machines.

This project is a modern web frontend for Etcd, built with React and TypeScript. It allows you to create, list, and delete key-value pairs in an Etcd cluster. The frontend communicates with Etcd through a REST API provided by the etcd server.

## Features
The Etcd Frontend provides a simple user interface for interacting with an Etcd cluster. The user-facing functionality can be broken down into three main areas: listing, creating, and deleting key-value pairs.

Listing Key-Value Pairs
When the frontend first loads, it retrieves all of the key-value pairs in the Etcd cluster and displays them in a table. The table shows the key and value for each pair, as well as buttons for editing and deleting each pair.

The frontend also listens for changes to the key-value store and updates the table in real-time as changes are made. This allows the user to see updates to the data as they occur.

Creating Key-Value Pairs
To create a new key-value pair, the user can click the "New" button at the top of the page. This opens a modal dialog where the user can enter the key and value for the new pair.

Once the user has entered the key and value, they can click the "Save" button to add the new pair to the Etcd cluster. The frontend then updates the table to include the new pair.

Deleting Key-Value Pairs
To delete a key-value pair, the user can click the "Delete" button next to the pair in the table. This removes the pair from the Etcd cluster and updates the table to reflect the change.

The frontend also listens for changes to the key-value store and updates the table in real-time as changes are made. This allows the user to see updates to the data as they occur.

In addition to these main areas of functionality, the frontend also includes a search bar that allows the user to filter the key-value pairs based on the key or value. This makes it easier to find specific pairs in a large dataset.

Overall, the Etcd Frontend provides a simple, intuitive interface for interacting with an Etcd cluster, making it easier for developers and system administrators to manage their distributed systems.

## Getting Started
To get started with the project, follow these steps:

Clone the repository:

`git clone https://github.com/your-username/etcd-frontend.git`

`cd etcd-frontend`

Install the dependencies:

`npm install`

Start the development server:

`npm start`

Open your web browser and go to http://localhost:3000 to view the app.

## Building for Production
To build the app for production, run:

`npm run build`

This will create a production-ready build of the app in the dist directory.

## Running in Docker
You can also run the app in Docker using the included Dockerfile. To build the Docker image, run:

`docker build -t etcd-frontend .`

To run the Docker container, run:

`docker run -p 3000:3000 etcd-frontend`

This will start the app in a Docker container and map port 3000 to the host machine.

## Testing
To run the unit tests, run:

`npm test`

This will run all of the unit tests in the __tests__ directory.

## Technical Background
Etcd uses a distributed consensus algorithm called the Raft consensus algorithm to maintain consistency across the cluster. Each node in the cluster maintains a copy of the same data, and updates are propagated through the cluster using Raft.

The etcd server provides a simple REST API that can be used to interact with the key-value store. The API supports operations such as get, put, and delete, as well as watch operations that allow clients to receive notifications when changes are made to the data.

Our frontend uses the axios library to make HTTP requests to the etcd server's REST API. When the frontend first loads, it makes a GET request to the /v3/kv/range endpoint to retrieve all of the key-value pairs in the store. It then uses an EventSource object to listen for changes to the data by making a GET request to the /v3/watch endpoint.

When a change is made to the data in the etcd store, the etcd server sends a message to the EventSource, which triggers a callback function in our frontend. The callback function updates the data in the frontend to reflect the changes made to the etcd store.

## File Structure
etcd-frontend/
├── __tests__/
│   └── index.test.tsx
├── node_modules/
├── public/
│   ├── index.html
│   └── logo.svg
├── src/
│   ├── components/
│   │   └── App.tsx
│   ├── server.ts
│   └── index.tsx
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md

- __tests__/index.test.tsx: Unit tests for the handleDelete() function in src/components/App.tsx.
- node_modules/: Third-party packages installed by npm.
- public/index.html: The HTML file that is served by the web server.
- src/components/App.tsx: The main React component for the app, which handles interactions with the etcd server and updates the UI in response to changes in the data.
- src/server.ts: A simple server that serves the built frontend files and provides a REST API for accessing the etcd server.
- src/index.tsx: The entry point for the app, which renders the App component and mounts it to the DOM.
- package.json: Configuration file for npm, including dependencies and build scripts.
- tsconfig.json: Configuration file for TypeScript.
- webpack.config.js: Configuration file for webpack, which is used to build the frontend files.