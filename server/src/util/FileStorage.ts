import {writeFile, unlink} from 'fs';
import {v4 as uuidv4} from 'uuid';

export class FileStorage {
  readonly #storageDir: string;
  readonly #endpoint: string;
  constructor(dirLocation: string, endpoint: string) {
    this.#storageDir = dirLocation;
    this.#endpoint = endpoint;
  }

  private _storageLocation(newFilename: string): string {
    return `${this.#storageDir}/${newFilename}`;
  }

  public saveAndReturnFilename(buffer: Buffer): string {
    const newFilename = uuidv4() + '.jpg';
    writeFile(this._storageLocation(newFilename), buffer, err => {
      // TODO: better error handling, maybe sync write?
      if (err) console.error(err);
    });
    return newFilename;
  }

  public deleteFileByName(fileName: string): void {
    unlink(this._storageLocation(fileName), err => {
      if (err) console.error(err);
    });
  }

  public getFileUrl(fileName: string): string {
    return `http://0.0.0.0:4000${this.#endpoint}/${fileName}`;
  }
}
