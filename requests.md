# Request info

## Get all users

Request template:

```bash
curl -X GET http://localhost:3000/api/users
```

## Get an user by mail

Request template:

```bash
curl -X GET http://localhost:3000/api/users/$EMAIL
```

## Update password by email

Body example:

```json
{
    "password": "abcdefgh",
    "new_password": "123456789"
}
```

Request template:

```bash
curl -X PUT \
 "localhost:3000/api/users/$EMAIL" \
  -H 'Content-Type: application/json' \
  -d "{
    \"password\": \"$CURRENT_PASSWORD\", \"new_password\": \"$NEW_PASSWORD\" }"
```

## Delete password by email

Body example:

```json
{
    "password": "abcdefgh"
}
```

Request template:

```bash
curl -X DELETE \
 "localhost:3000/api/users/$EMAIL" \
  -H 'Content-Type: application/json' \
  -d "{
    \"password\": \"$CURRENT_PASSWORD\"}"
```
