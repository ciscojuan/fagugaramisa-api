const express = require("express");
const NewsService = require("../services/news.service");

const router = express.Router();

const Service = new NewsService();
router.get("/", async (req, res) => {
  const news = await Service.find();
  res.status(200).send({
    news: news,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const news = await Service.findOne(parseInt(id, 10));
  if(!news){
    res.status(404).send({
        message : 'Objeto no encontrado',
        solicitud: id
    })
  }
  res.status(200).send({
    news,
  });
});

router.post("/", async (req, res) => {
  const body = req.body;
  const news = await Service.create(body);
  res.status(201).send({
    message: "news article added!",
    data: news,
  });
});

//patch
router.patch("/:id", async (req, res) => {
  try{const { id } = req.params;
  //informacion que queremos modificar
  const body = req.body;
  const news = await Service.update(id, body);
  res.status(200).send({
    news
  });
} catch (error){
    res.status(404).send({
        message : 'No se encontro el objeto',
        error : error.message
    })
}
});
//put
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  //informacion que queremos modificar
  const body = req.body;
  const news = await Service.update(id, body);
  res.status(200).send({
    message: "article updated!",
    news
  });
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const news = await Service.delete(id) 
  res.status(200).send({
    message: "article Deleted!",
    news
  });
});

module.exports = router;
