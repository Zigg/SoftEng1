These schemas are not SQL as they deal with firebase's collection schema which is a NoSQL database.
```
FIXME: These are not yet the final schema models, these are just for testing purposes

Products Collection Schema:
```
{
    "id": "string",
    "title": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "image": "string"
}
```

Orders Collection Schema (User's Order History):
```
{
    "id": "string",
    "quantity": "number",
    "items": [
        {
            "id": "string",
            "title": "string",
            "price": "number",
            "description": "string",
            "category": "string",
            "image": "string",
            "quantity": "number"
        }
    ],
    "timestamp": "date",
    "images": "string",
    "priceShipping": "number",
    "price": "number"
    "status": "string"
}
```