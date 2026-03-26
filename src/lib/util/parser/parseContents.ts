
export type ParsedText = {
  titulo: string;
  textoNormal: string;
  postdata: string;
};

export function parseEditorText(input: string): ParsedText {
  const lines = input.split(/\r?\n/);

  // Quitar líneas vacías solo al inicio y al final
  let start = 0;
  let end = lines.length - 1;

  while (start <= end && lines[start].trim() === '') start++;
  while (end >= start && lines[end].trim() === '') end--;

  const result: ParsedText = {
    titulo: '',
    textoNormal: '',
    postdata: ''
  };

  if (start > end) return result;

  const contentLines = lines.slice(start, end + 1);

  // Título: solo válido en la primera línea no vacía
  const firstLine = contentLines[0].trim();
  const titleMatch = firstLine.match(/^###(.*?)###$/);

  let bodyStart = 0;
  if (titleMatch) {
    result.titulo = titleMatch[1].trim();
    bodyStart = 1;
  }

  // Postdata: solo válida en la última línea no vacía
  const lastIndex = contentLines.length - 1;
  const lastLine = contentLines[lastIndex].trim();
  const postdataMatch = lastLine.match(/^\/\/\/(.*?)\/\/\/$/);

  let bodyEnd = contentLines.length;
  if (postdataMatch) {
    result.postdata = postdataMatch[1].trim();
    bodyEnd = lastIndex;
  }

  // Todo lo que queda en medio es texto normal
  const bodyLines = contentLines.slice(bodyStart, bodyEnd);

  result.textoNormal = bodyLines.join('\n').trim();

  return result;
}
