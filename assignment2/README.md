Instructions:
1. *npm run start* from the product directory first to start the product microservice
2. To test the GET method of product microservice, send GET request to localhost:3000/rest/v1/products
3. *npm run start* from the cart directory to start the cart microservice
4. To test the GET method of cart microservice, send a GET request to localhost:8080/rest/v1/users/<USER>/cart
5. To test the PUT method of cart microservice, send a PUT request to localhost:8080/rest/v1/user/<USER>/cart with the payload data as 
"productId" : 12445dsd234
"quantity" : 5

*Used Postman to test the above mentioned methods