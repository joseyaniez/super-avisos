import type { NoticeResponse } from "../domain/notice.types";

export const loadNotices = async () => {
  try {
    const response = await fetch('http://localhost:3000/notices');
    if(!response.ok){
      const errorResponse = await response.json()
      const errorMessage = errorResponse.message || 'Error al obtener los avisos';
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data as NoticeResponse[];
  } catch (error) {
    throw new Error('Error al obtener los avisos');
  }
}

export const deleteNotice = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/notices/${id}`, {
      method: 'DELETE',
    })
    if(!response.ok){
      const errorResponse = await response.json()
      const errorMessage = errorResponse.message || 'Error al eliminar el aviso';
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error('Error al eliminar el aviso');
  }
}
