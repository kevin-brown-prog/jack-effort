# My Node Ionic App

This project is a simple Node.js server that serves a static page built with the Ionic framework, designed to be mobile-friendly.

## Project Structure

```
my-node-ionic-app
├── public
│   ├── index.html        # Main HTML file
│   ├── css
│   │   └── styles.css    # Custom styles for the Ionic components
│   └── js
│       └── app.js        # JavaScript code for the static page
├── src
│   └── server.js         # Entry point for the Node.js server
├── package.json          # npm configuration file
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-node-ionic-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Server

To start the Node.js server, run the following command:

```
node src/server.js
```

The server will start and serve the static files from the `public` directory.

### Accessing the Application

Open your web browser and navigate to `http://localhost:3000` to view the mobile-friendly website.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.