## Installing MongoDB

`podman run --name sample-library -p 27017:27107 -d mongo:latest`

## Checking the database

`podman exec -it sample-library mongosh`