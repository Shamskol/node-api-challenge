const express = require("express");
const Actions = require("../data/helpers/actionModel");
const router = express.Router();

//get
router.get("/", (req, res) => {
  Actions.get()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "actions not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error, can't get anything" });
    });
});

//post
router.post("/:id", (req, res) => {
  Actions.insert(req.body)
    .then((result) => {
      if (result) {
        res.status(201).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "no data found" });
    });
});

//put
router.put("/:id", (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((result) => {
      if (result) {
        res.status(200).json(newResult);
      }
    })

    .catch((err) => {
      res.status(500).json({ message: "500 Error" });
    });
    
});

//delete
router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ status: `User Id: ${result} has been successfully deleted` });
      }else{
        res.status(404).json({message : "item not found"})
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "500 Error, can't delete " });
    });
});

module.exports = router;
