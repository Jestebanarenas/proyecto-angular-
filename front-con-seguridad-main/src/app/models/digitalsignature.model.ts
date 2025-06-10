import { User } from "./user.model";

export interface DigitalSignature {
  id: number;
  user_id: number;
  photo: string; // Ruta relativa de la imagen
  created_at: Date;
  updated_at?: Date;
}