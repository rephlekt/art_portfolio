const express = require("express")
const path = require("path")
const app = express ()
const port = 3000

app.use(express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")))

app.get("/", (req, res) => {
    res.sendFile("public/views/index.html", {root: __dirname})
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})