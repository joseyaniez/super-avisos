
interface CategoryRequest {
  categoryId: number,
  content: string,
  image: File | null,
  designType: string,
  publication?: {
    documentNumber?: string,
    phone?: string,
    voucherType: string,
    observation?: string,
    expirationDate: string,
  }
}

export const saveCategory = async (category: CategoryRequest) => {
  const response = await fetch('http://localhost:3000/notices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  const data = await response.json().catch(() => null);

  if(!response.ok) {
    let message: string[] = [];
    if(Array.isArray(data.message)) {
      message = data.message;
    } else if (typeof data.message === 'string') {
      message = [data.message];
    } else {
      message = [`El servidor respondió con un error: ${response.status} ${response.statusText}`];
    }
    throw new Error(message.join(', '));
  }

  return data;
}

