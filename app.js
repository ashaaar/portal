// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword, }
  
   from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
   import{
    getFirestore,
    doc,
    addDoc,
    getDocs,
    collection,
   }from "https://www.gstatic.com/firebasejs/10.13.2/firebase-Firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYnGrOQOzMqQPPCtGaeqe9o_780oXzQaU",
  authDomain: "student-portaol.firebaseapp.com",
  projectId: "student-portaol",
  storageBucket: "student-portaol.appspot.com",
  messagingSenderId: "754646673088",
  appId: "1:754646673088:web:ad484261151d962dbb6f25",
  measurementId: "G-YHG32X6WN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// DOM Elements
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");
const logout_admin_btn = document.getElementById("logout-admin-btn");

const studentFirstname = document.getElementById("student-firstname");
const Student_ID = document.getElementById("Student_ID");
const studentEmail = document.getElementById("student-email");
const studentPassword = document.getElementById("student-password");
const studentCnic = document.getElementById("student-cnic");
const addStudentBtn = document.getElementById("add-student-btn");

const course = document.getElementById("course");
const studentId = document.getElementById("student-id");
const marks = document.getElementById("marks");
const totalMarks = document.getElementById("total-marks");
const grade = document.getElementById("grade");
const uploadMarksBtn = document.getElementById("upload-marks-btn");

loginBtn.addEventListener("click", login);

function login() {
	const email = loginEmail.value;
	const password = loginPassword.value;

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			if (email == "abdussami@gmail.com" && password == "03211132868") {
				alert("admin login");
				document.getElementById("admin-container").style.display = "block";
				document.getElementById("login-container").style.display = "none";
			} else {
				alert("user login");
				document.getElementById("student-container").style.display = "block";
				document.getElementById("login-container").style.display = "none";
			}

			// ...
		})
		.catch((error) => {
			alert(error);
		});
}

addStudentBtn.addEventListener("click", addstudent);

async function addstudent() {
	const email = studentEmail.value;
	const password = studentPassword.value;
	const student_collection = collection(db, "Student");

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			alert("student created");
			studentFirstname.value = "";
			Student_ID.value = "";
			studentCnic.value = "";
			studentPassword.value = "";
			studentEmail.value = "";
			// ...
		})
		.catch((error) => {
			alert(error);

			// ..
		});
	// Save student details in Firestore
	try {
		const obj = {
			firstname: studentFirstname.value,
			Student_ID: Student_ID.value,
			email: email,
			cnic: studentCnic.value,
		};
		const docRef = await addDoc(student_collection, obj);
		console.log(docRef.id);
		// Store user role in a 'users' collection
		await addDoc(doc(db, "users", user.uid), { role: "student" });
	} catch (error) {
		console.log(error);
	}
}

const marks_collection = collection(db, "marks");
uploadMarksBtn.addEventListener("click", Addmarks);

async function Addmarks() {
	try {
		const docRef = await addDoc(marks_collection, {
			course: course.value,
			studentId: studentId.value,
			marks: marks.value,
			totalMarks: totalMarks.value,
			grade: grade.value,
		});
		console.log(docRef);

		alert("Student marks successfully uploaded");

		course.value = "";
		studentId.value = "";
		marks.value = "";
		totalMarks.value = "";
		grade.value = "";
	} catch (error) {
		alert(error);
	}
}
