export interface CheckoutRecordDto {
  id: string;
  returned: boolean;
  borrowedAt: string;
  returnedAt?: string;
  bookTitle: string;
}
