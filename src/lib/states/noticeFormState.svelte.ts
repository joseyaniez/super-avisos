type NoticeFormState = {
  noticeType: string,
  category: string,
  observation: string,
  documentNumber: string,
  image: File | null,
  clientName: string,
  clientNumber: string,
  paymentType: string,
  expirationDate: Date | null,
}

export const noticeFormState = $state<NoticeFormState>({
  noticeType: '',
  category: '',
  observation: '',
  documentNumber: '',
  image: null,
  clientName: '',
  clientNumber: '',
  paymentType: '',
  expirationDate: null,
})

export const noticeContent = $state({
  raw: '',
  imageUrl: '',
  designType: 'A',
});
