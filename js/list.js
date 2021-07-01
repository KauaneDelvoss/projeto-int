const db = firebase.firestore();
let cadastros = [];
function createDelButton(cadastro) {
  const newButton = document.createElement("button");
  newButton.setAttribute("class", "btn btn-warning");
  newButton.appendChild(document.createTextNode("Excluir"));
  newButton.setAttribute("onclick", `deleteCadastro("${cadastro.id}")`);
  return newButton;
}

function renderCadastros() {
  let list = document.getElementById("Listacadastros");
  console.log(cadastros);
  list.innerHTML = "";
  for (let cadastro of cadastros) {
    const newItem = document.createElement("li");
    newItem.setAttribute(
      "class",
      "list-group-item d-flex justify-content-between border"
    );
    newItem.appendChild(document.createTextNode(cadastro.firstName));
    newItem.appendChild(createDelButton(cadastro));
    list.appendChild(newItem);
  }
}

async function readCadastros() {
  cadastros = [];
  const logCadastros = await db.collection("Cadastro").get();
  for (doc of logCadastros.docs) {
    cadastros.push({
      id: doc.id,
      firstName: doc.data().firstName,
    });
  }
  renderCadastros();
}

async function deleteCadastro(id) {
  await db.collection("Cadastros").doc(id).delete();
  readCadastros();
}
window.onload = function () {
  readCadastros();
};
