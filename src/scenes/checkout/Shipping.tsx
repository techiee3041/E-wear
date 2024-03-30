import { Checkbox, FormControlLabel, Typography } from "@mui/material";

type Props = {
  values: Record<string, string>;
  touched: boolean;
  errors: string[];
  handleChange: (value: string) => void;
  handleBlur: (value: string) => void;
  setFieldValue: (value: string) => void;
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
            type="shippingAddress"
            values={values.shippingAddress}
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
            value={values.shiPPingAddress.isSameAddress}
              onChange={() => {
                setFieldValue("sameShippingAddress", !values.shiPPingAddress.isSameAddress);
              }}
              name="sameShippingAddress"
              color="primary"
            />
          }
          label="Same as shipping address"
        />
      </div>

      {/* SHIPPING ADDRESS */}
      {!values.shiPPingAddress.isSameAddress && (
        <div></div>
      )}
    </div>
  );
};

export default Shipping;
