import { Button } from "@material-tailwind/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseconfig";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        <div className="h-screen flex justify-center items-center flex-col ">
          <div className="w-[400px] bg-white py-20 sm:border-gray-500 border-solid sm:border-2 flex items-center justify-center rounded-lg">
            <div className="mx-auto">
                <div className="py-4 flex flex-col gap-2">
                    <h1 className="font-bold font-sans">Welcome to E-Wear</h1>
                    <p>Login to Your account to continue</p>
                </div>
                <form action="" onSubmit={signIn}>
                  <div className="flex flex-col gap-4 my-4">
                    <TextField
                    type="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                      <TextField
                        type="password"
                        name="password"
                        id="password"
                        label="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <Button type="submit" className="block hover:opacity-90">Log In</Button>
                </form>
                <p className="m-4 font-bold text-lg">OR</p>
                <button onClick={() => navigate("/signup")} className="text-green text-light-green-900">SignUp</button>
            </div>
          </div>
        </div>
  );
};

export default Login;
