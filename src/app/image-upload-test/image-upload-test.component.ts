import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ImageUploadService } from '../shared/services/imageuploader/image-upload.service';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-image-upload-test',
  templateUrl: './image-upload-test.component.html',
  standalone:true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    CommonModule,
  ],
  styleUrls: ['./image-upload-test.component.scss']
})
export class ImageUploadTestComponent {
  selectedFiles: File[] = [];
  selectedFileNames: string[] = [];
  progressInfos: { value: number; fileName: string }[] = [];
  previews: string[] = [];
  message: string[] = [];
  uploadedFiles: { url: string; fileName: string }[] = []; // Move this to the top

  constructor(private uploadService: ImageUploadService) {}

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = [];
    this.previews = [];

    const files = event.target.files;
    if (files && files.length) {
      for (const file of files) {
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }

    this.selectedFileNames = this.selectedFiles.map(f => f.name);
  }

  uploadFiles(): void {
    this.message = [];
    this.progressInfos = [];

    this.selectedFiles.forEach((file, index) => {
      this.upload(index, file);
    });
  }

private readonly apiBaseUrl = 'http://188.138.101.4:6852';

upload(index: number, file: File): void {
  this.progressInfos[index] = { value: 0, fileName: file.name };

  this.uploadService.upload(file).subscribe({
    next: (event) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {
          this.progressInfos[index].value = Math.round(
            (100 * event.loaded) / event.total
          );
        }
      } else if (event instanceof HttpResponse) {
        this.message.push(`Uploaded ${file.name} successfully.`);

        if (event.body && event.body.data && event.body.data.url) {
          this.uploadedFiles.push({
            url: `${this.apiBaseUrl}${event.body.data.url}`,
            fileName: file.name,
          });
        }
      }
    },
    error: (err) => {
      this.progressInfos[index].value = 0;
      this.message.push(`Could not upload ${file.name}.`);
    }
  });
}
}
