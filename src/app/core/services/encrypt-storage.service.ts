import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AppKeys } from '../constants/appSettings';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptStorageService {
  encryptKey: string = `${AppKeys.encrypt}_key_for_${environment.env}_env`;

  constructor() {}

  // For set encrypted data to local storage
  setLocalStorageItem(keyName: string, obj: any, encryptData = true) {
    if (encryptData && environment.isEncryptionEnable) {
      localStorage.setItem(keyName, this.encrypt(JSON.stringify(obj), this.encryptKey));
    } else {
      localStorage.setItem(keyName, JSON.stringify(obj));
    }
    window.dispatchEvent(new Event('storage'));
  }

  // For get decrypted data from local storage
  getLocalStorageItem(keyName: string, encryptData = true) {
    let data = localStorage.getItem(keyName) || null;
    if (data) {
      if (encryptData && environment.isEncryptionEnable) {
        const value = this.decrypt(data, this.encryptKey);
        return value ? JSON.parse(value) : value;
      } else {
        return JSON.parse(data);
      }
    }
    return null;
  }

  // For set encrypted data to session storage
  setSessionStorageItem(keyName: string, obj: any, encryptData = true) {
    if (encryptData && environment.isEncryptionEnable) {
      sessionStorage.setItem(keyName, this.encrypt(JSON.stringify(obj), this.encryptKey));
    } else {
      sessionStorage.setItem(keyName, JSON.stringify(obj));
    }
    window.dispatchEvent(new Event('storage'));
  }

  // For get decrypted data from session storage
  getSessionStorageItem(keyName: string, encryptData = true) {
    let data = sessionStorage.getItem(keyName) || null;
    if (data) {
      if (encryptData && environment.isEncryptionEnable) {
        const value = this.decrypt(data, this.encryptKey);
        return value ? JSON.parse(value) : value;
      } else {
        return JSON.parse(data);
      }
    }
    return null;
  }

  // For clear all local storage
  clearAllLocalStorage() {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
  }

  // For clear all session storage
  clearAllSessionStorage() {
    sessionStorage.clear();
    window.dispatchEvent(new Event('storage'));
  }

  // For remove item from session storage by key
  clearSessionStorageByKey(keyName: string) {
    sessionStorage.removeItem(keyName);
    window.dispatchEvent(new Event('storage'));
  }

  // For remove item from local storage by key
  clearLocalStorageByKey(keyName: string) {
    localStorage.removeItem(keyName);
    window.dispatchEvent(new Event('storage'));
  }

  // For encrypt data
  public encrypt(txt: string, encryptKey: string) {
    return CryptoJS.AES.encrypt(txt, this.encryptKey).toString();
  }

  // For decrypt data
  public decrypt(txtToDecrypt: string, encryptKey: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.encryptKey).toString(CryptoJS.enc.Utf8);
  }
}
