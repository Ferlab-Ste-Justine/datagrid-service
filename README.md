# Data Grid Service - Storing data

## Configuration

The type are configured in the .env

```properties
#{ENTITY_TYPE}_TYPE=The type you want to have available in your API endpoint.
SQON_QUERY_TYPE=sqon

DEFAULT_USER_ID is just a variable used during developement or when you dont use the flag SECURE to true and still have 
the API working with a test user
```

## API

### GET /
Returns all the data associated with a user

### GET /type/:entityType
Returns all the data associated with a user for a given type

### POST /type/:entityType
Create new data associated with a user for a given type

payload can be any valid JSON that satisfy your needs

### GET /content/:id
Returns the data associated with a user for a given ID

### PUT /content/:id
Update the data associated with a user for a given ID

### DELETE /content/:id
Delete the data associated with a user for a given ID

### GET /search
Find content associated with a user for a given key/value in the content
EX: content stored : 
{
    "name": "test",
    "content": {
        "more": "test"
    }
}

key = name
value = test

this will return the content example above

