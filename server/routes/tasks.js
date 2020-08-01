const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.get('/', (req, res) => {
  db.getTask()
   .then(task => {
      res.send(task)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.post('/', (req, res) => {
  const task = req.body

  db.addTask(task)
  .then(() => {
    return db.getTask()
  })
  .then(tasks => {
    res.send(tasks)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db.deleteTasks(id)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const task = req.body.description
    
    db.editTask(id,task)
    .then(() =>{
      db.getTask()
    })
    .then(tasks =>{
      res.send(tasks)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })

})


router.put('/priority/:id', (req, res) => {
  
  const id = req.params.id
  const task = req.body.priority

  db.editTaskPriority(id, task)
  .then(() =>{
    db.getTask()
  })
  .then(tasks =>{
    res.send(tasks)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})


router.put('/complete/:id', (req, res) => {
  
  const id = req.params.id
  const task = req.body.complete

  db.editTaskComplete(id, task)
  .then(() =>{
    db.getTask()
  })
  .then(tasks =>{
    res.send(tasks)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})


module.exports = router