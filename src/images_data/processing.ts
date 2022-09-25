import sharp from 'sharp';

function imageProccess(
  imgpath: string,
  imgwidth: string,
  imgheight: string,
  resizpath: string
): void {
  sharp(imgpath)
    .resize(parseInt(imgwidth), parseInt(imgheight))
    .toFile(resizpath);
}

export function checkfun(img: string): unknown {
  return /^[0-9]+$/.test(img);
}

export default imageProccess;
