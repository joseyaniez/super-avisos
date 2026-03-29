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

type NoticeContent = {
  raw: string,
  imageUrl: string,
  designType: string,
}

export const noticeFormState = $state<NoticeFormState>({
  noticeType: 'Mediano',
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
  designType: 'I',
});


export const noticeValidate = (noticeForm: NoticeFormState, noticeContent: NoticeContent) => {

}
