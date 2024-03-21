import { IconButton } from "@material-tailwind/react";
import { FacebookOutlined, X, LinkedIn} from "@mui/icons-material";
const Footer = () => {
  return (
    <div className="mt-20 py-10 px-0 bg-blue-gray-50">
      <div className="w-4/5 m-auto flex flex-col sm:flex-row justify-between flex-wrap gap-2 sm:gap-5 text-xs items-start">
        <div className="w-full sm:w-2/6 leading-6 border-b border-gray-400 border-solid border-1 sm:border-none">
          <h4 className="font-bold mb-7 text-secondary-500">E-WEAR</h4>
          <div className="m-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit dicta
            amet, a tempore dolore dolores, quae officiis quod, fugit tenetur
            accusantium temporibus iste. Fugit, numquam consequuntur, vero
            excepturi odio voluptatibus distinctio.
          </div>
        </div>
        <div className="border-b border-gray-400 border-solid border-1 sm:border-none">
          <h4 className="font-bold mb-7">About Us</h4>
          <p className="mb-7">Careers</p>
          <p className="mb-7">Our Store</p>
          <p className="mb-7">Terms and Conditions</p>
          <p className="mb-7">Privacy Policy</p>
        </div>

        <div className="border-b border-gray-400 border-solid border-1 sm:border-none">
          <h4 className="font-bold mb-7">Customer Care</h4>
          <p className="mb-7">Help Center</p>
          <p className="mb-7">Track Your Order</p>
          <p className="mb-7">Corporate & bulk purchasing</p>
          <p className="mb-7">Returns & Refund</p>
        </div>

        <div className="border-b border-gray-400 border-solid border-1 sm:border-none">
          <h4 className="font-bold mb-7">Contact Us</h4>
          <p className="mb-7">Help Center</p>
          <p className="mb-7">Track Your Order</p>
          <p className="mb-7">Corporate & bulk purchasing</p>
          <p className="mb-7">Returns & Refund</p>
        </div>

        <div className="w-1/5 flex flex-col">
          <h4 className="font-bold mb-4">Follow Us</h4>
          <IconButton placeholder="cart" variant="text" className="inline">
            <FacebookOutlined />
          </IconButton> <small>facebook</small>
          <IconButton placeholder="cart" variant="text">
            <X />
          </IconButton> <small>twitter</small>
          <IconButton placeholder="cart" variant="text">
            <LinkedIn />
          </IconButton> <small>linkdin</small>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
