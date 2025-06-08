import { Component, OnInit } from '@angular/core';
import { DigitalSignature } from 'src/app/models/digitalsignature.model';
import { DigitalSignatureService } from 'src/app/services/digitalsignature.service';

@Component({
  selector: 'app-digital-signature',
  templateUrl: './digital-signature.component.html',
  styleUrls: ['./digital-signature.component.scss']
})
export class DigitalSignatureComponent implements OnInit {
  signature: DigitalSignature | null = null;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(private digitalSignatureService: DigitalSignatureService) {}

  ngOnInit(): void {
    this.fetchSignature();
  }

  fetchSignature(): void {
    this.isLoading = true;
    this.digitalSignatureService.getMySignature().subscribe({
      next: (data) => {
        this.signature = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadSignature(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.digitalSignatureService.uploadSignature(formData).subscribe({
      next: () => {
        this.fetchSignature();
        this.selectedFile = null;
      }
    });
  }
}
