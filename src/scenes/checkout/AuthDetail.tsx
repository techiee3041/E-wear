import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../../firebaseconfig"
import { useNavigate } from "react-router-dom"


const AuthDetail = () => {
    const [authUser, setAuthUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user)
                navigate("/")
            }
            else {
                setAuthUser(null)
            }
        })
        return () => listen()
    }, [])

    const userSignOut = () => {
        auth.signOut().then(() => {
            alert('User signed out succcessfully')
        }).catch((error) => {console.log(error)})
    }
  return (
    <div className="font-sans">
      {authUser ? <button onClick={userSignOut}>logout</button> : "Sign In"}
    </div>
  )
}

export default AuthDetail
