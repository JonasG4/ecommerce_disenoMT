export function converToCode(text) {
  let textNoSpaces = text.toLowerCase().replace(/ /g, "-");

  let codeNoSpecialCharacters = textNoSpaces.replace(/[^\w-]/g, '');

  // Reemplazar "ñ" por "n"
  let sinEnie = codeNoSpecialCharacters.replace(/ñ/g, "n");

  // Reemplazar vocales tildadas sin tilde
  let newText = sinEnie.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return newText;
}
