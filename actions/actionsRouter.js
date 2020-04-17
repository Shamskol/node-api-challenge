const express = require("express");
const Actions = require("../data/helpers/actionModel");
const router = express.Router();

//get
router.get("/", (req, res) => {
  Actions.get()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "actions not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error, can't get anything" });
    });
});

//post
router.post("/", validateBody,  (req, res) => {
  Actions.insert(req.body)
    .then(result => {
      if (result) {
        res.status(201).json(result);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "no data found" });
    });
});

//put
router.put("/:id", validateBody, validateId, validateProjectId, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(result => {
      if (result) {
        res.status(200).json(newResult);
      }
    })

    .catch(err => {
      res.status(500).json({ message: "500 Error" });
    });
    
});

//delete
router.delete("/:id", validateId,
 (req, res) => {
  Actions.remove(req.params.id)
    .then(result => {
      if (result) {
        res
          .status(200)
          .json({ status: `User Id: ${result} has been successfully deleted` });
      }else{
        res.status(404).json({message : "item not found"})
      }
    })
    .catch(err => {
      res.status(500).json({ message: "500 Error, can't delete " });
    });
});

// custom middleware

function validateId(req, res, next) {
	// do your magic!

	if (new RegExp(/^\d+$/).test(req.params.id) !== true) {
		res.status(500).json({ message: "Invalid ID" });
		return true;
	}

	Actions.get(req.params.id)
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
function validateProjectId(req, res, next) {
	// do your magic!

	if (new RegExp(/^\d+$/).test(req.body.project_id) !== true) {
		res.status(500).json({ message: "Invalid ID" });
		return true;
	}

	Projects.get(req.body.project_id)
		.then(data => {
			if (data) {
				req.project = data;
				next();
			} else {
				res.status(404).json({ message: "project not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error getting project" });
		});
}

function validateBody(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: "missing data" });
		return true;
	}
	if (!req.body.notes || !req.body.description) {
		res.status(400).json({ message: "missing required field" });
		return true;
	}
	if (req.body.description.length > 128) {
		res.status(400).json({ message: "description is too long" });
		return true;
	}
	if (req.body.completed !== undefined) {
		req.body.completed = !!Number(req.body.completed);
	}
	next();
}







module.exports = router;
