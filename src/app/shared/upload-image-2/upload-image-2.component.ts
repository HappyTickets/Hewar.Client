import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { DxFileUploaderModule, DxProgressBarModule } from 'devextreme-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MessageModule } from 'primeng/message';
import { LocalizationService } from '../../core/services/localization/localization.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-image-2',
  standalone: true,
  imports: [
    CommonModule,
    NgxDropzoneModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    DragDropModule,
    MessageModule,
    TranslateModule,
  ],
  templateUrl: './upload-image-2.component.html',
  styleUrl: './upload-image-2.component.scss',
})
export class UploadImage2Component {
  @Output() fileSelected = new EventEmitter<File | null>();
  file: File | null = null;
  imagePreview: string | null = null;
  errorMessage: string = '';
  language!: 'ar' | 'en';
  private languageSubscription: Subscription;
  uniqueId: string = Math.random().toString(36).substring(2, 15);
  constructor(private localizationService: LocalizationService) {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      (lang) => {
        {
          this.language = lang;
        }
      }
    );
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.handleFile(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  removeFile() {
    this.file = null;
    this.imagePreview = null;
    this.fileSelected.emit(null);
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }
  handleFile(file: File) {
    this.errorMessage = ''; // Clear previous errors
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'app.image-upload.filetype';
      return;
    }

    if (file.size > maxSizeInBytes) {
      this.errorMessage = 'app.image-upload.morethan-2';
      return;
    }

    this.file = file;
    this.fileSelected.emit(file);

    const reader = new FileReader();
    reader.onload = (e: any) => (this.imagePreview = e.target.result);
    reader.readAsDataURL(file);
  }
}
