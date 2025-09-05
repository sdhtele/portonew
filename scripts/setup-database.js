#!/usr/bin/env node

// Database Setup Assistant
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("🚀 Portfolio Database Setup Assistant");
console.log("=====================================\n");

// Check if we're on Windows
const isWindows = process.platform === 'win32';

// Function to check if Docker is installed
function checkDocker() {
  try {
    execSync('docker --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check if PostgreSQL is installed
function checkPostgreSQL() {
  try {
    execSync('psql --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check if a service is running (Windows only)
function checkServiceStatus(serviceName) {
  if (!isWindows) return false;
  
  try {
    const result = execSync(`sc query "${serviceName}"`, { stdio: 'pipe' });
    return result.toString().includes('RUNNING');
  } catch (error) {
    return false;
  }
}

// Function to start a service (Windows only)
function startService(serviceName) {
  if (!isWindows) return false;
  
  try {
    execSync(`net start "${serviceName}"`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Main setup function
async function setupDatabase() {
  console.log("🔍 Checking your system...\n");
  
  const hasDocker = checkDocker();
  const hasPostgreSQL = checkPostgreSQL();
  const postgresServiceRunning = checkServiceStatus('postgresql-x64-16') || checkServiceStatus('postgresql');
  
  console.log(`Docker installed: ${hasDocker ? '✅' : '❌'}`);
  console.log(`PostgreSQL installed: ${hasPostgreSQL ? '✅' : '❌'}`);
  if (hasPostgreSQL) {
    console.log(`PostgreSQL service running: ${postgresServiceRunning ? '✅' : '❌'}`);
  }
  console.log('');
  
  // If Docker is available, use it
  if (hasDocker) {
    console.log("🐳 Docker detected! Setting up database with Docker...\n");
    try {
      console.log("📦 Starting PostgreSQL container...");
      execSync('npm run db:up', { stdio: 'inherit' });
      console.log("✅ PostgreSQL container started successfully!\n");
      
      console.log("📊 Pushing database schema...");
      execSync('npm run db:push', { stdio: 'inherit' });
      console.log("✅ Database schema pushed successfully!\n");
      
      console.log("🎉 Database setup complete with Docker!");
      console.log("📝 Next steps:");
      console.log("   1. Run 'npm run dev' to start your application");
      console.log("   2. Visit http://localhost:3000/sign-up to create your admin user");
      console.log("   3. Use email: ngnawfal@example.com and password: kaysan123");
      return;
    } catch (error) {
      console.log("❌ Docker setup failed:", error.message);
    }
  }
  
  // If PostgreSQL is installed, use it
  if (hasPostgreSQL) {
    console.log("🐘 PostgreSQL detected! Setting up local database...\n");
    
    // Start PostgreSQL service if it's not running
    if (!postgresServiceRunning) {
      console.log("🔌 Starting PostgreSQL service...");
      const started = startService('postgresql-x64-16') || startService('postgresql');
      if (started) {
        console.log("✅ PostgreSQL service started successfully!\n");
      } else {
        console.log("⚠️  Could not start PostgreSQL service automatically.");
        console.log("   Please start it manually through Services (services.msc)\n");
      }
    }
    
    try {
      console.log("📊 Pushing database schema...");
      execSync('npm run db:push', { stdio: 'inherit' });
      console.log("✅ Database schema pushed successfully!\n");
      
      console.log("🎉 Database setup complete with local PostgreSQL!");
      console.log("📝 Next steps:");
      console.log("   1. Run 'npm run dev' to start your application");
      console.log("   2. Visit http://localhost:3000/sign-up to create your admin user");
      console.log("   3. Use email: ngnawfal@example.com and password: kaysan123");
      return;
    } catch (error) {
      console.log("❌ Local PostgreSQL setup failed:", error.message);
    }
  }
  
  // If neither is available, provide instructions
  console.log("📋 No database system detected. Please choose one of the following options:\n");
  
  console.log("Option 1: Install Docker Desktop");
  console.log("   🌐 Download: https://www.docker.com/products/docker-desktop/");
  console.log("   📦 Then run: npm run db:up && npm run db:push\n");
  
  console.log("Option 2: Install PostgreSQL");
  console.log("   🌐 Download: https://www.postgresql.org/download/windows/");
  console.log("   📦 Then run: npm run db:push\n");
  
  console.log("Option 3: Use a cloud database (Supabase)");
  console.log("   🌐 Sign up: https://supabase.com/");
  console.log("   📝 Update your .env file with the connection string\n");
  
  console.log("📖 For detailed instructions, see DATABASE_SETUP_GUIDE.md");
}

// Run the setup
setupDatabase().catch(console.error);