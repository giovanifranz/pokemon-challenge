# POKEMON Challenge

This project is a challenge that involves creating an application using the Pokémon API.

Before you start, make sure you have Docker installed on your machine. If not, you can download it from the [official Docker website](https://www.docker.com/products/docker-desktop).


## How to run

Follow the steps below to run the project:

1. Start all services defined in the `docker-compose.yaml` file:

```bash
docker-compose up
```

This command downloads the necessary images (if they haven't been downloaded yet), creates the containers, and starts all services.

2. Access the `pokemon-challenge` container:

```bash
docker exec -it pokemon-challenge /bin/bash
```

This command opens a bash shell inside the `pokemon-challenge` container, allowing you to execute commands within the container.

3. Inside the container, start the development server:

```bash
npm run dev
```

4. Access the `/api/pokemon/:name` endpoint:

Once the development server is running, you can access the Pokémon API endpoint. Replace `:name` with the name of the Pokémon you want to retrieve information about.

For example, to get information about Pikachu, you would use:

```bash
curl http://localhost:3000/api/pokemon/pikachu
```

This command sends a GET request to the server and retrieves information about Pikachu. Make sure to replace `localhost:3000` with the actual server address and port if it's different in your setup.
