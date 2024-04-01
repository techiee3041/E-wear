import { TextField } from "@mui/material";
import { CheckoutValues } from "./Checkout";
import { FormikErrors, FormikTouched } from "formik";

type Props = {
  values: CheckoutValues;
  touched: FormikTouched<CheckoutValues>;
  errors:  FormikErrors<CheckoutValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Payment = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}: Props) => {
  return <div className="my-8 mx-0">
    {/* CONTACT INFO */}
    <div>
        <p className="mb-4 text-lg">Contact Info</p>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          helperText={touched.email && errors.email}
          error={!!touched.email && !!errors.email}
          className="col-span-4 mb-4"
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          helperText={touched.phoneNumber && errors.phoneNumber}
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          className="col-span-4"
        />
    </div>
  </div>;
};

export default Payment;
