const express = require("express");
const app = express();
const PORT = 8080;

// middleware
app.use(express.json());

app.listen(PORT, () => console.log(`ITS ALIVE! on http://localhost:${PORT}`));
app.get("/balls", (req, res) => {
    res.status(200).send({
        dog: 'pomeranian',
        size: 'kiwi'
    })
})
app.post(
    "/balls/:id",
    (req, res) => {
        const { id } = req.params;
        console.log(id);
        const { data } = req.body;
        
        if (!data) {
            res.status(418).send({ message: 'Must provide a body'})
        }

        res.send({
            ball : `basket ball #${id}`
        })
    })