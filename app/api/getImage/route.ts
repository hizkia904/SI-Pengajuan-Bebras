import { File } from "buffer";
import fs from "node:fs/promises";
import type { IUploaderAnswer } from "jodit/esm/types/uploader";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const a = JSON.stringify({
    success: true,
    time: "2021-12-23 16:30:01",
    data: {
      sources: [
        {
          baseurl: "",
          path: "",
          files: [
            {
              name: "/images/3d170795-f920-47c2-93fc-13c57fe6af3d.png",
              type: "image",
            },
          ],
          name: "default",
        },
      ],
      code: 220,
    },
  });
  return new Response(a);
}
