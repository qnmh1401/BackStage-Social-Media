const favoriteBtn = document.getElementById('favorite-btn')
// function clickBtn(){
//     if(favoriteBtn.style="color:black"){
//         favoriteBtn.style="color:red"
//     }else{
//         favoriteBtn.style="color:black"
//     }
// }
// favoriteBtn.addEventListener("change",  clickBtn)
// clickBtn(favoriteBtn)


// console.log(favoriteBtn)
// const changeBgColor = (ev) => {
//     ev.currentTarget.style="color: red"
//   };
//   const EL_cards = document.querySelectorAll(".favorite");
//   EL_cards.forEach(EL => EL.addEventListener("click", changeBgColor));

//   console.log(EL_cards)

favoriteBtn.addEventListener("change", function (favoriteBtn) {
    console.log(favoriteBtn)
    if (this.style="color:black") {
      this.style="color:red"
    } else {
        this.style="color:black"
    }
  });




  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
document.getElementById('create-btn').addEventListener('click', openForm)
document.getElementById('close-btn').addEventListener('click', closeForm)

  
function postAndClose(){
  document.getElementById("myForm").style.display = "none";
}
document.getElementById('post-submit').addEventListener('click', postAndClose)


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  collection,
  setDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuHj1q5drEfV-ePzGotcIjCt99-zTaLl8",
  authDomain: "backstage-ae24f.firebaseapp.com",
  projectId: "backstage-ae24f",
  storageBucket: "backstage-ae24f.appspot.com",
  messagingSenderId: "1013009118914",
  appId: "1:1013009118914:web:31e0688b7fb83343246d5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const uid = localStorage.getItem('userId');
const docRef = doc(db, "Users", uid);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

const addImformation = async () => {
  
}