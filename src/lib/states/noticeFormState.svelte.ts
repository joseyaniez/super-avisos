type NoticeFormState = {
  noticeType: string,
  category: string,
  observation: string,
  documentNumber: string,
  image: File | null,
  clientName: string,
  paymentType: string,
}

export const noticeFormState = $state<NoticeFormState>({
  noticeType: '',
  category: '',
  observation: '',
  documentNumber: '',
  image: null,
  clientName: '',
  paymentType: '',
})

export const noticeContent = $state({
  raw: '',
});
