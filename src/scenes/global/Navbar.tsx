import { IconButton } from "@material-tailwind/react";
import { Badge } from "@material-tailwind/react";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setIsCartOpen } from "../../state";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  return (
    <div className="flex items-center w-full h-[60px] bg-background text-black fixed top-0 left-0 z-[1]">
      <div className="w-4/5 m-auto flex justify-between items-center">
        <div
          className="hover:cursor-pointer text-secondary-500"
          onClick={() => navigate("/")}
        >
          E-WEAR
        </div>
        <div className="flex justify-between gap-[20px] z-[2]">
          <IconButton className="text-black bg-white p-3 transition duration-500 hover:bg-gray-200 hover:cursor-pointer rounded-full" placeholder="cart">
            <SearchOutlined />
          </IconButton>
          <IconButton className="text-black bg-white p-3 transition duration-500 hover:bg-gray-200 hover:cursor-pointer rounded-full" placeholder="cart">
            <PersonOutline />
          </IconButton>
          <Badge
            content={cart.length} invisible={cart.length === 0}
            className="text-white bg-secondary-500"
          >
            <IconButton
              className="text-black bg-white p-3 transition duration-500 hover:bg-gray-200 hover:cursor-pointer rounded-full" placeholder="cart"
              onClick={() => dispatch(setIsCartOpen())}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>

          <IconButton className="text-black bg-white p-3 transition duration-500 hover:bg-gray-200 hover:cursor-pointer rounded-full" placeholder="cart">
            <MenuOutlined />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
