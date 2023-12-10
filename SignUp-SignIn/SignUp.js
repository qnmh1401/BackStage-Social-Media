// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,createUserWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
import { getFirestore,getDoc,collection,setDoc, getDocs,addDoc, deleteDoc,doc,onSnapshot   } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";
import { getStorage,ref, uploadBytes  } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuHj1q5drEfV-ePzGotcIjCt99-zTaLl8",
  authDomain: "backstage-ae24f.firebaseapp.com",
  projectId: "backstage-ae24f",
  storageBucket: "backstage-ae24f.appspot.com",
  messagingSenderId: "1013009118914",
  appId: "1:1013009118914:web:31e0688b7fb83343246d5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const sighInWithGoogle =  () =>{
    signInWithPopup(auth, provider)
    .then(async result => {
      const user = result.user;
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
        console.log(docSnap)
    if (docSnap.exists()) {
    alert("User has been register");
    console.log(docSnap.data())
    } else {
  
    setDoc(doc(db, "Users",user.uid), {
        uid: user.uid,
        email: user.email,
        password: "123456",
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        createdAt: Date.now(),
        lastLogInAt:Date.now()

      });
}

      
    })
    .catch(err => {
      alert(err);
    })
  }

  const btnSignUpWithGoogle = document.getElementById('SignUpWithGoogle')
  btnSignUpWithGoogle.addEventListener("click", async () => {
    await sighInWithGoogle();
    // window.location.href="../Main/HomePage/HomePage.html"
    window.location.replace('http://localhost:5500/SPCK/Main/HomePage/HomePage.html')
  })

