const app = require("express");
const router = app.Router();

router.get('/example', (req, res)=> {
    res.status(200).send(
        {
            message: "Hello World !!!"
        }
    )
})

module.exports = router;