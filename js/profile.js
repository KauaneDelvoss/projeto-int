let currentUser1 = {};

function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser1.uid = user.uid;
      getUserInfo(user.uid);
      let userLabel = document.getElementById("navbarDropdown");
      userLabel.innerHTML = user.email;
    } else {
      swal
        .fire({
          icon: "success",
          title: "Redirecionando para a tela de autenticação",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("login.html");
          }, 1000);
        });
    }
  });
}

async function getUserInfo(uid) {
  const logUsers = await db.collection("profile").where("uid", "==", uid).get();
  let userInfo = document.getElementById("userInfo");
  if (logUsers.docs.length == 0) {
    userInfo.innerHTML = "Perfil não registrado";
  } else {
    userInfo.innerHTML = "Perfil registrado";
    profile = true;
    const userData = logUsers.docs[0];
    currentUser1.id = userData.id;
    currentUser1.firstName = userData.data().firstName;
    currentUser1.lastName = userData.data().lastName;
    document.getElementById("inputFirstName").value = currentUser1.firstName;
    document.getElementById("inputLastName").value = currentUser1.lastName;
  }
}

async function saveProfile() {
  const firstName = document.getElementById("inputFirstName").value;
  const lastName = document.getElementById("inputLastName").value;
  if (!profile) {
    await db.collection("profile").add({
      uid: currentUser1.uid,
      firstName: firstName,
      lastName: lastName,
    });
    getUserInfo(currentUser1.uid);
  } else {
    await db.collection("profile").doc(currentUser1.id).update({
      firstName: firstName,
      lastName: lastName,
    });
  }
}

window.onload = function () {
  getUser();
};
