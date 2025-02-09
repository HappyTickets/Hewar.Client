import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [ButtonModule, Dialog, TranslateModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss'
})
export class DeletePopupComponent {
  @Input() visible = false;
  @Input() itemName:string | undefined = '';
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closePopup = new EventEmitter<void>();
  onDelete() {
    this.confirmDelete.emit();
  }
  onCancel() {
    this.closePopup.emit();
  }
}
