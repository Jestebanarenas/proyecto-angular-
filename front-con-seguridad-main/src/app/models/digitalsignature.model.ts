export interface DigitalSignature {
  id: number;
  signatureData: string; // Puede ser base64 o una URL al archivo de firma
  createdAt: Date;
  updatedAt?: Date;
  user: User;
}