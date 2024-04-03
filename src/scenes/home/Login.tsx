import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseconfig";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const signIn = (values, { setSubmitting, setFieldError }) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredentials) => {
        console.log(userCredentials);
        // Optionally, you can navigate to another page after successful sign-in
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setFieldError('password', 'Invalid email or password');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="w-[400px] bg-white py-20 sm:border-gray-500 border-solid sm:border-2 flex items-center justify-center rounded-lg">
        <div className="mx-auto">
          <div className="py-4 flex flex-col gap-2">
            <h1 className="font-bold font-sans text-2xl">Welcome to E-Wear</h1>
            <p>Login to Your account to continue</p>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={signIn}
          >
            <Form>
              <div className="flex flex-col gap-4 my-4">
                <Field type="email" name="email" as={TextField} label="Email" />
                <ErrorMessage name="email" component="div" className="text-red-500" />

                <Field type="password" name="password" as={TextField} label="Password" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              
              <Button type="submit" className="block hover:opacity-90">Log In</Button>
            </Form>
          </Formik>
          <p className="m-4 font-bold text-lg">OR</p>
          <button onClick={() => navigate("/signup")} className="text-green text-light-green-900">SignUp</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
