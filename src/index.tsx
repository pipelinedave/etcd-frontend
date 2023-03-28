import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App.tsx';

const app = express();

// Serve static files
app.use(express.static('public'));

// Handle all other routes with server-side rendering
app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  res.send(`
    <html>
      <head>
        <title>Etcd Frontend</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="main.bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
