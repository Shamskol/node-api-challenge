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
  .catch(error => {

    res.status(500).json({ message: "error, can't get anything"})
  });
});

// router.get("/:id", validateId, (req,res) => {
//   res.status(200).json(req.data);
// });


//post
router.post('/', validateBody,  (req, res) => {
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
router.put('/:id', validateId, validateBody, (req, res) => {
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
router.delete('/:id', validateId, (req, res) => {
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

// custom middleware

function validateId(req, res, next) {
	// do your magic!

	if (new RegExp(/^\d+$/).test(req.params.id) !== true) {
		res.status(500).json({ message: "Invalid ID" });
		return true;
	}

	Projects.get(req.params.id)
		.then(data => {
			if (data) {
				req.data = data;
				next();
			} else {
				res.status(404).json({ message: "not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error getting" });
		});
}

function validateBody(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: "missing data" });
		return true;
	}
	if (!req.body.name || !req.body.description) {
		res.status(400).json({ message: "missing required field" });
		return true;
	}
	if (req.body.completed !== undefined) {
		req.body.completed = !!Number(req.body.completed);
	}
	next();
}



module.exports = router;