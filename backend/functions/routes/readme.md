
# API Testing Overview

## User API Reference
### Make sure you've already setup firebase to ensure testing of these endpoints as the BASE_URL will come from that

#### Get user count

```http
  GET `${BASE_URL}/app/api/users/count`
```
#### Sample JSON Response:
```http
{
    "success": true,
    "count": 32
}
```
#### Get user list

```http
  GET `${BASE_URL}/app/api/users/list`
```
#### Sample JSON Response:
```http
{
    "success": true,
    "data": [
        {
            "uid": "4J3Tcqttv4TWjd3mZ1kVDrxyU3h2",
            "email": "dasdas@fdjndosjn.com",
            "emailVerified": false,
            "displayName": "oiqnwd=",
            "disabled": false,
            "metadata": {
                "lastSignInTime": "Mon, 06 Nov 2023 15:54:37 GMT",
                "creationTime": "Mon, 06 Nov 2023 15:54:37 GMT",
                "lastRefreshTime": "Mon, 06 Nov 2023 15:54:37 GMT"
            },
            "passwordHash": "aAw4dsZ3W1GVyK08CNsIOAAGhU5cvTQyk7NNX3fATbimskVUah4tn3Lu7Ig77DVy3TfFam-3a7E6mnMxgGBvmw==",
            "passwordSalt": "cUvyxboilMS7uw==",
            "tokensValidAfterTime": "Mon, 06 Nov 2023 15:54:37 GMT",
            "providerData": [
                {
                    "uid": "dasdas@fdjndosjn.com",
                    "displayName": "oiqnwd=",
                    "email": "dasdas@fdjndosjn.com",
                    "providerId": "password"
                }
            ]
        },
    ]
}
```

## Product API Reference

Create Single Product
```http
  POST `${BASE_URL}/app/api/products/create`
```
NOTE: This doesn't have an enforced controller for this form on the backend(frontend only), this is for testing first and the request body fields are not yet validated only a productId. There are lots of optional fields 
#### Sample JSON Response:
```http
{
    "success": true,
    "productId": "E8nL8Yea9k1bB5wJqddK"
}
```

Get all products
```http
  GET `${BASE_URL}/app/api/products/all`
```
NOTE: This doesn't have an enforced controller for this form on the backend(frontend only), this is for testing first and the request body fields are not yet validated only a productId 
#### Sample JSON Response:
```http
{
    "success": true,
    "data": [
        {
            "id": "8ZxD6zyUkKsvbC6AiNgS",
            "productName": "Pepsi",
            "basePrice": "5",
            "sizes": [
                {
                    "price": "0",
                    "name": "regular"
                }
            ],
            "addons": [],
            "ingredients": [
                "Sugar"
            ]
        },
        {
            "id": "9co8WR1488BiVsmIKcVG",
            "productName": "Coke",
            "basePrice": "12",
            "sizes": [
                {
                    "price": "0",
                    "name": "small"
                }
            ],
            "addons": [],
            "ingredients": [
                "Sugar",
                "Syrup",
                "Mint"
            ]
        },
    ]
}
```