import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChatService } from './services/chat.service';
import { IChat, IResponseChat } from './models/IGetChat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @Input() showChat = false
  @Output() closeChat = new EventEmitter<void>();

  messages: IChat[] = []
  currentUserId  = 40
  chatForm = new FormGroup({
    message: new FormControl('')
  });

  constructor(private _chatService:ChatService) {
  }
  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.currentUserId = userInfo.userId
    }
    this._chatService.getChat(1).subscribe((res:IResponseChat) => {
      this.messages = res.data
      console.log(res.data)
    })
  }

  toggleChat() {
    this.closeChat.emit();
  }

  sendMessage() {
    const newMessage = this.chatForm.value.message?.trim();
    if (newMessage) {
      console.log('yes')
    }
  }
}
