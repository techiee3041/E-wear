import { Button, Carousel, Typography } from "@material-tailwind/react";
import Image1 from "../../assets/brooke-cagle-aVT8VkmzML4-unsplash.jpeg";
import Image2 from "../../assets/chris-ghinda-wK2ESlRRZQ8-unsplash.jpeg";
import Image3 from "../../assets/jc-gellidon-JM8TkWJ9UIY-unsplash.jpeg";
import Image4 from "../../assets/larm-rmah-R1Ku62Z7zqE-unsplash.jpeg";
import Image5 from "../../assets/toa-heftiba-dti56waifB4-unsplash.jpeg";

const images = [Image1, Image2, Image3, Image4, Image5];
const MainCarousel = () => {
  return (
    <div className="h-full">
      <div className="h-3/6 w-full">
        <Carousel loop={true} placeholder="cart">
          {images.map((texture: string, index: number) => (
            <div key={`carousel-image-${index} w-full`} className="">
              <img
                src={texture}
                alt={`carousel-${index}`}
                className="w-full h-[530px] object-cover bg-fixed"
              />
              <div
                className="text-white bg-black-dark p-5 rounded-sm text-left absolute left:0 right-0 top-[46%] sm:left-10 sm:right-auto sm: max-width-[300px] "
              >
                <Typography
                  className="text-secondary-200 font-cinzel text-sm"
                  placeholder="cart"
                >
                  ---NEW ITEMS
                </Typography>
                <Typography variant="h2"
                  placeholder="cart"
                  className="font-cinzel"
                >
                  HOT SALE
                </Typography>
                <Typography
                  className="text-secondary-300 font-bold font-fauna underline"
                  placeholder="cart"
                >
                  Discver More
                </Typography>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full flex items-center bg-blue-gray-200 sm:bg-transparent">
          <div className="w-4/5 mt-6 mx-auto py-5 sm:flex gap-6">
            <div className="w-3/5">
              <Typography
                variant="h1"
                className="text-lg sm:text-5xl font-bold mb-4 sm:mb-0"
                placeholder="cart"
              >
                Discover Affordable Second-Hand Clothing Online
              </Typography>
            </div>
            <div className="">
              <p className="text-sm font-sans sm:text-1xl p-3 sm:p-0">
                Shop our curated collection of high-quality second-hand clothes and
                give them a new life
              </p>
              <div className="my-4">
                <Button
                  className="bg-primary-500 text-white transition duration-500 hover:opacity-50 mr-4"
                  placeholder="cart"
                >
                  Shop
                </Button>
                <Button
                  className="bg-white text-black background-solid border-black border-2 rounded-none transition duration-500 hover:opacity-50"
                  placeholder="cart"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default MainCarousel;
