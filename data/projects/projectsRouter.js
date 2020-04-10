const express = require('express');
const projectDb = require('./helpers/projectModel');
const router = express.Router();

//get
router.get('/', async (req, res) => {
  try {
    const projects = await projectDb.get()
    res.status(200).json(projects)
  }
  catch{
    res.status(500).json({ error: "error, can't get anything"})
  }
});

//post
router.post('/', async (req, res) => {
  const newPost = { ...req.body, id: req.params.id}
    try{
    const success = await projectDb.insert(newPost)
    res.status(201).json(success)
  }
  catch{
    res.status(500).json({ error: "no data found"})
  }
});

//put
router.put('/:id', async (req, res) => {
  try {
    await projectDb.update(req.params.id, { ...req.body, id: req.params.id })
    const newResult = await projectDb.getById(req.params.id)
    res.status(200).json(newResult)
  }
  catch {
    res.status(500).json({ error: "500 Error, you fucked up"})
  }
});

//delete
router.delete('/:id', async (req, res) => {
  try {
    const result = await projectDb.remove(req.params.id)
    res.status(200).json({ status: `User Id: ${result} has been successfully deleted`})
  }
  catch {
    res.status(500).json({ error: "500 Error, can't delete shit..."})
  }
});


module.exports = router;