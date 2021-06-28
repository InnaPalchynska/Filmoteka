
function showTextError(nameConrainerHeader, messageErrorHeader) {
  nameConrainerHeader.textContent = messageErrorHeader;
}

function insertContentTpl(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}
// function insertContent(nameContainer, content) {
//   nameContainer.insertAdjacentHTML('beforeend', content);
// }

export { showTextError, insertContentTpl };