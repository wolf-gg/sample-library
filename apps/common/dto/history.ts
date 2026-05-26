import { UserDto } from "./user";

export interface CheckoutRecordDto {
  id: string;
  returned: boolean;
  borrowedAt: string;
  returnedAt?: string;
  bookTitle: string;
}

export type AdminCheckoutRecordDto = CheckoutRecordDto & {
  borrowerName?: string;
};

export interface UpdateRecordDto {
  borrowedAt: string;
}
