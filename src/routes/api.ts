import { Request, Response, Router } from 'express';
import path from 'path';
import names from '../images_data/data';
import imageProccess from '../images_data/processing';
import { checkfun } from '../images_data/processing';
import fs from 'fs';

const api_route = Router();

api_route.get('/', (req: Request, res: Response): unknown => {
  const imgname: string = req.query.filename as string;
  const imgwidth: string = req.query.width as string;
  const imgheight: string = req.query.height as string;
  const imgpath: string = path.resolve('./') + `/images/${imgname}.jpg`;
  const resizpath: string = path.resolve('./') + `/resized_images/${imgname+'-'+imgwidth+'-'+imgheight}.jpg`;

  if (imgname == '') {
    return res.status(400).send('please add image name');
  }
  if (imgname === undefined) {
    return res.status(400).send('please add ?filename query');
  }
  if (!names.includes(`${imgname}.jpg`)) {
    return res.status(404).send('image not found');
  }
  if (imgwidth === undefined) {
    return res.status(400).send('please add ?width query');
  }
  if (imgwidth == '') {
    return res.status(400).send('please add image width');
  }
  if (!checkfun(imgwidth)) {
    return res.status(400).send('please type right width');
  }
  if (parseInt(imgwidth) === 0) {
    return res.status(400).send("can't set width to zero");
  }
  if (imgheight === undefined) {
    return res.status(400).send('please add ?height query');
  }
  if (imgheight == '') {
    return res.status(400).send('please add image height');
  }
  if (!checkfun(imgheight)) {
    return res.status(400).send('please type right height');
  }
  if (parseInt(imgheight) === 0) {
    return res.status(400).send("can't set height to zero");
  } else {
    if(fs.existsSync(resizpath)===false){
     async function run(): Promise<void>{
      await imageProccess(imgwidth,imgheight,imgpath,resizpath)
      .then (()=>{res.status(200).sendFile(resizpath)})
     }
     run();
    }
    else{
        res.status(200).sendFile(resizpath);
    }
  }
});

export default api_route;
