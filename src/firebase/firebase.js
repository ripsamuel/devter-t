import { getFirestore,  doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
// import firebase from "firebase";
import { app } from "./init";

const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // google authentication
const gihtubProvider = new GithubAuthProvider(); // github authentication
const fbAuthProvider = new FacebookAuthProvider(); // facebook authentication

/**
 * `createUserWithEmailAndPassword()` method from firebase auth is used to create new user
 * using email and password
 *
 *
 *
 * Email -> email variable takes users email address from email input
 * password -> password variable takes user password from password input
 *
 */
export async function CreateNewUser(email, password) {
  // let's add some validation
  if (!email) throw new Error("Email can not be empty");
  if (!password) throw new Error("Password can not be Empty");

  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  /**
   * after successfull login it will return users credentials like
   * email, userId, token, etc.
   */
  return userCredentials;
}

/**
 * If user alredy exists in firebase and want to login.
 * In last video we have seen how to create user "signup"
 * In this video we will see how to login existing user.
 */
export async function LoginUser(email, password) {
  // let's add some validation
  if (!email) throw new Error("Email can not be empty");
  if (!password) throw new Error("Password can not be Empty");

  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

/**
 * auth and provider is declared at the top of file
 */
export const GoogleAuth = async () => {
  const userAuth = await signInWithPopup(auth, provider);
  return userAuth;

  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   // IdP data available using getAdditionalUserInfo(result)
  //   // ...
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });
};


// export const onAuthStateChanged = (onChange) => {
//   return auth().onAuthStateChanged(onChange);
// };
// const mapUser = (user) => {

// }
const db = getFirestore(app)

export const checkAuth = (onChange) => {
  const auth = getAuth();
  onAuthStateChanged(auth, u => {
    // const normalizedUser = mapUser(u)
    // onChange(normalizedUser)
    console.log('user', u)
    onChange(u)
  })
};

export const GithubAuth = async () => {
  try {
    const userAuth = await signInWithPopup(auth, gihtubProvider);
    const { displayName, photoURL, uid} = userAuth.user;
    return {
      username: displayName,
      avatar: photoURL,
      url: `http://github.com/${displayName}`,
      uid
    };
  } catch (error) {
    // Maneja el error aquí si es necesario
    console.log("Error en GithubAuth:", error);
    throw error;
  }
};

export const FacebookAuth = async () => {
  try {
    const fbAuth = signInWithPopup(auth, fbAuthProvider);
    return fbAuth;
  } catch (error) {
    console.log(error);
  }
};

export const addDevit = async ({userId,userName, avatar}) => {
  try {
    await setDoc(doc(db, 'devtuits-test', 'whatthis-test'), {
      userId,
      userName,
      avatar,
    });
    console.log('Devit agregado correctamente');
  } catch (error) {
    console.log('avatar ->',avatar)
    console.error('Error al agregar el Devit:', error);
  }
};

// export const addDevit = ({avatar, content, userId, userName}) =>{
  
  // return db.collection('devter-t').doc({
    // avatar,
    // userName,
    // content,
    // userId,
  //   CreatedAt: Timestamp.fromDate(new Date()),
  //   likesCount :0,
  //   sharedCount: 0
  // })
  
// };