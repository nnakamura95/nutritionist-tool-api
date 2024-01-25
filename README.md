# nutritionist-tool-api

This is a simple tool for nutritionist who want's to stor medical report of client and make appointment with clients.

This API is built with [Hono.js](https://hono.dev/) and [Bun](https://bun.sh/) JavaScript runtime.
For database, PostgreSQL is used.

Additionally, inorder to upload images, local AWS S3 is implemented using [MinIO](https://min.io/).

PostgreSQL and MinIO is run as Docker containers for local enviroment use only.

For simplicity, no authentication or authorization feature is implemented at this moment.

---

### To run the application

Step 1:
> cp .env.dev .env

Step 2:
> docker compose run

Step 3:
> bun dev run
