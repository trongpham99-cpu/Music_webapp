const app = require("express");
const router = app.Router();
const itemModel = require('../schemas/item.schema');
// const bodyParser = require('body-parser');

// router.use(bodyParser.json());

router.get('/getAll', async (req, res)=>{
    try {
        let items = await itemModel.find();
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getDetail/:id', async (req, res)=>{
})
try {
    let itemdetail = await itemModel.find();
    res.status(200).send(itemdetail)
} catch (error) {
    res.status(500).send(error)
}


router.post('/add', async (req, res)=>{
    try {
        let body = req.body;
        let items = new itemModel(body)
        console.log(items)
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error)

    }
})

router.put('/update', (req, res)=>{
})

router.delete('/delete', (req, res)=>{
})

module.exports = router;
