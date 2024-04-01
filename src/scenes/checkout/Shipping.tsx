import { Checkbox, FormControlLabel } from "@mui/material";
import AddressForm from "./AddressForm";
import { FormikErrors, FormikTouched } from "formik";
import { CheckoutValues } from "./Checkout";

export interface Address {
  isSameAddress?: boolean;
  firstName: string;
  lastName: string;
  country: string;
  county: string;
  town: string;
  address: string;
}

interface Props {
  values: CheckoutValues;
  touched: FormikTouched<CheckoutValues>;
  errors: FormikErrors<CheckoutValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: any) => void;
}

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}: Props): JSX.Element => {
  return (
    <div className="my-7 mx-auto">
      {/* BILLING FORM */}
      <div>
        <p className="mb-4 text-lg">Billing information</p>
        <AddressForm
          type="billingAddress"
          values={values}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className="mb-4">
        <FormControlLabel
          control={
            <Checkbox
              checked={values.shippingAddress.isSameAddress}
              onChange={() => {
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                );
              }}
              name="sameShippingAddress"
              color="primary"
            />
          }
          label="Same as shipping address"
        />
      </div>

      {/* SHIPPING ADDRESS */}
      {!values.shippingAddress.isSameAddress && (
        <div>
          <p className="mb-4 text-lg">Shipping information</p>
          <AddressForm
            type="shippingAddress"
            values={values}
            touched={touched.shippingAddress}
            errors={errors.shippingAddress}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        </div>
      )}
    </div>
  );
};

export default Shipping;
