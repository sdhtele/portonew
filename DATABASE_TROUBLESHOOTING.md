# Database Troubleshooting Guide

## Common Error Messages and Solutions

### 1. "connect ECONNREFUSED" Error

**Error Message:**
```
[Error: Failed query: select ...] {
  [cause]: [AggregateError: ] { code: 'ECONNREFUSED' }
}
```

**What it means:** Your application cannot connect to the database server.

**Solutions:**

#### For Docker Setup:
1. **Start the database container:**
   ```bash
   npm run db:up
   ```

2. **Check if the container is running:**
   ```bash
   docker ps | grep postgres
   ```

3. **View container logs:**
   ```bash
   docker logs <container_name>
   ```

#### For Local PostgreSQL:
1. **Check if PostgreSQL service is running:**
   - Windows: Open Services (services.msc) and look for "postgresql"
   - macOS/Linux: Run `brew services list | grep postgresql` or `systemctl status postgresql`

2. **Start the service if it's not running:**
   - Windows: Right-click on the PostgreSQL service and select "Start"
   - macOS: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`

3. **Verify the port:**
   - Default PostgreSQL port is 5432
   - Check your `.env` file for the correct port in DATABASE_URL

#### For Cloud Database:
1. **Check your connection string** in `.env`
2. **Verify network access** to your database
3. **Check firewall settings** on your cloud provider

### 2. "password authentication failed" Error

**Error Message:**
```
password authentication failed for user "postgres"
```

**What it means:** The username or password in your connection string is incorrect.

**Solutions:**

1. **Check your `.env` file:**
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/postgres
   POSTGRES_PASSWORD=YOUR_PASSWORD
   ```

2. **Verify PostgreSQL credentials:**
   - For Docker: Check the `docker-compose.yml` file for POSTGRES_PASSWORD
   - For local: Remember the password you set during PostgreSQL installation

3. **Reset password if needed:**
   ```bash
   # For local PostgreSQL
   psql -U postgres -c "ALTER USER postgres PASSWORD 'new_password';"
   ```

### 3. "database 'postgres' does not exist" Error

**Error Message:**
```
database "postgres" does not exist
```

**What it means:** The database hasn't been created yet.

**Solution:**
```bash
npm run db:push
```

This command creates the database schema and tables.

### 4. "relation 'user' does not exist" Error

**Error Message:**
```
relation "user" does not exist
```

**What it means:** The database tables haven't been created yet.

**Solution:**
```bash
npm run db:push
```

### 5. "ENOTFOUND" or "getaddrinfo ENOTFOUND" Error

**Error Message:**
```
getaddrinfo ENOTFOUND localhost
```

**What it means:** DNS resolution failed for the database host.

**Solutions:**

1. **Use IP address instead of hostname:**
   ```env
   DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/postgres
   ```

2. **Check your hosts file:**
   - Windows: `C:\Windows\System32\drivers\etc\hosts`
   - Add: `127.0.0.1 localhost`

### 6. "Connection timed out" Error

**What it means:** The connection attempt took too long.

**Solutions:**

1. **Check firewall settings**
2. **Verify the database server is accessible**
3. **Increase connection timeout in your configuration**

## Testing Your Database Connection

### 1. Run the built-in test script:
```bash
npm run db:test-connection
```

### 2. Manual connection test:
```bash
# For local PostgreSQL
psql -h localhost -p 5432 -U postgres -d postgres

# For Docker (check port mapping in docker-compose.yml)
psql -h localhost -p 5433 -U postgres -d postgres
```

## Database Setup Verification

### 1. Check if tables exist:
```bash
npm run db:studio
```
This opens Drizzle Studio where you can browse your database.

### 2. List tables in database:
```sql
-- Run this SQL query
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

## Resetting Your Database

If you need to start fresh:

```bash
npm run db:reset
```

This will:
1. Drop all tables
2. Recreate the database schema

## Windows-Specific Issues

### 1. Permission Issues
- Run Command Prompt or PowerShell as Administrator
- Ensure your user has permissions to access PostgreSQL

### 2. Port Conflicts
- Check if another application is using port 5432/5433
- Use `netstat -an | grep 5432` to check

### 3. Service Not Starting
- Check Windows Event Viewer for PostgreSQL errors
- Reinstall PostgreSQL if the service is corrupted

## macOS-Specific Issues

### 1. Homebrew PostgreSQL
```bash
brew services restart postgresql
```

### 2. Path Issues
Add to your `.zshrc` or `.bash_profile`:
```bash
export PATH="/usr/local/opt/postgresql/bin:$PATH"
```

## Linux-Specific Issues

### 1. Service Management
```bash
sudo systemctl restart postgresql
sudo systemctl status postgresql
```

### 2. User Permissions
```bash
sudo -u postgres psql
```

## Still Having Issues?

1. **Share the exact error message**
2. **Include your setup method** (Docker, local, cloud)
3. **Check the DATABASE_SETUP_GUIDE.md** for detailed instructions
4. **Run the test script**: `npm run db:test-connection`

If you're still stuck, please provide:
- Operating system
- Database setup method
- Exact error message
- Steps you've already tried