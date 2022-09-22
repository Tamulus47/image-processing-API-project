import { Request, Response, Router } from "express"
import path from "path"
import sharp from "sharp"
import names from "../images_data/data"

const api_route = Router()

api_route.get('/', (req: Request ,res: Response) => {
    const imgname: string= req.query.filename as string
    const imgwidth: string= req.query.width as string
    const imgheight: string = req.query.height as string
    const imgpath= path.resolve('./') + `/images/${imgname}.jpg`
    const resizpath= path.resolve('./')+`/resized_images/${imgname}.jpg`

    if(imgname==""){
        return res.status(400).send("please add image name")
    }
    if(imgname===undefined){
        return res.status(400).send("please add ?filename query")
    }
    if(!names.includes(`${imgname}.jpg`)){
        return res.status(404).send("image not found")
    }
    if(imgwidth==""){
        return res.status(400).send("please add image width")
    }
    if(imgheight==""){
        return res.status(400).send("please add image height")
    }
    if(imgwidth===undefined){
        return res.status(400).send("please add ?width query")
    }
    if(imgheight===undefined){
        return res.status(400).send("please add ?height query")
    }
    else{
        sharp(imgpath).
        resize(parseInt(imgwidth),parseInt(imgheight)).
        toFile(resizpath, ()=>{
            res.sendFile(resizpath);
        });
    }
})

export default api_route;