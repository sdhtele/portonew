// This script shows how to create an admin user in your application
// The actual user creation should be done through the sign-up form
// to ensure proper password hashing and security

console.log(`
Admin User Credentials:
=======================
Username: ngnawfal@example.com
Password: kaysan123
=======================

To access the admin dashboard:

1. Make sure your database is running
   - Using Docker: npm run db:up
   - Using local PostgreSQL: Start your PostgreSQL service

2. Run database migrations:
   npm run db:push

3. Start the application:
   npm run dev

4. Navigate to the sign-up page:
   http://localhost:3000/sign-up

5. Create a new user with the credentials above

6. Log in to access the admin dashboard:
   http://localhost:3000/login

If you want to create the user programmatically, you can try:
npm run db:seed-admin

But make sure your database is running first!
`);