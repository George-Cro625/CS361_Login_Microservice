CS361 (Software Eng I) - Group 25
This is a Login & Profile authentication microservice to be used by Group 25 for our main project/assignments

!! UPDATED AS OF 11/16/26 !!

The CS_362_Login_Microservice will send & receive HTTP requests (POST & GET) to a Database specified (default to MONGODB) which will
provide the following microservice:

1. Allow User to create a Profile/account on database using email & password
2. Validate that User is unique
3. Validate that password meets password requirements
4. Hash/bcrypt password prior to storing on database
5. Store a JSON Web Token authentification cookie tied to user profile (in-work).
6. ...[microservice still in-work]

