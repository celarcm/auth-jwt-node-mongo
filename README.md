This is a role based authentication using JWT token

## Running

To start the project, simply run:
`docker-compose up`

Running the above commang starts two containers, one running NodeJS application and the other running MongoDB.

The API is available at localhost:80. These are the available endpoints:
- **POST** `localhost/signup`
Use this endpoint to sign up as a user, using either "admin" or "client" role.
- **POST** `localhost/login`
Use this endpoint to log in. Response includes a JWT token, that can be used to retrieve products.
- **GET** `localhost/products`
Use this endpoint to get the list of all products saved in the database. This endpoint is only available to users that are logged in and the endpoint expects the **x-access-token** header with the JWT token. Only users with *admin* role are able to access **created_by** field of products.
- **GET** `localhost/products/:productId`
Use this endpoint to get a specific product saved in the database. This endpoint is only available to users that are logged in and the endpoint expects the **x-access-token** header with the JWT token. Only users with *admin* role are able to access **created_by** field of a product.
- **POST** `localhost/products`
Use this endpoint to add a new product to the database. This endpoint is only available to users with role **admin** that are logged in and the endpoint expects the **x-access-token** header with the JWT token.
- **PUT** `localhost/products/:productId`
Use this endpoint to update a product in the database. This endpoint is only available to users with role **admin** that are logged in and the endpoint expects the **x-access-token** header with the JWT token.
- **DELETE** `localhost/products/:productId`
Use this endpoint to delete a product from the database. This endpoint is only available to users with role **admin** that are logged in and the endpoint expects the **x-access-token** header with the JWT token.