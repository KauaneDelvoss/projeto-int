const db = firebase.firestore()
let cadastros = []
let currentUser = {}


function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid
      readTasks()
      let userLabel = document.getElementById("navbarDropdown")
      userLabel.innerHTML = user.email
    } else {
      swal
        .fire({
          icon: "success",
          title: "Redirecionando para a tela de autenticação",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("login.html")
          }, 1000)
        })
    }
  })
}






async function saveRegister() {
  const firstName = document.getElementById("inputFirstName").value
  const rg = document.getElementById("inputRG").value
  const cpf = document.getElementById("inputCPF").value
  if (!profile) {
    await db.collection("Cadastro").add({
      uid: currentUser.uid,
      firstName: firstName,
      rg: rg,
      cpf: cpf,
    })
    getUserInfo(currentUser.uid)
  } else {
    await db.collection("Cadastro").doc(currentUser.id).update({
      firstName: firstName,
      rg: rg,
      cpf: cpf,
    })
  }
  readCadastros()
}






window.onload = function () {
  getUser()
}
