import { useAppSelector } from "../../state/hooks";
import { StepLabel, Stepper, Step } from "@mui/material";
import { Formik, FormikErrors, FormikTouched } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Shipping from "./Shipping";

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

  
  const handleFormSubmit = async (values: CheckoutValues, actions: any) => {
    setActiveStep(activeStep + 1);

    //copies billing address into shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {...values.billingAddress, isSameAddress: true});
    }
  };

  const makePayment = async (values: CheckoutValues) => {};
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
