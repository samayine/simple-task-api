# Simple Task API

A simple RESTful API for managing tasks, built with **Node.js** and **Express.js**.

# Features

- `GET /api/tasks` – Get all tasks
- `POST /api/tasks` – Add a new task
- `PUT /api/tasks/:id` – Mark a task as completed
- `DELETE /api/tasks/:id` – Delete a task

## Tech Stack

- Node.js
- Express.js
- Local JSON file for data storage (`tasks.json`)
# How to Run

```bash
git clone https://github.com/samayine/simple-task-api.git
cd simple-task-api
npm install
node server.js
