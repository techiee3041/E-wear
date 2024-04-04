import { useAppSelector } from "../../state/hooks";
import { StepLabel, Stepper, Step, Button } from "@mui/material";
import { Formik, FormikErrors, FormikTouched } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseconfig";

export interface CheckoutValues {
  billingAddress: {
    firstName: string;
    lastName: string;
    country: string;
    county: string;
    town: string;
    address: string;
    postalCode: string;
  };
  shippingAddress: {
    isSameAddress: boolean;
    firstName: string;
    lastName: string;
    country: string;
    county: string;
    town: string;
    address: string;
    postalCode: string;
  };
  email: string;
  phoneNumber: string;
}

const initialValues: CheckoutValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    county: "",
    town: "",
    address: "",
    postalCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    county: "",
    town: "",
    address: "",
    postalCode: "",
  },
  email: "",
  phoneNumber: "",
};

const stripePromise = loadStripe("pk_test_51P0i4ORtTrrGsov4H5bYKzaVrAxM3g1HoLxOQo9GTIIpJfrLYbKNF6txTEXSDu6DPzWy2xy1JwVIHEEY1GU28VX600L6kEufwc");

const CheckoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      country: yup.string().required("Country is required"),
      county: yup.string().required("County is required"),
      town: yup.string().required("Town is required"),
      address: yup.string().required("Address is required"),
      postalCode: yup.string().required("Postal Code is required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      address: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useAppSelector((state) => state.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;


  const makePayment = async (values: CheckoutValues) => {
    const requestBody = {
      userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({ id, count })),
    };
  
    try {
      // Specify the document for the specific order
      const orderCollectionRef = collection(db, "order");
      const docRef = await addDoc(orderCollectionRef, requestBody);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleFormSubmit = async (values: CheckoutValues, actions: any) => {
    //copies billing address into shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
  
    if (isSecondStep) {
      await makePayment(values);
      // Update the step after the payment is successfully made
      setActiveStep(activeStep + 1);
    }
  
    actions.setTouched({});
  };


  return (
    <div className="w-4/5 my-[100px] mx-auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <div>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={CheckoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors as FormikErrors<CheckoutValues>}
                  touched={touched as FormikTouched<CheckoutValues>}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
                {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors as FormikErrors<CheckoutValues>}
                  touched={touched as FormikTouched<CheckoutValues>}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <div className="flex justify-between gap-12">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    className="bg-primary-200 shadow-none text-white rounded-none py-4 px-10"
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                {isFirstStep ? (<Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    className="bg-primary-400 shadow-none text-white rounded-none py-4 px-10"
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    Next
                  </Button>)  : (<Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    className="bg-primary-400 shadow-none text-white rounded-none py-4 px-10"
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    Place Order
                  </Button>)}
                
                  
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
