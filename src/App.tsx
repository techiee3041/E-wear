import React, { useEffect, useState } from "react";
import { db, storage } from "./firebaseconfig";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const App: React.FC = () => {
  const [products, setProducts] = useState<DocumentData[]>([]);
  const productCollectionRef = collection(db, "product");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef);
      const productData = data.docs.map(async (doc) => {
        const imageRef = ref(storage, doc.data().image);
        const imageUrl = await getDownloadURL(imageRef);
        return {
          ...doc.data(),
          id: doc.id,
          imageUrl,
        };
      });
      const resolvedProductData = await Promise.all(productData);
      setProducts(resolvedProductData);
    };

    getProducts();
  }, [productCollectionRef]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt="dress" />
          <fieldset></fieldset>
          <h1>{product.id}</h1>
        </div>
      ))}
    </div>
  );
};

export default App;