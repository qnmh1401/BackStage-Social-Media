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

// const { v4: uuidv4 } = require('uuid');

const sighInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      const userId = docSnap.data().uid;
      localStorage.clear();
      localStorage.setItem("user-id", userId);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        window.location.href =
          "http://localhost:5500/Main/HomePage/HomePage.html";
      } else {
        setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          email: user.email,
          password: "123456",
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          createdAt: Date.now(),
          lastLogInAt: Date.now(),
        });
        window.location.href =
          "http://localhost:5500/Main/HomePage/HomePage.html";
      }
    })
    .catch((err) => {
      alert(err);
    });
};

const btnSignUpWithGoogle = document.getElementById("SignUpWithGoogle");
btnSignUpWithGoogle.addEventListener("click", async () => {
  await sighInWithGoogle();
  // window.location.href="../Main/HomePage/HomePage.html"
});

// Sign up with form

const signUpWithForm = async () => {
  // const uid = uuidv4()
  const email = document.getElementById("email-phoneNumber-input").value;
  const password = document.getElementById("password-input").value;
  const firstName = document.getElementById("firstName-input").value;
  const lastName = document.getElementById("lastName-input").value;
  const displayName = firstName + " " + lastName;
  const phoneNumber = null;
  const photoURL = null;
  const createdAt = Date.now();
  const lastLogInAt = Date.now();

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // // Signed up
      const user = userCredential.user;
      console.log("User info", user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert("User has been register");
        console.log(docSnap.data());
      } else {
        setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          email: email,
          password: password,
          displayName: displayName,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: null,
          photoURL: null,
          createdAt: Date.now(),
          lastLogInAt: Date.now(),
        });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// const checkValue = () => {
//   if(email === ""){
//     alert("Please enter email")
//   }else if (!filter.test(email.value)) {
//     alert("Wrong email");
//   }

//   if(password === ""){
//     alert("Please enter password")
//   }

//   if(firstName === ""){
//     alert("Please enter your first name")
//   }

//   if(lastName === ""){
//     alert("Please enter your last name")
//   }
// }

const btnSignUpWithForm = document.getElementById("SignUpWithForm");

btnSignUpWithForm.addEventListener("click", (e) => {
  e.preventDefault();
  signUpWithForm();
  //  checkValue()
});
