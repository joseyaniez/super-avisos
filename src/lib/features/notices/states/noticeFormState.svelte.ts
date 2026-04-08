class NoticeFormState {
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
  }

  formValidate(): string[] {
    let errorMessages: string[] = [];
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
        errorMessages.push('La fecha de vencimiento no es válida.');
      } else if(expirationDate < today) {
        errorMessages.push('La fecha de vencimiento debe ser futura.');
      }
    }
    if(this.rawContent.trim() === '') {
      errorMessages.push('El contenido del aviso es requerido.');
    }
    if(this.clientNumber.trim() === '') {
      errorMessages.push('El número de cliente es requerido.');
    } else if(this.clientNumber.trim().length != 9) {
      errorMessages.push('El número de cliente debe tener 9 dígitos.');
    }

    if(this.paymentType == 'Boleta' || this.paymentType == 'Factura') {
      if(this.documentNumber.trim() === '') {
        errorMessages.push('El número de documento es requerido para el tipo de pago seleccionado.');
      } else if(this.documentNumber.trim().length != 8 && this.paymentType == 'Boleta') {
        errorMessages.push('El número de DNI debe tener 8 dígitos.');
      } else if(this.documentNumber.trim().length != 10 && this.paymentType == 'Factura') {
        errorMessages.push('El número de RUC debe tener 8 dígitos.');
      }
    }

    return errorMessages;

  }
}

export const noticeFormState = new NoticeFormState();

