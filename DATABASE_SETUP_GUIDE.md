# Database Setup Guide for Your Portfolio Application

## Option 1: Install PostgreSQL Locally (Recommended for Windows)

### Step 1: Download and Install PostgreSQL

1. Go to the official PostgreSQL website: https://www.postgresql.org/download/windows/
2. Download the Windows installer
3. Run the installer and follow these settings:
   - **Installation Directory**: Keep the default (e.g., `C:\Program Files\PostgreSQL\16`)
   - **Data Directory**: Keep the default
   - **Password**: Set a strong password (remember this for later)
   - **Port**: Keep default (5432)
   - **Locale**: [Default locale]

### Step 2: Configure Environment Variables

1. Add PostgreSQL to your PATH:
   - Open System Properties → Advanced → Environment Variables
   - In System Variables, find and select "Path", then click "Edit"
   - Add the PostgreSQL bin directory: `C:\Program Files\PostgreSQL\16\bin`
   - Click OK to save

### Step 3: Update Your .env File

Change your `.env` file to use the correct port and credentials:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/postgres
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YOUR_PASSWORD

# Authentication
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

### Step 4: Start PostgreSQL Service

1. Open Services (services.msc)
2. Find "postgresql-x64-16" (or similar)
3. Right-click and select "Start"
4. Set Startup type to "Automatic" to start automatically

### Step 5: Initialize Database

1. Open Command Prompt or PowerShell as Administrator
2. Run the database schema push:
   ```bash
   npm run db:push
   ```

## Option 2: Use Docker (If You Prefer Containerization)

### Step 1: Install Docker Desktop

1. Download Docker Desktop for Windows: https://www.docker.com/products/docker-desktop/
2. Install Docker Desktop
3. Restart your computer after installation

### Step 2: Start the Database with Docker

```bash
npm run db:up
```

This will start PostgreSQL in a Docker container with the default configuration.

### Step 3: Push Database Schema

```bash
npm run db:push
```

## Option 3: Use a Cloud Database (Supabase - Free Tier Available)

### Step 1: Create a Supabase Account

1. Go to https://supabase.com/
2. Sign up for a free account
3. Create a new project

### Step 2: Get Connection Details

1. In your Supabase project dashboard, go to "Settings" → "Database"
2. Copy the connection string

### Step 3: Update Your .env File

```env
# Database Configuration
DATABASE_URL=your_supabase_connection_string_here
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_supabase_password

# Authentication
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## Verifying Your Database Connection

After setting up any of the above options, test your connection:

### 1. Test Database Connection
```bash
npm run db:test
```

### 2. Push Database Schema
```bash
npm run db:push
```

### 3. Start Your Application
```bash
npm run dev
```

## Common Issues and Solutions

### Issue: "ECONNREFUSED" Error
**Cause**: Database is not running
**Solution**: 
- For local PostgreSQL: Start the PostgreSQL service
- For Docker: Run `npm run db:up`
- For cloud: Check your connection string

### Issue: "Authentication failed"
**Cause**: Wrong username or password
**Solution**: Verify your credentials in the .env file match your database setup

### Issue: "Database does not exist"
**Cause**: Database hasn't been created yet
**Solution**: Run `npm run db:push` to create the database schema

## Creating Your Admin User

After setting up the database, create your admin user:

1. Start your application:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/sign-up in your browser

3. Create an account with:
   - Email: ngnawfal@example.com
   - Password: kaysan123

Or use the seed script:
```bash
npm run db:seed-admin
```

## Troubleshooting Checklist

- [ ] PostgreSQL is installed and running
- [ ] Database credentials in .env are correct
- [ ] Port 5432 (or 5433) is not blocked by firewall
- [ ] Database schema has been pushed
- [ ] Application can connect to the database

If you continue to have issues, please share:
1. The exact error message
2. Which setup option you chose
3. Your operating system details