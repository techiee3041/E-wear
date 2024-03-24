import { Tab, Tabs } from "@mui/material";
import { Spinner, Typography } from "@material-tailwind/react";
import Item from "../../components/Item";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebaseconfig";
import { getDownloadURL, ref } from "firebase/storage";
import { setItems } from "../../state";
import Image from "../../assets/larm-rmah-R1Ku62Z7zqE-unsplash.jpeg";

const ShoppingList = () => {
  const dispatch = useAppDispatch();
  const isNoneMobile = useMediaQuery("(min-width: 600px)");
  const [value, setValue] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const itemCollectionRef = collection(db, "item");
  const itemList = useAppSelector((state) => state.items);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Set the loading state here
        setIsLoading(true);

        const items = await getDocs(itemCollectionRef);
        const itemData = items.docs.map(async (doc) => {
          const imagePath = doc.data().image;
          let imageUrl = Image;

          if (imagePath) {
            const imageRef = ref(storage, imagePath);
            imageUrl = await getDownloadURL(imageRef);
          }

          return {
            ...doc.data(),
            id: doc.id,
            image: imageUrl,
          };
        });

        const resolvedProductData = await Promise.all(itemData);
        dispatch(setItems(resolvedProductData));

        // Set the loading state to false once the data is fetched
        setIsLoading(false);
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.log("Error fetching items:", error);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);
  const topRatedItems = itemList.filter((item) => item.category === "topRated");
  const newArrivalsItems = itemList.filter(
    (item) => item.category === "newArrivals"
  );
  const bestSellersItems = itemList.filter(
    (item) => item.category === "bestSellers"
  );

  isLoading && <Spinner />;

  return (
    <div className="w-4/5 my-4 sm:my-[80px] mx-auto">
      <Typography
        variant="h3"
        placeholder="cart"
        className="text-center font-cinzel sm:text-3xl"
      >
        Our featured <b className="text text-red-500">Products</b>
      </Typography>
      {isNoneMobile && (
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            sx: { display: isNoneMobile ? "block" : "none" },
          }}
          sx={{
            m: "25px",
            "&.MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab label="ALL" value="all" />
          <Tab label="TOP RATED" value="topRated" />
          <Tab label="NEW ARRIVALS" value="newArrivals" />
          <Tab label="BEST SELLERS" value="bestSellers" />
        </Tabs>
      )}
      <div
        className="mx-auto my-0 gap-6 justify-center w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 280px)",
        }}
      >
        {isLoading ? (
          <div className="flex justify-end items-center ">
            <Spinner
              color="blue"
              size="large"
              className="h-16 w-16 text-gray-900/50"
            />
          </div>
        ) : (
          <>
            {value === "all" &&
              itemList.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
            {value === "newArrivals" &&
              newArrivalsItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
            {value === "bestSellers" &&
              bestSellersItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
            {value === "topRated" &&
              topRatedItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
