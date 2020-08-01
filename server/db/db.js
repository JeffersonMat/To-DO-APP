const knex = require("knex");
const config = require("../../knexfile");
const env = process.env.NODE_ENV || "development";
const connection = knex(config[env]);

module.exports = {
  getTask,
  addTask,
  deleteTasks,
  editTask,
  editTaskPriority,
  editTaskComplete,
  
};

function getTask(db = connection) {
  return db("TodoList").select();
}

function addTask(task, db = connection) {

  return db("TodoList").insert({
    Tasks: task.task,
    Description:task.description,
    Priority: task.priority,
    Completed: task.completed
  });
}

function deleteTasks(id, db = connection) {
  return db("TodoList").where("id", id).delete();
}

function editTask(id, task, db = connection) {
  return db("TodoList").where("id", id).update({ Description: task})
}

function editTaskPriority(id, task, db = connection) {
  return db("TodoList").where("id", id).update({ Priority: task })
}


function editTaskComplete(id, task, db = connection) {
  return db("TodoList").where("id", id).update({Completed:task})
}