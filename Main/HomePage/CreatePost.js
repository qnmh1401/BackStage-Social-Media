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

const createPost = async () => {
  // const uid = uuidv4()
  const content = document.getElementById("content").value;
  const createdAt = Date.now();
  const title = null;
  const image = null;
  const deletedAt = null;

  let res = null;

  const uid = localStorage.getItem("user-id");

  const formFile = document.getElementById("file");

  const file = formFile.files[0];

  if (uid) {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      console.log(storageRef);
      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      res = await getDownloadURL(storageRef);
    }

    setDoc(doc(db, "Posts", Math.random().toString(20)), {
      userId: uid,
      content: content,
      createdAt: createdAt,
      title: title,
      image: res != null ? res : image,
      deletedAt: deletedAt,
    });
  } else {
    alert("ERROR");
  }
};

const postBtn = document.getElementById("post-submit");
postBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createPost();
  addPost()
});

const addPost = (docs) => {
  const postContainer = document.getElementById("post-container");
  const post = document.createElement("div");
  post.setAttribute("class", "post");
  postContainer.appendChild(post);
post.innerHTML = `
    <div>
      <div class="avatar-name">
        <img src="../Image/img7.png" />
        <p>Nguyen Van A</p>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div class="post-title">
        <p>
          ${docs.data().content}
        </p>
      </div>
      <div class="img-in-post">
        <img class="img-post" src="${docs.data().image}" />
      </div>
      <div class="post-tools">
        <div class="favorite">
          <i id="favorite-btn" class="fa-solid fa-heart"></i>
        </div>
        <div class="comment">
          <i class="fa-solid fa-comment"></i>
          <div class="comment-input">
            <input type="text" />
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <div class="share">
          <i class="fa-solid fa-share"></i>
        </div>
      </div>
    </div>
  `;

  
};



const updateAgainList = (doc) => {
  
  addPost(doc);
}

const unsubscribe = onSnapshot(collection(db, "Users"), (querySnapshot) => {
  
  querySnapshot.forEach((doc) => {
    updateAgainList(doc)
    console.log(doc.data());
  })
});