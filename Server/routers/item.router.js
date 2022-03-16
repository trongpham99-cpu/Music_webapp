const app = require("express");
const router = app.Router();
const itemModel = require('../schemas/item.schema');

router.get('/getAll', async (req, res)=>{
    try {
        let items = await itemModel.find();
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getDetail/:id', (req, res)=>{
})

router.post('/add', (req, res)=>{
})

router.put('/update', (req, res)=>{
})

router.delete('/delete', (req, res)=>{
})

module.exports = router;
