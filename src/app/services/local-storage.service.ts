import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable()
export class LocalStorageService {
  private key = 'privateKey';

  saveData<T>(key: string, value: T) {
    localStorage.setItem(key, this.encrypt(value));
  }

  getData<T>(key: string): '' | T {
    const data = localStorage.getItem(key) || '';
    return data === '' ? '' : JSON.parse(this.decrypt(data).toString(enc.Utf8));
  }

  private encrypt<T>(data: T): string {
    return AES.encrypt(JSON.stringify(data), this.key).toString();
  }

  private decrypt(data: string) {
    return AES.decrypt(data, this.key);
  }
}
