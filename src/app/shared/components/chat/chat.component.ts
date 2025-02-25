import { Component, EventEmitter, Input, OnInit, Output, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChatService } from './services/chat.service';
import { IChat, IResponseChat } from './models/IGetChat';
import { ISendMessage } from './models/ISendMessage';
import { IPriceRequest } from '../../../features/price-requests/models/iprice-request';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() showChat = false;
  @Input() currentPriceReq!: IPriceRequest;
  @Output() closeChat = new EventEmitter<void>();
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  messages: IChat[] = [];
  currentUserId = 0;
  chatForm = new FormGroup({
    message: new FormControl('')
  });
  selectedFile: File | null = null;

  constructor(
    private _chatService: ChatService,
  ) {}

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.currentUserId = userInfo.userId;
    }
  }

  ngOnChanges(): void {
    this.getChat();
  }

  getChat() {
    if (this.currentPriceReq && this.currentPriceReq.chatId) {
      this._chatService.getChat(this.currentPriceReq.chatId).subscribe((res: IResponseChat) => {
        this.messages = res.data;
        setTimeout(() => this.scrollToEnd(), 100);
      });
    }
  }

  toggleChat() {
    this.closeChat.emit();
  }

  sendMessage() {
    const newMessage = this.chatForm.value.message?.trim();
    console.log(this.selectedFile)
    if (this.selectedFile) {
      this._chatService.uploadFile(this.selectedFile).subscribe({
        next: (fileUrl) => {
          console.log(fileUrl)
          this.sendChatMessage(newMessage, fileUrl);
        },
        error: (err) => {
          console.error('File upload error:', err);
        }
      });
    } else {
      this.sendChatMessage(newMessage, '');
    }
  }

  sendChatMessage(content?: string, fileUrl?: string) {
    console.log(content)
    console.log(fileUrl)
    const data : ISendMessage = {
      content: content || '',
      medias: [],
      chatId: this.currentPriceReq.chatId ?? null,
    };
    // console.log(data)
    // console.log(this.selectedFile)
    // console.log(fileUrl)

    if (fileUrl) {
      data.medias.push({
        type: this.selectedFile?.type || '',
        url: fileUrl
      });
    }
    // console.log(data)
    // console.log(this.selectedFile)
    // console.log(fileUrl)

    this._chatService.sendMessage(data).subscribe({
      next: () => {
        this.getChat();
        this.scrollToEnd();
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        this.chatForm.reset();
        this.selectedFile = null;
        if (this.fileInput && this.fileInput.nativeElement) {
          this.fileInput.nativeElement.value = '';
        }
      }
    });
  }

  scrollToEnd(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }
}
