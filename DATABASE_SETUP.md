# Database Setup Instructions

## Option 1: Using Docker (Recommended)

1. Make sure Docker is installed on your system
2. Run the database with:
   ```bash
   npm run db:up
   ```

## Option 2: Using Local PostgreSQL Installation

1. Install PostgreSQL on your system
2. Start the PostgreSQL service
3. Update your `.env` file with the correct connection details:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

## Option 3: Using a Cloud Database (e.g., Supabase, Render, etc.)

1. Create a PostgreSQL database with your preferred cloud provider
2. Update your `.env` file with the connection string provided by your provider

## After Setting Up the Database

1. Run database migrations:
   ```bash
   npm run db:push
   ```

2. Start the application:
   ```bash
   npm run dev
   ```

3. Create your admin user by visiting the sign-up page or using the seed script:
   ```bash
   npm run db:seed-admin
   ```

## Troubleshooting

If you're still having connection issues:

1. Check that your database is running on the specified port
2. Verify your username and password are correct
3. Ensure your firewall isn't blocking the connection
4. Check that your PostgreSQL instance accepts connections