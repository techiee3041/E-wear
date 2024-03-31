import { useAppSelector } from "../../state/hooks";
import { StepLabel, Stepper, Button, Step } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

type Address = {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
};

export type InitialValues = {
  billingAddress: Address;
  shippingAddress: {
    isSameAddress: boolean;
  } & Address;
  email: string;
  phoneNumber: string;
};

const initialValues: InitialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    address: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    address: "",
  },
  email: "",
  phoneNumber: "",
};

const CheckoutSchema = [yup.object().shape({
  billingAddress: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    country: yup.string().required("Country is required"),
    address: yup.string().required("Address is required"),
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
    country:  yup.string().when("isSameAddress", {
      is: false,
      then: yup.string().required("required"),
    }),
    address:  yup.string().when("isSameAddress", {
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

  const handleFormSubmit = async (value: number, actions) => {
    setActiveStep(activeStep + 1);
  };

  const makePayment = async (values: number) => {};
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
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
