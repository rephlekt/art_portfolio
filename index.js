const express = require("express")
const path = require("path")
const ejs = require("ejs")
const util = require("util")
const exec = util.promisify(require('child_process').exec);

const app = express ()
const port = 3000

async function getImageJSON(){
    items = []
    try{
        const { stdout, stderr } = await exec("ls -l " + path.join(__dirname, "public/images/") + " | cut -d' ' -f 10")
        console.log(stdout)
        let lines = stdout.split("\n").filter( item=>item )

        for (let i = 0; i < lines.length; i++){

            //lines[i] not converting right, look at this later
            const{ stdout, stderr } = await exec("identify -format '%w %h' public/images/" + lines[i])

            let image_info = {
                src: "images/" + lines[i],
                w: stdout.split(" ")[0],
                h: stdout.split(" ")[1],
                title: lines[i].split(".")[0].replaceAll("_", " ")
            }
            items.push(image_info)   
        }
        return items
    }
    catch(e){
        console.error(e)
    }
}

app.set("views", path.join(__dirname, "public/views/"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use("/css", express.static(path.join(__dirname, "public/css")))
app.use(express.static(path.join(__dirname, "node_modules")))

app.get("/", async (req, res) => {
    items = await getImageJSON();
    res.render("index.ejs", {root: __dirname, images: items})
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})