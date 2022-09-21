import { Request, Response, Router } from "express"
import path from "path"
import names from "../../images_data/data"

const api_route = Router()

api_route.get('/', (req: Request ,res: Response) => {
    const imgname: string= req.query.filename as string;
    const imgpath= path.resolve('./') + `/images/${imgname}.jpg`
    

    if(imgname==""){
        return res.status(400).send("please add image name")
    }

    if(imgname===undefined){
        return res.status(400).send("please add ?filename query")
    }

    if(!names.includes(`${imgname}.jpg`)){
        return res.status(404).send("image not found")
    }
    
    res.sendFile(imgpath)
})

export default api_route;