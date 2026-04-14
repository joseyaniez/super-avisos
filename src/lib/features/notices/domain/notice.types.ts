export type NoticeResponse = {
  id: number;
  content: string;
  imagePath: string | null;
  designType: string; // 👈 mejor tipado como literal
  category: {
    id: number;
    content: string;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
  };
  publication?: {
    id: number;
    documentNumber?: string;
    phone: string;
    observation: string | null;
    voucherType: string;
    expirationDate: string;
    createdAt: string;
    updatedAt: string;

  }
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
};

