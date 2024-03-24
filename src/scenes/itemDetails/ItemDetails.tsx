import { IconButton, Button, Typography } from "@material-tailwind/react";
import { Tab, Tabs } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../../state/hooks";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import {
  collection,
  DocumentData,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../../firebaseconfig";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "../../assets/jc-gellidon-JM8TkWJ9UIY-unsplash.jpeg";
import { addToCart } from "../../state";

type Item = {
  id: string;
  image: string | undefined;
  name: string;
  price: number;
  longDescription: string;
  count: number;
};

const ItemDetails = () => {
  const dispatch = useAppDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("Description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState<DocumentData>([]);
  const [items, setItems] = useState<Item[]>([]);

  const handleChange = (
    event: React.MouseEvent<Element, MouseEvent>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  // GET SPECIFIC ITEM DATA
  const fetchItem = async () => {
    try {
      const itemRef = doc(db, `item/${itemId}`); // Update the line here
      const itemDoc = await getDoc(itemRef);
      if (itemDoc.exists()) {
        const imagePath = itemDoc.data().image;
        let imageUrl = Image;
        if (imagePath) {
          const imageRef = ref(storage, imagePath);
          imageUrl = await getDownloadURL(imageRef);
        }
        setItem({ ...itemDoc.data(), image: imageUrl, id: itemId });
        console.log(itemDoc.data());
      } else {
        console.log("Item not found!");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  // GET ALL ITEMS
  const fetchItems = async () => {
    try {
      // Set the loading state here
      const itemCollectionRef = collection(db, "item");
      const items = await getDocs(itemCollectionRef);
      const itemData = items.docs.map(async (doc) => {
        const imagePath = doc.data().image;
        let imageUrl;

        if (imagePath) {
          const imageRef = ref(storage, imagePath);
          imageUrl = await getDownloadURL(imageRef);
        }

        return {
          ...doc.data(),
          id: doc.id,
          image: imageUrl,
        } as Item;
      });

      const resolvedProductData = await Promise.all(itemData);
      setItems(resolvedProductData);

      // Set the loadingdispatch( state to false once the data is fetched
    } catch (error) {
      // Handle any errors that occur during data fetching
      console.log("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItem();
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <div className="w-4/5 my-20 mx-auto">
      <div className="flex flex-wrap gap-x-10">
        {/* IMAGES */}
        <div className="flex flex-1 basis-2/5 mb-10">
          <img
            src={item.image}
            alt={item?.name}
            width="100%"
            height="100%"
            className="object-contain"
          />
        </div>
        <div className="flex flex-1 basis-1/2 mb-10 flex-wrap">
          <div className="flex justify-between">
            <div>Home/Item</div>
            <div>Prev Next</div>
          </div>

          <div className="mx-o mt-16 mb-6">
            <h3 className="">{item.name}</h3>
            <p>Ksh{item.price}</p>
            <p className="mt-5">{item.longDescription}</p>
          </div>

          <div className="flex items-center min-h-12">
            {/* COUNT AND BUTTON */}
            <div className="flex items-center border border-solid border-neutral-main-500 mr-5 py-[2px] px-[5px]">
              <IconButton
                variant="text"
                onClick={() => setCount(Math.max(count - 1, 1))}
                placeholder="cart"
                className="text-xs"
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h4" placeholder="cart" className="py-0 px-1">
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
            <Button
              className="rounded-none min-w-[150px] py-3 px-10"
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </div>
          <div className="">
            <div className="mt-5 mx-0 mb-1">
              <FavoriteBorderOutlined />
              <p className="ml-1">Add to WishList</p>
            </div>
            <p>Categories: {item.category}</p>
          </div>
        </div>
      </div>

      {/* INFORMATION */}
      <div className="">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Description" value="description" />
          <Tab label="Reviews" value="reviews" />
        </Tabs>
      </div>
      <div className="flex flex-wrap gap-4">
        {value === "description" && <div>{item.longDescription}</div>}
        {value === "reviews" && (
          <div>
            <p>Reviews</p>
          </div>
        )}
      </div>
      <div className="mt-12 w-full">
        <h3 className="font-bold">Related Products</h3>
        <div className="mt-5 flex flex-wrap gap-x-[1.33%] justify-between">
          {items.slice(0, 4).map((item, index) => {
            return <Item key={`${item.name}-${index}`} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
