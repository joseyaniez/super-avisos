class NoticeFormStateA {
  noticeType = $state("Mediano");
  category = $state("");
  observation = $state("");
  documentNumber = $state("");
  image = $state<File | null>(null);
  clientName = $state("");
  clientNumber = $state("");
  paymentType = $state("");
  expirationDate = $state("");

  rawContent = $state("");
  imageUrl = $state("");
  designType = $state("I");

  errorMessages = $state<string[]>([]);

  reset(){
    this.noticeType = "Mediano";
    this.category = "";
    this.observation = "";
    this.documentNumber = "";
    this.image = null;
    this.clientName = "";
    this.clientNumber = "";
    this.paymentType = "";
    this.expirationDate = "";
    this.rawContent = "";
    this.imageUrl = "";
    this.designType = "I";
    this.errorMessages = [];
  }

  formValidate(): boolean {
    if(this.category.trim() === '') {
      errorMessages.push('La categoría es requerida.');
    }
    // Validar la fecha correctamente
    if(this.expirationDate.trim() === '') {
      errorMessages.push('La fecha de vencimiento es requerida.');
    } else {
      const today = new Date();
      const expirationDate = new Date(this.expirationDate);
      if(isNaN(expirationDate.getTime())) {
        this.errorMessages.push('La fecha de vencimiento no es válida.');
      } else if(expirationDate < today) {
        this.errorMessages.push('La fecha de vencimiento debe ser futura.');
      }
    }
    if(noticeContent.raw.trim() === '') {
      this.errorMessages.push('El contenido del aviso es requerido.');
    }
    if(this.clientNumber.trim() === '') {
      this.errorMessages.push('El número de cliente es requerido.');
    } else if(this.clientNumber.trim().length != 9) {
      this.errorMessages.push('El número de cliente debe tener 9 dígitos.');
    }

    if(this.paymentType == 'Boleta' || this.paymentType == 'Factura') {
      if(this.documentNumber.trim() === '') {
        this.errorMessages.push('El número de documento es requerido para el tipo de pago seleccionado.');
      } else if(this.documentNumber.trim().length != 8) {
        this.errorMessages.push('El número de documento debe tener 8 dígitos.');
      }
    }

    return this.errorMessages.length === 0;

  }
}

export const noticeFormStateA = new NoticeFormStateA();

type NoticeFormState = {
  noticeType: string,
  category: string,
  observation: string,
  documentNumber: string,
  image: File | null,
  clientName: string,
  clientNumber: string,
  paymentType: string,
  expirationDate: string
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
  expirationDate: '',
})

export const noticeContent = $state<NoticeContent>({
  raw: '',
  imageUrl: '',
  designType: 'I',
});

export const errorMessages = $state<string[]>([]);

export const resetstates = () => {
  noticeFormState.noticeType = 'Mediano';
  noticeFormState.category = '';
  noticeFormState.observation = '';
  noticeFormState.documentNumber = '';
  noticeFormState.image = null;
  noticeFormState.clientName = '';
  noticeFormState.clientNumber = '';
  noticeFormState.paymentType = '';
  noticeFormState.expirationDate = '';

  noticeContent.raw = '';
  noticeContent.imageUrl = '';
  noticeContent.designType = 'I';

  errorMessages.length = 0; // Limpiar el array de mensajes de error
}

export const noticeValidate = (noticeForm: NoticeFormState, noticeContent: NoticeContent): boolean => {
  if(noticeForm.category.trim() === '') {
    errorMessages.push('La categoría es requerida.');
  }
  // Validar la fecha correctamente
  if(noticeForm.expirationDate.trim() === '') {
    errorMessages.push('La fecha de vencimiento es requerida.');
  } else {
    const today = new Date();
    const expirationDate = new Date(noticeForm.expirationDate);
    if(isNaN(expirationDate.getTime())) {
      errorMessages.push('La fecha de vencimiento no es válida.');
    } else if(expirationDate < today) {
      errorMessages.push('La fecha de vencimiento debe ser futura.');
    }
  }
  if(noticeContent.raw.trim() === '') {
    errorMessages.push('El contenido del aviso es requerido.');
  }
  if(noticeForm.clientNumber.trim() === '') {
    errorMessages.push('El número de cliente es requerido.');
  } else if(noticeForm.clientNumber.trim().length != 9) {
    errorMessages.push('El número de cliente debe tener 9 dígitos.');
  }

  if(noticeForm.paymentType == 'Boleta' || noticeForm.paymentType == 'Factura') {
    if(noticeForm.documentNumber.trim() === '') {
      errorMessages.push('El número de documento es requerido para el tipo de pago seleccionado.');
    } else if(noticeForm.documentNumber.trim().length != 8) {
      errorMessages.push('El número de documento debe tener 8 dígitos.');
    }
  }

  return errorMessages.length === 0;

}
