import { Injectable } from '@angular/core';
import { MessageService, Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(title: string, description: string, keepOpen = true): void {
    const message: Message = {
      severity: 'success',
      summary: title,
      detail: description,
      sticky: keepOpen,
    };
    this.messageService.add(message);
  }

  info(title: string, description: string, keepOpen = true): void {
    const message: Message = {
      severity: 'info',
      summary: title,
      detail: description,
      sticky: keepOpen,
    };
    this.messageService.add(message);
  }

  warn(title: string, description: string, keepOpen = true): void {
    const message: Message = {
      severity: 'warn',
      summary: title,
      detail: description,
      sticky: keepOpen,
    };
    this.messageService.add(message);
  }

  error(title: string, description: string, keepOpen = true): void {
    const message: Message = {
      severity: 'error',
      summary: title,
      detail: description,
      sticky: keepOpen,
    };
    this.messageService.add(message);
  }
}
