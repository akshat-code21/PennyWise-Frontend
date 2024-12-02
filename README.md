# PennyWise - Expense Tracking Application

PennyWise is a comprehensive expense tracking application that helps users manage their personal finances effectively. Built with a Node.js backend and EJS frontend templating engine, this application provides an intuitive interface for tracking and managing expenses.

## Features

- 💰 Track daily expenses and income
- 📊 View detailed expense breakdowns
- ✏️ Modify existing expense entries
- 🗑️ Delete unwanted expense records
- 📱 Responsive design for both desktop and mobile use

## Tech Stack

### Backend
- Node.js
- Express.js
- Environment variables (.env) for configuration

### Frontend
- EJS (Embedded JavaScript templating)
- Vanilla JavaScript
- CSS3
- Responsive Design


## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/PennyWise.git
    ```

2. Navigate to the project directory:
    ```bash
    cd PennyWise
    ```
3. Install dependencies for both frontend and backend:
    Install backend dependencies
    ```bash
    cd PennyWise-Backend
    npm install
    ```
    Install frontend dependencies
    ```bash
    cd FRONTEND
    npm install
    ```
4. Configure environment variables:
    - Create a `.env` file in the PennyWise-Backend directory
    - Add necessary environment variables (database connection, ports, etc.)
5. Start the application:
    - Start the backend server
    ```bash
    cd PennyWise-Backend
    npm start
    ```
    - Start the frontend server
    ```bash
    cd FRONTEND
    npm start
    ```

## Usage

1. Access the application through your web browser at `http://localhost:8080`
2. Add new expenses using the "Add Expense" button
3. View detailed expense information by clicking on individual entries
4. Modify or delete expenses as needed
5. Use the dashboard to track your spending patterns

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape PennyWise
- Special thanks to the Node.js and EJS communities for their excellent documentation
