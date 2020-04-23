Python version: 3.7

Python libraries used:
1. datetime
2. flask
3. functools
4. random
5. redis

Instructions:
1. Execute the python file
2. Use postman (or similar tool) to send requests and receive replies

Instructions for sending requests using Postman
1. The API uses basic authentication. So, the credentials have to be specified in the postman request under the "Authorization" tab.
Credentials - Username: username, Password: password
2. Add the payload data under the "Body" tab as JSON.
Data - {"from" : 123456, "to" : 1234567890, "text" : "Hello"}
\nThe values for keys "from" and "to" are integer type and for "text" it is string type.
