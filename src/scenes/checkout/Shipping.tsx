import { Checkbox, FormControlLabel} from "@mui/material";
import { InitialValues } from "./Checkout";
import AddressForm from "./AddressForm";

type Props = {
  values: InitialValues;
  touched: boolean;
  errors: string[];
  handleChange: (value: string) => void;
  handleBlur: (value: string) => void;
  setFieldValue: (name: string, value: boolean) => void;
};

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}: Props) => {
  return (
    <div className="my-7 mx-auto">
      {/* BILLING FORM */}
      <div>
          <p className="mb-4 text-lg">Billing information</p>
          <AddressForm
            type="billingAddress"
            values={values.billingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
      </div>
      <div className="mb-4">
        <FormControlLabel
          control={
            <Checkbox
            defaultChecked
            value={values.shippingAddress.isSameAddress}
              onChange={() => {
                setFieldValue("sameShippingAddress", !values.shippingAddress.isSameAddress);
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
          <p className="mb-4 text-lg">Shiping information</p>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default Shipping;
