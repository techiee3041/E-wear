import useMediaQuery from "../../hooks/useMediaQuery";
import { TextField } from "@mui/material";
import { FormikTouched, getIn } from "formik";
import { CheckoutValues} from "./Checkout";

type Props = {
  type: string;
  values: CheckoutValues;
  touched: FormikTouched<CheckoutValues>;
  errors: FormikTouched<CheckoutValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}: Props) => {
  const isNoneMobile = useMediaQuery("(min-width: 600px)");

  const formattedName = (field: string) => `${type}.${field}`;

  const formattedError = (field: string) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
      getIn(errors, formattedName(field))
    );

  const formattedHelper = (field: string) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <div className="">
      <div className={`${isNoneMobile ? "grid-column-none": "col-span-4"} grid gap-4 grid-cols-custom`}>
        <TextField
          fullWidth
          type="text"
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.firstName}
          name={formattedName("firstName")}
          helperText={formattedHelper("firstName")}
          error={formattedError("firstName")}
          className="col-span-2"
        />
        <TextField
          fullWidth
          type="text"
          label="Last Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.lastName}
          name={formattedName("lastName")}
          error={formattedError("lastName")}
          helperText={formattedHelper("lastName")}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Country"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.country}
          name={formattedName("country")}
          error={formattedError("country")}
          helperText={formattedHelper("country")}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          type="text"
          label="County"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.county}
          name={formattedName("county")}
          error={formattedError("county")}
          helperText={formattedHelper("county")}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Address"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.address}
          name={formattedName("address")}
          error={formattedError("address")}
          helperText={formattedHelper("address")}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Postal Code"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.postalCode}
          name={formattedName("postalCode")}
          error={formattedError("postalCode")}
          helperText={formattedHelper("postalCode")}
          sx={{ gridColumn: "span 2" }}
        />
      </div>
    </div>
  );
};

export default AddressForm;
