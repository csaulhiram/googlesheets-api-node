const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Run Middlewares
        this.middlewares();
        // Run Routes
        this.routes();
    }

    // Middlwares

    middlewares() {
        // Cors
        this.app.use(cors());
        // Static Files
        this.app.use(express.static('public'));
    }

    // Routes
    routes() {
        // Routes list
        this.app.use(require('../routes/routes'));
    }

    // Listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server in port: ${this.port}`);
        });
    }
}


module.exports = Server;