import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readData(fileName) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function writeData(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}