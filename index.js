const express = require("express")
const path = require("path")
const util = require("util")
const  { exec }  = require('child_process');

const app = express ()
const port = 3000

exec("ls -l " + path.join(__dirname, "public/images/") + " | cut -d' ' -f 10", (err, stdout, stderr) => {
    console.log(stdout)
    //make json creating in here
})


app.use(express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")))

app.get("/", (req, res) => {
    res.sendFile("public/views/index.html", {root: __dirname})
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})