// Import the 'winston' module for logging functionality.
const winston = require('winston');

// Create a logger instance using Winston.
const logger = winston.createLogger({
    // Set the logging level to 'info'.
    level: 'info',

    // Define the log format with a timestamp and a simple message.
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),

    // Specify the transports (output destinations) for the logs.
    transports: [
        // Log to the console for 'info' level and above.
        new winston.transports.Console(),

        // Log errors to a file named 'error.log'.
        new winston.transports.File({ filename: 'error.log', level: 'error' }),

        // Log all levels to a combined file named 'combined.log'.
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Export the logger instance for use in other modules.
module.exports = logger;
