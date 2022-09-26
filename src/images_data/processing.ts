import sharp from 'sharp';

function imageProccess(
  imgwidth: string,
  imgheight: string,
  imgpath: string,
  resizpath: string
): Promise<unknown> {
  return new Promise((resolve) => {
    resolve(
      sharp(imgpath)
        .resize(parseInt(imgwidth), parseInt(imgheight))
        .toFile(resizpath)
    );
  });
}

export function checkfun(img: string): unknown {
  return /^[0-9]+$/.test(img);
}

export default imageProccess;