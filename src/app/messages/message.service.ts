import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    private messages: string[] = [];
    isDisplayedMessages = false;//Para capturar si se esta mostrando el mensaje

    addMessage(message: string): void {
        let currentDate = new Date();
        this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
    }
}
