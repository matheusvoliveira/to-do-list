# To-Do List API

Simple REST API built with Node.js, tested with Jest and containerized using Docker.

This project was created to demonstrate backend development concepts such as:

- REST API design
- Error handling
- Automated testing
- Containerization using Docker

---

# Technologies

This project uses the following technologies:

- Node.js – JavaScript runtime for building backend applications
- Express.js – Minimalist web framework for building APIs
- Jest – JavaScript testing framework used for automated tests
- Supertest – Library used to test HTTP requests
- Docker – Containerization platform to run the application in isolated environments

---

# Project Structure

```
to-do-list
│
index.js
package.json
package-lock.json
Dockerfile
.dockerignore
README.md
│
tests
   tasks.test.js
```

---

# API Endpoints

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| GET    | /tasks     | Retrieve all tasks      |
| POST   | /tasks     | Create a new task       |
| PUT    | /tasks/:id | Update an existing task |
| DELETE | /tasks/:id | Delete a task           |

---

# Running the Project Locally

1. Install dependencies

```
npm install
```

2. Run the application

```
node index.js
```

The API will run at:

```
http://localhost:8080
```

---

# Running Tests

The project uses **Jest** for automated testing and **Supertest** to test HTTP endpoints.

Run tests with:

```
npm test
```

Example tests included:

- Creating a task
- Validation for empty tasks
- Retrieving tasks
- Updating tasks
- Deleting tasks

---

# Running with Docker

This project can also run inside a **Docker container**, ensuring the same environment across different machines.

### Build the Docker image

```
docker build -t to-do-list .
```

### Run the container

```
docker run -p 8080:8080 to-do-list
```

The API will be available at:

```
http://localhost:8080/tasks
```

---

# Example Request

Create a task

POST `/tasks`

```
{
  "task": "New Task"
}
```

Example response:

```
{
  "newTask": {
    "id": 1,
    "task": "New Task"
  }
}
```

---

# Features Implemented

- CRUD operations for tasks
- Input validation
- Global error handling middleware
- Automated API tests
- Docker containerization

---

# Author

Matheus Soares
Full-stack Developer
