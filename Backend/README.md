# Campus Job Backend

This project is a backend application for managing campus job functionalities, built using TypeScript and Express. It provides authentication features, including user login and registration.

## Project Structure

```
campusjob-backend
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── controllers             # Contains controllers for handling requests
│   │   └── authController.ts   # Authentication controller
│   ├── routes                  # Defines application routes
│   │   └── authRoutes.ts       # Authentication routes
│   ├── services                # Contains business logic
│   │   └── authService.ts      # Authentication service
│   ├── models                  # Data models
│   │   └── userModel.ts        # User model
│   └── config                  # Configuration files
│       └── dbConfig.ts         # Database configuration
├── package.json                # NPM package configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd campusjob-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000` (or the port specified in your configuration).

## API Endpoints

- **POST /login**: Authenticate a user with username and password.
- **POST /register**: Register a new user.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.