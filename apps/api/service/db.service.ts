import { RecordListOptions, RecordModel } from "npm:pocketbase";
import { getDbClient } from "../database/client.ts";
export class DbService {
  /**
   * Fetch a list of records from a PocketBase collection.
   * @param collection  PocketBase collection name
   * @param options     Optional filter/sort/expand query options
   * @returns           Typed array of records
   */
  static async getList<T extends RecordModel>(
    collection: string,
    options?: RecordListOptions,
  ): Promise<T[]> {
    const pb = await getDbClient();
    const result = await pb.collection(collection).getFullList<T>(options);
    return result;
  }

  /**
   * Fetch the first record matching a filter from a PocketBase collection.
   * Throws if no record is found.
   */
  static async getFirstMatch<T extends RecordModel>(
    collection: string,
    filter: string,
    options?: RecordListOptions,
  ): Promise<T> {
    const pb = await getDbClient();
    return await pb.collection(collection).getFirstListItem<T>(filter, options);
  }

  /**
   * Create a new record in a PocketBase collection.
   */
  static async create<T extends RecordModel>(
    collection: string,
    data: Partial<T>,
  ): Promise<T> {
    const pb = await getDbClient();
    return await pb.collection(collection).create<T>(data);
  }

  /**
   * Update an existing record by id in a PocketBase collection.
   */
  static async update<T extends RecordModel>(
    collection: string,
    id: string,
    data: Partial<T>,
  ): Promise<T> {
    const pb = await getDbClient();
    return await pb.collection(collection).update<T>(id, data);
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
