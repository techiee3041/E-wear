import { Button } from "@material-tailwind/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseconfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        console.log(userCredentials);
      }
    ).catch((error) => {
        console.log(error);
    });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-2/5 bg-white py-20">
        <h1>Welcome to the E-Wear</h1>
        <p>Login or create an account to continue</p>
        <form action="" onSubmit={signIn}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="block hover:opacity-90">Log In</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
