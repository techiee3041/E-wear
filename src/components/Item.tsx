import { IconButton, Button, Typography } from "@material-tailwind/react";
import { useAppDispatch } from "../state/hooks";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Product, addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  item: Product;
  width: number;
};

const Item = ({ item, width }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div style={{ width: width }}>
      <div
        className="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          src={item.image}
          alt={item.name}
          width="300px"
          height="400px"
          onClick={() => navigate(`/item/${item.id}`)}
          className="cursor-pointer"
        />
        <div
          className={`${
            isHovered ? "block" : "hidden"
          } relative bottom-[10%] left-0 w-full py-0 px-[5%]`}
        >
          <div className="flex justify-between">
            <div className="flex items-center bg-neutral-light-100 rounded-sm">
              {/* AMOUNT */}
              <IconButton
                onClick={() => setCount(Math.max(count - 1, 1))}
                placeholder="cart"
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="h1"
                placeholder="cart"
                className="text-primary-300"
              >
                {count}
              </Typography>
              <IconButton
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
              className="bg-primary-300 text-white"
              placeholder="cart"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <Typography
          variant="h2"
          className="bg-neutral-dark-700"
          placeholder="cart"
        >
          {item.category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography placeholder="cart">{item.name}</Typography>
        <Typography className="font-bold" placeholder="cart">{item.price}</Typography>
      </div>
    </div>
  );
};

export default Item;
