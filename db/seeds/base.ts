export type TKeyIdMap = Map<string, string>;
import fs from "fs";
import path from "path";
import { loadJsonFile } from "./utils";

export abstract class BaseSeeder<T, TBD = unknown> {
	protected dataJson: T[] | null = null;
	protected keyIdMap: TKeyIdMap = new Map();

	constructor(protected readonly fileJsonPath: string) {
		if (!fileJsonPath) throw new Error("fileJsonPath is required");
		if (!fileJsonPath.endsWith(".json"))
			throw new Error("fileJsonPath must be a json file");
		if (!fs.existsSync(path.resolve(__dirname, fileJsonPath)))
			throw new Error("fileJsonPath does not exist");
	}

	protected async loadData(): Promise<void> {
		if (this.dataJson) return;
		const rows = await loadJsonFile<T>(this.fileJsonPath);
		this.dataJson = Array.isArray(rows) ? rows : [];
	}

	protected recordKeyId(key: string, id: string): void {
		this.keyIdMap.set(key, id);
	}

	public hasIdKey(key: string): boolean {
		return this.keyIdMap.has(key);
	}

	public getIdKey(key: string): string | undefined {
		return this.keyIdMap.get(key);
	}

	public logKeyIdMapping(): void {
		console.log("====================================");
		this.keyIdMap.forEach((id, key) => {
			console.log(`Key: ${key} => ID: ${id}`);
		});
		console.log("====================================");
	}

	abstract clean(tx: TBD): Promise<void>;
	abstract seed(tx: TBD): Promise<void>;
}
