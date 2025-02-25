import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PriceRequestsService } from '../../services/price-requests.service';
import { TooltipModule } from 'primeng/tooltip';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { ChatComponent } from "../../../../shared/components/chat/chat.component";
import { ChatService } from '../../../../shared/components/chat/services/chat.service';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { IPriceRequest } from '../../models/iprice-request';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-company-price-requests',
  standalone: true,
  imports: [CommonModule, IconFieldModule, TooltipModule, InputTextModule, InputIconModule, ButtonModule, TableModule, ToastModule, InputNumberModule, FormsModule, TranslatePipe, RouterModule, DeletePopupComponent, ChatComponent, HasPermissionDirective],
  templateUrl: './company-price-requests.component.html',
  styleUrl: './company-price-requests.component.scss',
})
export class CompanyPriceRequestsComponent implements OnInit {
  private priceRequestsService = inject(PriceRequestsService);
  private _chatService = inject(ChatService);
  isChatVisible = false;
  priceRequests: IPriceRequest[] = [];
  searchTerm = '';
  currentId= 0;
  showHidePopUp = false;
  currentPriceReq!:IPriceRequest;

  ngOnInit(): void {
    this.getPrices();
  }
  toggleActions(service: IPriceRequest) {
    service.showActions = !service.showActions;
  }

  getPrices(): void {
    this.priceRequestsService.getMyCompanyRequests().subscribe((res) => {
      if (res.data) this.priceRequests = res.data;
    });
  }

  onCloseChat() {
    this.isChatVisible = false;
  }

  toggleChat(service: IPriceRequest) {
    this.currentPriceReq = service
    if(service.chatId === null){
      this._chatService.initializePriceRequestChat(service.id).subscribe((res) => {
        console.log(res)
      })
    }
    this.isChatVisible = !this.isChatVisible;
    console.log(service)
    // console.log(this.currentPriceReq)
    // console.log(this.isChatVisible)
    // console.log('price request id = ' + service.id)
    // console.log('chat id = ' + service.chatId)
  }

  openChat(): void {
    // this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }

  hide() {
    this.showHidePopUp = false;
    this.priceRequestsService.hide(this.currentId).subscribe(() => {
      this.getPrices();
    });
  }
}
