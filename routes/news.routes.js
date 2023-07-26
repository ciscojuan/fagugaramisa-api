const express = require('express');
const newsService = require('../services/news.service');

const router = express.Router();

const service = new newsService();

router.get('/', (req, res) => {
    const news = service.find()
    res.status(200).send({
        news: news.noticias
    })
})

    router.get('/news/', (req, res) => {
        const {limit, offset} = req.query;
        if(limit && offset){
        
            res.status(200).send({
                "message" : limit, offset
            })
            } else {
                res.status(400).send({
                    "message": "No se recibio ningun paramentro."
                })
            }

    })

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const news = service.findOne(id)
    res.status(200).send({
        data: "ff"
    })
})

router.post('/', (req, res) =>{
    const body = req.body;
    res.status(200).send({
        message : 'news article added!',
        data: body
    })
})


//patch
router.patch('/:id', (req, res) =>{
    const { id } = req.params;
    const body = req.body;
    res.status(200).send({
        message : 'article updated!',
        data: body,
        id
    })
})
//put
router.put('/:id', (req, res) =>{
    const { id } = req.params;
    const body = req.body;
    res.status(200).send({
        message : 'article updated!',
        data: body,
        id
    })
})

//delete
router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    res.status(200).send({
        message : 'article Deleted!',
        id
    })
})

module.exports = router;