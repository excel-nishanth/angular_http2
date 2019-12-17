import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messages1: string[] = [];

  add(message: string){
    console.log('9999999999999999');
    this.messages1.push(message);
  }

  clear() {
    this.messages1 = [];
  }
}
