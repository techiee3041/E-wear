import { IconButton, Input } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { MarkEmailReadOutlined } from "@mui/icons-material";
import { useState } from "react";

const Subscribe = () => {
    const [Email, setEmail] = useState("")
  return (
    <div className="w-4/5 my-20 mx-auto text-center">
        <IconButton variant="text">
            <MarkEmailReadOutlined fontSize="large" />
        </IconButton>
        <h3 >Subscribe to Our NewsLetter </h3>
        <span>and receive ksh100 coupon on your first order</span>
        <div className="py-1 px-2 my-4 mx-auto flex items-center w-3/4 bg-[#f2f2f2]">
            <Input type="email" className="border-none focus:outline-none" size="md" label="Enter Email" onChange={(e) => setEmail(e.target.value)} value={Email} />
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical" />
            <p className="p-2 hover:cursor-pointer">Subscribe</p>
        </div>
    </div>
  )
}

export default Subscribe