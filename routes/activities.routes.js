const express = require("express");
const ActivitiesService = require("../services/activities.service");

const router = express.Router();

const Service = new ActivitiesService();
router.get("/", async (req, res) => {
  const activities = await Service.find();
  res.status(200).send({
    activities,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const activities = await Service.findOne(parseInt(id, 10));
  if (!activities) {
    res.status(404).send({
      message: "Objeto no encontrado",
      solicitud: id,
    });
  }
  res.status(200).send({
    activities,
  });
});

router.post("/", async (req, res) => {
  const body = req.body;
  const activities = await Service.create(body);
  res.status(201).send({
    message: "activities article added!",
    data: activities,
  });
});

//patch
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //informacion que queremos modificar
    const body = req.body;
    const activities = await Service.update(id, body);
    res.status(200).send({
      activities,
    });
  } catch (error) {
    res.status(404).send({
      message: "No se encontro el objeto",
      error: error.message,
    });
  }
});
//put
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  //informacion que queremos modificar
  const body = req.body;
  const activities = await Service.update(id, body);
  res.status(200).send({
    message: "article updated!",
    activities,
  });
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const activities = await Service.delete(id);
  res.status(200).send({
    message: "article Deleted!",
    activities,
  });
});

module.exports = router;
