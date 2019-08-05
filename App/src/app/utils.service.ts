import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  saveLocalItem(key: string, data: any) {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }

    window.localStorage.setItem(key, data);
  }

  getLocalItem(key: string) {
    let data: any;
    data = window.localStorage.getItem(key);

    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  removeLocalItem(key: string) {
    window.localStorage.removeItem(key);
  }

  isGuid(stringToTest) {
    if (stringToTest[0] === "{") {
      stringToTest = stringToTest.substring(1, stringToTest.length - 1);
    }
    var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
    return regexGuid.test(stringToTest);
  }

  textToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    let to   = "aaaaaeeeeiiiioooouuuunc------";

    for (let i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '') // collapse whitespace and replace by -
        .replace(/-+/g, ''); // collapse dashes

    return str;
  }

}
