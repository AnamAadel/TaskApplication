import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { app } from "../../firebase.config";
const myContext = createContext(null);

export const AuthContexts = () => {
  return useContext(myContext);
}

function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [mongoCurrentUser, setMongoCurrentUser] = useState(null)
  const [cartProduct, setCartProduct] = useState([]);
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const storage = getStorage(app)
  const authProviderGoogle = new GoogleAuthProvider();
  const authProviderGithub = new GithubAuthProvider();
  const authProviderFacebook = new FacebookAuthProvider();


  const createUser = (email, password, userName, file) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password).then(result => {
      // sendEmailVerification(auth.currentUser).then(()=> console.log("email varification send to  your email!")).catch(err => console.log(err))

      const storageRef = ref(storage, `users/${result.user.uid}.jpg`);

      console.log(storageRef.fullPath)


      uploadBytes(storageRef, file).then((snapshot) => {

        getDownloadURL(storageRef).then((url => {
          const userImage = file ? url : null;

          console.log(url)
          setUserPhoto(userImage);
          setUserName(userName);

          updateProfile(auth.currentUser, { displayName: userName, photoURL: userImage }).then(async () => {
            console.log("profile updated!")
            setLoading(false);

            const user = { userName, email, userImage, creationTime: result.user.metadata.creationTime, lastLoginTime: result.user.metadata.lastSignInTime, status: "active" }
            try {
              const res = await fetch("https://assignment-10-server-6yim5dfbc-aadelbanat8991-gmailcom.vercel.app/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(user)
              })
              const data = await res.json()
              console.log(data);
            } catch (error) {
              console.log(error)
            }


          }).catch(error => console.log(error));
        })).catch((err) => console.log(err))

      }).catch((err) => console.log(err))

      setUser(result.user)
      console.log(result.user);
      toast.success("User created successfully!", {
        theme: "colored",
        toastId: "success"

      });
    }).catch(error => {
      console.log(error)
      setLoading(false);
      toast.warn(`${error}`, {
        theme: "colored"
      });
    })
    // const user = auth.currentUser;
  }

  const signInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then(result => {
      setUser(result.user)
      console.log(result);
      setLoading(false);
      toast.success("User login successfully!", {
        theme: "colored",
        toastId: "success"

      });
    }).catch(error => {
      console.log(error)
      setLoading(false);
      toast.warn('An error happened', {
        theme: "colored"
      });
    })
  }

  const logOutUser = () => {
    return signOut(auth);
  }


  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, authProviderGoogle).then(async (result) => {
      setUser(result.user)
      setLoading(false);
      toast.success("Login successfully!", {
        theme: "colored",
        toastId: "success"

      });

      const user = { userName: result.user.displayName, email: result.user.email, userImage: result.user.photoURL, creationTime: result.user.metadata.creationTime, lastLoginTime: result.user.metadata.lastSignInTime, status: "active" }

      try {
        const res = await fetch("https://assignment-10-server-6yim5dfbc-aadelbanat8991-gmailcom.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log(data);
      } catch (error) {
        console.log(error)
      }


    }).catch(error => {
      console.log(error)
      setLoading(false);
      toast.warn(`An error happened`, {
        theme: "colored"
      });
    })
  }

  const handleGithubSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, authProviderGithub).then(async (result) => {
      console.log(result);
      setUser(result.user)
      setLoading(false);

      const user = { userName: result.user.displayName, email: result.user.email, userImage: result.user.photoURL, creationTime: result.user.metadata.creationTime, lastLoginTime: result.user.metadata.lastSignInTime, status: "active" }
      
      try {
        const res = await fetch("https://assignment-10-server-6yim5dfbc-aadelbanat8991-gmailcom.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log(data);
      } catch (error) {
        console.log(error)
      }


      toast.success("User login successfully!", {
        theme: "colored",
        toastId: "success"

      });
    }).catch(error => {
      console.log(error)
      setLoading(false);
      toast.warn(`An error happened`, {
        theme: "colored"
      });
    })
  }

  const handleFacebookSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, authProviderFacebook).then(result => {
      console.log(result);
      setUser(result.user)
      setLoading(false);
    }).catch(error => {
      console.log(error)
    })
  }


  const authValue = {
    handleGoogleSignIn,
    handleGithubSignIn,
    handleFacebookSignIn,
    createUser,
    signInUser,
    logOutUser,
    user,
    loading,
    userPhoto,
    userName,
    mongoCurrentUser,
    cartProduct,
    setCartProduct
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);

      async function fetchCurrentUser(){
        try {
          const res = await fetch(`https://assignment-10-server-6yim5dfbc-aadelbanat8991-gmailcom.vercel.app/users/current-user`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({email: currentUser?.email})
          });
          const jsonData = await res.json();
          setMongoCurrentUser(jsonData);
          setCartProduct(jsonData.products)
          console.log(jsonData)
        } catch (error) {
          console.log(error)
        }
      }
  
      fetchCurrentUser();

      setUser(currentUser);
      setUserName(currentUser?.displayName);
      setUserPhoto(currentUser?.photoURL)
      setLoading(false)
    })

    return unsubscribe
  }, [auth])

  return (
    <myContext.Provider value={authValue}>
      {children}
    </myContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node,
  ]).isRequired,
};

export default AuthProvider




