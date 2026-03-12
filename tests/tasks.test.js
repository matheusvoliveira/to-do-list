const request = require("supertest");
const app = require("../index");

describe("Tasks API", () => {
  test("Should create a task", async () => {
    const response = await request(app).post("/tasks").send({
      task: "Create Post in /tasks",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.newTask.task).toBe("Create Post in /tasks");
  });
});

test("Should return error if task is empty", async () => {
  // Send a POST request with an empty task
  const response = await request(app).post("/tasks").send({
    task: "",
  });
  // Expect API to return error 400 bad request
  expect(response.statusCode).toBe(400);
});

test("Should get tasks", async () => {
  const response = await request(app).get("/tasks");
  expect(response.statusCode).toBe(200);
  // verify if the response is an array
  expect(Array.isArray(response.body)).toBe(true);
});

test("should update a task", async () => {
  // Create a task
  const create = await request(app).post("/tasks").send({ task: "Old task" });
  // Get the id of the created task
  const id = create.body.newTask.id;
  // we do a request PUT to update the task
  const response = await request(app)
    .put(`/tasks/${id}`)
    .send({ task: "Updated task" });

  expect(response.statusCode).toBe(200);
  // expect to the new task to be "updated task"
  expect(response.body.task).toBe("Updated task");
});

test("should delete task", async () => {
  // Criamos uma task para poder deletar
  const create = await request(app)
    .post("/tasks")
    .send({ task: "Task para deletar" });

  // Pegamos o id da task criada
  const id = create.body.newTask.id;

  // Fazemos a requisição DELETE
  const response = await request(app).delete(`/tasks/${id}`);

  // Espera status 200
  expect(response.statusCode).toBe(200);

  // Verifica se a mensagem retornada está correta
  expect(response.body.message).toBe("Task deleted");
});
