import { Component, EventEmitter, Input, OnInit, Output, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChatService } from './services/chat.service';
import { IChat, IResponseChat } from './models/IGetChat';
import { ICompanyPriceRequest } from '../../../features/price-requests/models/icompany-price-request';
import { ISendMessage } from './models/ISendMessage';
import { UploadImage2Component } from '../../upload-image-2/upload-image-2.component';
import { ImageUploadService } from '../../services/upload2/image-upload.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, UploadImage2Component],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() showChat = false;
  @Input() currentPriceReq!: ICompanyPriceRequest;
  @Output() closeChat = new EventEmitter<void>();
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedFile: File | null = null;

  messages: IChat[] = [];
  currentUserId = 0;
  chatForm = new FormGroup({
    message: new FormControl('')
  });

  constructor(
    private _chatService: ChatService,
    private imageUploadService: ImageUploadService
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

  onFileSelect(file: File | null) {
    this.uploadedFile = file;
    console.log('Select file:', typeof file);
  }

  sendMessage() {
    const newMessage = this.chatForm.value.message?.trim();
    console.log(this.uploadedFile)
    if (this.uploadedFile) {
      this.imageUploadService.uploadImageBinary(this.uploadedFile.type, this.uploadedFile).subscribe((res) => {
        console.log(res)
      })
      // this._chatService.uploadFile(this.uploadedFile).subscribe({
      //   next: (fileUrl) => {
      //     console.log(fileUrl)
      //     this.sendChatMessage(newMessage, fileUrl);
      //   },
      //   error: (err) => {
      //     console.error('File upload error:', err);
      //   }
      // });
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
    // console.log(this.uploadedFile)
    // console.log(fileUrl)

    if (fileUrl) {
      data.medias.push({
        type: this.uploadedFile?.type || '',
        url: fileUrl
      });
    }
    // console.log(data)
    // console.log(this.uploadedFile)
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
        this.uploadedFile = null;
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
      this.uploadedFile = input.files[0];
      console.log('Selected file:', this.uploadedFile);
    }
  }
}
