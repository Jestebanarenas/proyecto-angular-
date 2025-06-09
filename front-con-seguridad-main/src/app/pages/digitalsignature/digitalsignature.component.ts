import { Component, OnInit } from '@angular/core';
import { DigitalSignature } from 'src/app/models/digitalsignature.model';
import { DigitalSignatureService } from 'src/app/services/digitalsignature.service';

@Component({
  selector: 'app-digital-signature',
  templateUrl: './digitalsignature.component.html',
  styleUrls: ['./digitalsignature.component.scss']
})
export class DigitalSignatureComponent implements OnInit {
  signature: DigitalSignature | null = null;
  selectedFile: File | null = null;
  isLoading = false;
  userId = 1; // Ajustar según contexto real

  constructor(private digitalSignatureService: DigitalSignatureService) {}

  ngOnInit(): void {
    this.fetchSignature();
  }

  fetchSignature(): void {
    this.isLoading = true;
    this.digitalSignatureService.getByUserId(this.userId).subscribe({
      next: (data) => {
        this.signature = data;
        this.isLoading = false;
      },
      error: () => {
        this.signature = null;
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadSignature(): void {
    if (!this.selectedFile) return;
    this.digitalSignatureService.create(this.userId, this.selectedFile).subscribe(() => {
      this.fetchSignature();
      this.selectedFile = null;
    });
  }

  getSignatureImageUrl(): string | null {
    return this.signature?.photo
      ? this.digitalSignatureService.getSignatureImageUrl(this.signature.photo)
      : null;
  }
}
