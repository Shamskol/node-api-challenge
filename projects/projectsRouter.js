const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

//get
router.get('/',  (req, res) => {
  Projects.get()
  .then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "projects not found" });
    }
  
  })
  .catch((error) => {

    res.status(500).json({ message: "error, can't get anything"})
  });
});

//post
router.post('/',  (req, res) => {
  Projects.insert(req.body)
		.then(result => {
			if (result) {
				res.status(200).json(result);
			}
    })
    .catch(err => {
			res.status(500).json({ message: "error" }); 
    })
  
  
});

//put
router.put('/:id', (req, res) => {
  Projects.update(req.params.id, req.body)
		.then(result => {
			if (result) {
				res.status(200).json(result);
      }
    })
    
  .catch(err => {
    res.status(500).json({ message: "500 Error"})
  })
});

//delete
router.delete('/:id',  (req, res) => {
  Projects.remove(req.params.id)
		.then((count) => {
			if (count) {
				res.status(200).json({message: "item deleted"});
			} else {
        res.status(404).json({ message: "message not found" });
      }

		})
  
  .catch(err => {
    res.status(500).json({ message: "500 Error, can't delete "})

  })

});


module.exports = router;