/**
 * Created by nsingh on 10/12/2016.
 */
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AppStorage {
  constructor() {
  }

  /**
   * @description set item in localstorage
   * @param key (string)
   * @param data
   */
  public static setItem(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * @description get item in localstorage
   * @param key
   * @returns {string|null}
   */
  public static getItem(key: string) {
    let data = null;
    try {
      data = JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      data = localStorage.getItem(key);
    }
    return data;
  }

  /**
   * @description remove item in localstorage
   * @param key
   */
  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * @description update item in localstorage
   * @param item
   * @param key
   * @param data
   */
  public static updateItemKey(item: string, key: string, data: any) {
    const getItem = this.getItem(item);
    getItem[key] = data;
    this.setItem(item, getItem);
  }

  public static clear() {
    localStorage.clear();
  }
}
