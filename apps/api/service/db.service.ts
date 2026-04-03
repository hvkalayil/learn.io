import PocketBase, { RecordListOptions, RecordModel } from "npm:pocketbase";
import { getDbClient } from "../database/client.ts";
import { DB_FILE_URL, DB_URL } from "../config.ts";
export class DbService {
  /**
   * Fetch a list of records from a PocketBase collection.
   * @param collection  PocketBase collection name
   * @param options     Optional filter/sort/expand query options
   * @param fileFields  Optional fields which are files
   * @returns           Typed array of records
   */
  static async getList<T extends RecordModel>(
    collection: string,
    options?: RecordListOptions,
    fileFields?: Array<string>,
  ): Promise<T[]> {
    const pb = await getDbClient();
    const result = await pb.collection(collection).getFullList<T>(options);

    if (!fileFields?.length) return result;
    return result.map((record) => this.resolveFileUrls(pb, record, fileFields));
  }

  /**
   * Fetch the first record matching a filter from a PocketBase collection.
   * Throws if no record is found.
   */
  static async getFirstMatch<T extends RecordModel>(
    collection: string,
    filter: string,
    options?: RecordListOptions,
    fileFields?: Array<string>,
  ): Promise<T> {
    const pb = await getDbClient();
    const record = await pb.collection(collection).getFirstListItem<T>(
      filter,
      options,
    );
    return this.resolveFileUrls(pb, record, fileFields);
  }

  /**
   * Create a new record in a PocketBase collection.
   */
  static async create<T extends RecordModel>(
    collection: string,
    data: Partial<T> | FormData,
    fileFields?: Array<string>,
  ): Promise<T> {
    const pb = await getDbClient();
    const record = await pb.collection(collection).create<T>(data);
    return this.resolveFileUrls(pb, record, fileFields);
  }

  /**
   * Update an existing record by id in a PocketBase collection.
   */
  static async update<T extends RecordModel>(
    collection: string,
    id: string,
    data: Partial<T> | FormData,
    fileFields?: Array<string>,
  ): Promise<T> {
    const pb = await getDbClient();
    const record = await pb.collection(collection).update<T>(id, data);
    return this.resolveFileUrls(pb, record, fileFields);
  }

  /**
   * Private helper to resolve filenames into full PocketBase URLs
   */
  private static resolveFileUrls<T extends RecordModel>(
    pb: PocketBase,
    record: T,
    fileFields?: Array<string>,
  ): T {
    if (!fileFields?.length) return record;

    const updated = { ...record };
    for (const field of fileFields) {
      const fileName = record[field];
      if (!fileName) continue;

      if (Array.isArray(fileName)) {
        (updated as RecordModel)[field] = fileName.map((f) =>
          pb.files.getURL(record, f).replace(DB_URL, DB_FILE_URL)
        );
      } else {
        (updated as RecordModel)[field] = pb.files.getURL(record, fileName)
          .replace(DB_URL, DB_FILE_URL);
      }
    }
    return updated;
  }

  /**
   * Delete a record by id from a PocketBase collection.
   */
  static async delete(collection: string, id: string): Promise<boolean> {
    const pb = await getDbClient();
    return await pb.collection(collection).delete(id);
  }
  /**
   * Health check — verifies that the PocketBase instance is reachable
   * by fetching server health info.
   */
  static async checkHealth(): Promise<{ alive: boolean; message: string }> {
    const pb = await getDbClient();
    const health = await pb.health.check();
    return { alive: true, message: health.message };
  }
}
