import { IconButton } from "@mui/material";
import { Badge } from "@material-tailwind/react";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setIsCartOpne } from "../../state";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart)
  return (
    <div className="flex items-center w-full h-[60px] bg-background text-black fixed top-0 left-0 z-[1]">
      <div className="w-4/5 m-auto flex justify-between items-center">
        <div className="hover:cursor-pointer text-secondary-500" onClick={() => navigate("/")}>
          E-WEAR
        </div>
        <div className="flex justify-between gap-[20px] z-[2]">
          <IconButton sx={{color: "black"}}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{color: "black"}}>
            <PersonOutline />
          </IconButton>
          <Badge content={cart.length} className="text-secondary-500" invisible={cart.length === 0}></Badge>
          <IconButton sx={{color: "black"}} onClick={() => dispatch(setIsCartOpne())}>
            <ShoppingBagOutlined />
          </IconButton>
          <IconButton sx={{color: "black"}}>
            <MenuOutlined />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
