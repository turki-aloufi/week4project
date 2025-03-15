# Full-Stack E-Commerce Application

This is a full-stack e-commerce application built with Angular (frontend) and .NET Core (backend). It features two microservices: `ProductMicroService` for managing products and `OrderMicroService` for managing orders. The frontend uses NgRx for state management and Bootstrap for styling, providing a responsive UI to interact with the backend APIs.

## Features

- **Product Management**:
  - View all products
  - Add new products
  - Update existing products
  - Delete products
- **Order Management**:
  - View all orders
  - Add new orders with multiple products
  - Update existing orders
  - Delete orders
- **Navigation**: Responsive navbar to switch between Products and Orders pages
- **State Management**: NgRx for reactive state updates
- **Styling**: Bootstrap for a clean, responsive design

## Tech Stack

- **Frontend**:
  - Angular 19 (Standalone Components)
  - NgRx (State Management)
  - Bootstrap 5 (Styling)
  - TypeScript
- **Backend**:
  - .NET Core 8 (ASP.NET Core Web API)
  - Entity Framework Core (Database Access)
  - SQL Server (Database)
- **Tools**:
  - npm (Frontend Package Manager)
  - .NET CLI (Backend Builds)

## Project Structure

```
e-commerce-fullstack/
├── frontend/                    # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── navbar/      # Navbar component
│   │   │   │   ├── product/     # Product component
│   │   │   │   ├── order/       # Order component
│   │   │   ├── services/        # API services
│   │   │   ├── state/           # NgRx state management
│   │   │   ├── app.component.ts # Root component
│   │   │   └── app.routes.ts    # Routing configuration
│   │   ├── assets/              # Static assets
│   │   └── index.html           # Main HTML file
│   ├── angular.json             # Angular config
│   └── package.json             # Frontend dependencies
├── ProductMicroService/         # Product backend API
│   ├── Controllers/
│   │   └── ProductController.cs # Product endpoints
│   ├── Models/                  # Data models (Product, ProductDto)
│   ├── Data/                    # EF Core DbContext
│   └── Program.cs               # Entry point
├── OrderMicroService/           # Order backend API
│   ├── Controllers/
│   │   └── OrderController.cs   # Order endpoints
│   ├── Models/                  # Data models (Order, OrderProduct, etc.)
│   ├── Data/                    # EF Core DbContext
│   └── Program.cs               # Entry point
└── README.md                    # This file
```

## Prerequisites

- **Node.js**: v18.x or later
- **npm**: v9.x or later
- **.NET SDK**: 8.0 or later
- **SQL Server**: Used as the default database (or configure another DB)

## Setup Instructions

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd e-commerce-fullstack
   ```

2. **ProductMicroService**:
   - Navigate to the directory:
     ```bash
     cd ProductMicroService
     ```
   - Restore dependencies:
     ```bash
     dotnet restore
     ```
   - Update `appsettings.json` (if needed) for database connection:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Data Source=products.db"
       }
     }
     ```
   - Run the service:
     ```bash
     dotnet run --launch-profile https
     ```
   - API will be available at `https://localhost:5113/api/Product`.

3. **OrderMicroService**:
   - Navigate to the directory:
     ```bash
     cd ../OrderMicroService
     ```
   - Restore dependencies:
     ```bash
     dotnet restore
     ```
   - Update `appsettings.json` (if needed):
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Data Source=orders.db"
       }
     }
     ```
   - Run the service:
     ```bash
     dotnet run --launch-profile https
     ```
   - API will be available at `https://localhost:7160/api/Order`.

### Frontend Setup

1. **Navigate to Frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure API URLs**:
   - Update `product.service.ts` and `order.service.ts` with the correct backend URLs:
     ```typescript
     private apiUrl = 'https://localhost:5113/api/Product'; // ProductService
     private apiUrl = 'https://localhost:7160/api/Order';  // OrderService
     ```

4. **Run the Application**:
   ```bash
   ng serve
   ```
   - Open `http://localhost:4200` in your browser (defaults to `/products`).

## Usage

1. **Products Page** (`/products`):
   - View the list of products.
   - Click "Add New Product" to create a product.
   - Edit or delete existing products via buttons.

2. **Orders Page** (`/orders`):
   - View the list of orders with products and total prices.
   - Click "Add New Order" to create an order with multiple products.
   - Edit or delete existing orders.

3. **Navigation**:
   - Use the navbar to switch between "Products" and "Orders".

## Contributing

Feel free to submit issues or pull requests to improve the project!

## License

This project is licensed under the MIT License.

