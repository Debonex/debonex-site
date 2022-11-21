import cacache from "cacache";

type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

class Cache {
  private cachePath: string;

  constructor(cachePath: string) {
    this.cachePath = cachePath;
  }

  public clear() {
    return cacache.rm.all(this.cachePath);
  }

  public put(key: string, data: string | TypedArray | Buffer | DataView) {
    return cacache.put(this.cachePath, key, data);
  }

  public get(key: string) {
    return cacache.get(this.cachePath, key);
  }
}

export default Cache;
