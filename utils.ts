import fs from "fs/promises";

export const convertToNull = (values: any[]) => {
  return values.map((value) =>
    value === undefined || value === "" ? null : value
  );
};

export function readFile(file: File) {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader();

    // Register event listeners
    reader.addEventListener("loadend", (e) => resolve(e.target.result));
    reader.addEventListener("error", reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

export async function getAsByteArray(file) {
  return new Uint8Array(await readFile(file));
}

// export async function findTag(obj: any, tagName: string) {
//   for (let key in obj) {
//     if (key === tagName) {
//       const xlink_href = obj[key]["@_xlink:href"];
//       const buffer = await fs.readFile(`./public${xlink_href}`);
//       const base64 = buffer.toString("base64");

//       const getType = xlink_href.split("/")[2].split(".")[1]; //  /images/anjing.jpg
//       const type = getType == "jpg" ? "jpeg" : getType;

//       obj[key]["@_xlink:type"] = undefined;
//       obj[key]["@_xlink:show"] = undefined;
//       obj[key]["@_xlink:actuate"] = undefined;
//       obj[key]["@_xlink:href"] = undefined;
//       obj[key]["@_draw:mime-type"] = `image/${type}`;
//       obj[key]["office:binary-data"] = base64;
//     }
//     if (typeof obj[key] === "object") {
//       obj[key] = await findTag(obj[key], tagName);
//     }
//   }

//   return obj;
// }
