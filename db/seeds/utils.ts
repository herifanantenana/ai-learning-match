import fs from "fs";
import path from "path";

export type IdMap = Record<string, string>;

export async function loadJsonFile<T>(filePath: string): Promise<T[]> {
	const jsonFilePath = path.resolve(__dirname, filePath);
	const data = await fs.promises.readFile(jsonFilePath, "utf-8");
	return JSON.parse(data) satisfies T[];
}
