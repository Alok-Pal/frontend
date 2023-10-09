Assignment
!!!!"I have used MongoDB as the database for this project. After cloning the repository, you are required to set up the MongoDB database credentials and configure the (ACCESS_TOKEN_SECRET_KEY, PORT, APP_KEY) environment variables. Then, run npm i to install the necessary dependencies.


1. I have created three pages: Register, Login, and a Table page where all the tasks added by users are fetched.
2. On the Register page, I have implemented various validations, and users are not allowed to register if they already exist (ensuring unique registrations).
3.If you are logged in and visit the Register page, you can easily switch to the Login page by clicking 'Have an account? Login.'
4.Similarly, on the Login page, there is an option to go to the Register page if you don't have an account ('Don't have an account? Register').
5.On the Register page, I have included a static 'role' field with 'Admin' and 'User' options. If you register as an admin, you gain additional privileges such as adding, editing, and deleting tasks. Users do not have permission to delete tasks.
6.JWT tokens are used for authentication and authorization of requests.
7.After successful registration, users are redirected to the Login page, and after a successful login, they are taken to the main page containing a table with all the data
8. Users can add tasks by clicking the 'Add Task' button and can also edit and delete tasks if they have the necessary permissions.
9.A 'Logout' button is provided to end the current session.
