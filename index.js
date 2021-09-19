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
        const { stdout, stderr } = await exec("ls -l " + path.join(__dirname, "public/images/*.jpg") + " | tr -s ' ' | cut -d' ' -f 9")
        
        let lines = stdout.split("\n").filter( item=>item )
        
        for (let i = 0; i < lines.length; i++){

            const{ stdout, stderr } = await exec("identify -format '%w %h' " + lines[i])

            let image_filename=lines[i].split("/")[6]
            let image_info = {
                src: "images/" + image_filename,
                w: stdout.split(" ")[0],
                h: stdout.split(" ")[1],
                title: image_filename.split(".")[0].replaceAll("_", " "),
                path: image_filename.split(".")[0]
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
app.use("/one_image/images", express.static(path.join(__dirname, "public/images")))
app.use("/css", express.static(path.join(__dirname, "public/css")))
app.use("/one_image/css", express.static(path.join(__dirname, "public/css")))
app.use(express.static(path.join(__dirname, "node_modules")))

app.get("/", async (req, res) => {
    items = await getImageJSON();
    res.render("index.ejs", {root: __dirname, images: items})
})

/*
app.get("/one_image", async (req, res) => {
    items = await getImageJSON();
    res.render("one_image.ejs", {root: __dirname, image: items[0]})
})
*/

app.get("/:comicName", async (req, res) => {
    comicName = req.params["comicName"];
    items = await getImageJSON();
    for (let i = 0; i < items.length; i++){
        if (comicName === items[i].path){
            comic = items[i]
            res.render("one_image.ejs", {root: __dirname, image: comic})
        }
    }
})

app.get("/:comicName/back", async (req, res) => {
    comicName = req.params["comicName"];
    items = await getImageJSON();
    for (let i = 0; i < items.length; i++){
        if (comicName === items[i].path){
            if (i === 0){
                comic = items[items.length - 1]
            }
            else{
                comic = items[i-1]
            }
            res.redirect("/" + comic.path)
        }
    }

})

app.get("/:comicName/forward", async (req, res) => {
    comicName = req.params["comicName"];
    items = await getImageJSON();
    for (let i = 0; i < items.length; i++){
        if (comicName === items[i].path){
            if (i+1 >= items.length){
                comic = items[0]
            }
            else{
                comic = items[i+1]
            }
            res.redirect("/" + comic.path)
        }
    }

})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})