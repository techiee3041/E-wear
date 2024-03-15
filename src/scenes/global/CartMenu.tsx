import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  decreaseCount,
  fetchItems,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const flexStyles = "flex justify-between items-center";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const isCartOpen = useAppSelector((state) => state.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    const price = item.price || 0;
    return total + item.count * price;
  }, 0);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  return (
    // overlay
    <div
      className={`${
        isCartOpen ? "block" : "hidden"
      } bg-dark fixed z-10 w-full h-full left-0 top-0 overflow-auto`}
    >
      {/* MODAL */}
      <div className="fixed right-0 bottom-0 w-[400px] sm:w-1/3 h-full bg-white">
        <div className="p-8 overflow-auto h-full">
          {/* HEADER */}
          <div className={`${flexStyles} mb-4`}>
            <Typography variant="h5" placeholder="cart">
              SHOPPING BAG ({cart.length})
            </Typography>
            <IconButton
              onClick={() => dispatch(setIsCartOpen())}
              placeholder="cart"
            >
              <CloseIcon />
            </IconButton>
          </div>
          {/* CART LIST */}
          <div className="">
            {cart.map((item) => (
              <div key={item.id}>
                <div className={`${flexStyles} py-4 px-0`}>
                  <div className="flex flex-1 basis-2/5">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      width="123px"
                      height="164px"
                    />
                  </div>
                  <div className="flex-1 basis-3/5">
                    {/* ITEM NAME */}
                    <div className={`${flexStyles} mb-5`}>
                      <Typography variant="h1" placeholder="cart">
                        {item.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                        placeholder="cart"
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    {/* SHORT DESCRIPTION */}
                    <Typography placeholder="cart">
                      {item.shortDescription}
                    </Typography>
                    {/* AMOUNT */}
                    <div className={`${flexStyles} my-4 mx-0`}>
                      <div className="flex items-center border-[1px] border-solid border-neutral-main-500">
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                          placeholder="cart"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="h1" placeholder="cart">
                          {item.count}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                          placeholder="cart"
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      {/* PRICE */}
                      <Typography variant="h1" placeholder="cart">
                        ${item.price}
                      </Typography>
                    </div>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="my-5 mx-0">
            <div className={`${flexStyles} my-5 mx-0`}>
              <Typography variant="h1" placeholder="cart">
                SUBTOTAL
              </Typography>
              <Typography variant="h1" placeholder="cart">
                ${totalPrice}
              </Typography>
            </div>
            <Button
              placeholder="cart"
              className="bg-primary-400 text-white rounded-none min-w-full py-5 px-10 my-5 mx-0"
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen());
              }}
            >
              CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
