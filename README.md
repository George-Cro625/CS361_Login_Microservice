CS361 (Software Eng I) - Group 25
This is a Login & Profile authentication microservice to be used by Group 25 for our main project/assignments

!! UPDATED AS OF 11/16/26 !!

Description: The microservice allows an application to register users, verify email addresses, maintain user JSON Web Tokens for authentication, resend verification emails, log in, and log out.
Request Steps:
Specify the URL that is hosting the app
Specify the HTTP request in JSON format
Use HTTP requests (POST, GET, etc) to the specified address (/register, /login, /logout, etc).

Example Request Call:
url = "http://localhost:5000/api/v2/auth/register"

headers = {
    "Content-Type": "application/json"
}

payload = {
    "name": "Michael York",
    "email": "michael@example.com",
    "password": "password123"
}

data = json.dumps(payload).encode("utf-8")

request = urllib.request.Request(
    url,
    data=data,
    headers=headers,
    method="POST"
)

response = urllib.request.urlopen(request)

print(response.read().decode("utf-8"))


Receive Steps:
Use HTTP request (POST, GET, etc) to request data
 
Example Receive Call:

    {
    "success": true,
    "message": "Login successful",
    "token": "abc123xyz",
    "user": {
        "name": "Michael York",
        "email": "michael@example.com"
    }



