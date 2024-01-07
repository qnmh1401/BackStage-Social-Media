// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword    } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
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

const querySnapshot = getDocs(collection(db, "Users"));


// sign in with google
const signInWithGoogle =  () =>{
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

  const btnSignInWithGoogle = document.getElementById('SignInWithGoogle')
  btnSignInWithGoogle.addEventListener("click", async () => {
    await signInWithGoogle();
    // window.location.href="../Main/HomePage/HomePage.html"
    window.location.replace('http://localhost:5500/SPCK/Main/HomePage/HomePage.html')
  })

  //SIGN IN WITH FORM

  const signIn = () => {
    const email = document.getElementById('email-input').value
    const password = document.getElementById('password-input').value
    if(!email || !password) {
        alert("Please enter your email and password")
    }else{
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const userId = docSnap.data().uid
            localStorage.clear();
            localStorage.setItem("user-id",userId);
            window.location.href="http://127.0.0.1:5500/Main/HomePage/HomePage.html"
              
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
}

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert('Wrong username or password')
  });
  }
    }
    

  const btnSignInWithForm = document.getElementById('SignInWithForm')
  btnSignInWithForm.addEventListener("click", async (e) => {
   e.preventDefault(); 
   await signIn();

;

    
   
  })