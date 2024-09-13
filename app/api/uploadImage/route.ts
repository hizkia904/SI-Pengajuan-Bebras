import { File } from "buffer";
import fs from "node:fs/promises";
import type { IUploaderAnswer } from "jodit/esm/types/uploader";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const formData = await request.formData();

  const files = [];
  const isImages = [];
  const fileNames = [];
  let i = 0;
  while (true) {
    if (formData.has(`files[${i}]`)) {
      const random_name = uuidv4();
      const image = formData.get(`files[${i}]`);
      const type = image.name.split(".")[1];
      console.log(image);
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await fs.writeFile(`./public/images/${random_name}.${type}`, buffer);
      // files.push(`./app/public/images/${random_name}.${type}`);
      files.push(`/images/${random_name}.${type}`);
      fileNames.push(image.name);
      isImages.push(true);
      i++;
    } else {
      console.log("break");
      break;
    }
  }

  console.log(formData);

  //   const response = JSON.stringify({
  //     success: true,
  //     time: "2 sec",
  //     data: {
  //       files: image.name,
  //       path: `./images/${image.name}`,
  //       baseurl: "localhost:3000",
  //       error: "",
  //       msg: "",
  //     },
  //   });

  const response = JSON.stringify({
    data: {
      baseurl: "",
      files: files,
      path: "",
      isImages: isImages,
      fileNames: fileNames,
    },
    success: true,
    time: "wtf",
  });

  return new Response(response);
}
