import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages = [
    { text: 'Hello!', sent: false },
    { text: 'Hi there!', sent: true }
  ];

  chatForm = new FormGroup({
    message: new FormControl('')
  });

  showChat = false;

  toggleChat() {
    this.showChat = !this.showChat;
  }

  sendMessage() {
    const newMessage = this.chatForm.value.message?.trim();
    if (newMessage) {
      this.messages.push({ text: newMessage, sent: true });
      this.chatForm.reset();

      setTimeout(() => {
        this.messages.push({ text: 'Auto-reply: Got it!', sent: false });
      }, 1000);
    }
  }
}
