import { IconButton, Button, Typography } from "@material-tailwind/react";
import { useAppDispatch } from "../state/hooks";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Product, addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  item: Product;
};

const Item = ({ item }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transform transition-transform duration-1000 ${
        isHovered ? "scale-110" : "scale-100"
      }`}
    >
      <div
        className="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          src={item.image}
          alt={item.name}
          onClick={() => navigate(`/item/${item.id}`)}
          className="cursor-pointer w-full h-[400px] object-cover"
        />
        <div
          className={`${
            isHovered ? "block" : "hidden"
          } absolute bottom-[10%] left-0 w-full py-0 px-[5%]`}
        >
          <div className="flex justify-between">
            <div className="flex items-center rounded-md bg-white">
              {/* AMOUNT */}
              <IconButton
                variant="text"
                onClick={() => setCount(Math.max(count - 1, 1))}
                placeholder="cart"
                className="text-xs"
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="h4"
                placeholder="cart"
                className="text-primary-300 text-xs"
              >
                {count}
              </Typography>
              <IconButton
                variant="text"
                onClick={() => setCount(count + 1)}
                placeholder="cart"
              >
                <AddIcon />
              </IconButton>
            </div>
            {/* BUTTON */}
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              className="text-white px-2 font-sans bg-dark"
              placeholder="cart"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <Typography
          className=" font-fauna font-bold text-xs text-secondary-600 mb-2"
          placeholder="cart"
        >
          {item.category
            ? item.category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
            : ""}
        </Typography>
        <p className=" text-sm font-sans font-medium">{item.name}</p>
        <Typography
          className="font-bold font-serif text-green-700"
          placeholder="cart"
        >
          ksh{item.price}
        </Typography>
      </div>
    </div>
  );
};

export default Item;
