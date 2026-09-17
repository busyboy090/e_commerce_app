import Hero from "@/features/home/components/Hero";
import FlashSales from "@/features/home/components/FlashSales";
import Categories from "@/features/categories/components/Categories";
import Jbl from "@/assets/products/BIG-JBL.svg";
import NewArrival from "@/features/products/components/NewArrival";
import FastDelivery from '@/assets/icons/Fast-Delivery.svg';
import CustomerService from '@/assets/icons/Customer-service.svg';
import MoneyGuarantee from '@/assets/icons/Money-Guarantee.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="">
      <Hero />
      <FlashSales />
      <Categories />

      <div className="container bg-black p-[56px!important] flex max-lg:flex-col gap-[43px]">
        <div className="content lg:w-[443px]">
          <p className="text-[#00FF66] font-semibold text-[1rem]">Categories</p>
          <h1 className="text-white text-[3.5rem] font-semibold my-[32px]">
            Enhance Your Music Experience
          </h1>
          <div className="flex gap-[24px] mb-[40px]">
            <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
              <span className="block font-semibold text-[1rem]">23</span>
              <span className="block mt-[-7px] text-[0.6875rem]">Hours</span>
            </div>
            <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
              <span className="block font-semibold text-[1rem]">05</span>
              <span className="block mt-[-7px] text-[0.6875rem]">Days</span>
            </div>
            <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
              <span className="block font-semibold text-[1rem]">59</span>
              <span className="block mt-[-7px] text-[0.6875rem]">Minutes</span>
            </div>
            <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
              <span className="block font-semibold text-[1rem]">35</span>
              <span className="block mt-[-7px] text-[0.6875rem]">Seconds</span>
            </div>
          </div>

          {/* buy now button */}
          <button
            type="button"
            className="bg-[#00FF66] text-white w-[171px] h-[56px] rounded-[4px]"
          >
            Buy Now!
          </button>
        </div>
        <img src={Jbl} className="w-130" alt="JBL Speaker Promo" />
      </div>

      {/* <Product /> */}
      <NewArrival />

      <div className="my-[110px]">
        <div className="flex max-md:flex-col justify-center items-center gap-[88px]">
          {/* Fast Delivery */}
          <div className="flex flex-col justify-center items-center gap-[24px]">
            <img src={FastDelivery} alt="Fast-Delivery" />
            <div>
              <h1 className="text-center mb-[8px] font-bold text-[1.25rem]">FREE AND FAST DELIVERY</h1>
              <p className="text-center text-[0.8rem]">Free delivery for all orders over $140</p>
            </div>
          </div>
          {/* Cutomer service */}
          <div className="flex flex-col justify-center items-center gap-[24px]">
            <img src={CustomerService} alt="Customer-Service" />
            <div>
              <h1 className="text-center mb-[8px] font-bold text-[1.25rem]">24/7 CUSTOMER SERVICE</h1>
              <p className="text-center text-[0.8rem]">Friendly 24/7 customer support</p>
            </div>
          </div>
          {/* Money Guarantee */}
          <div className="flex flex-col justify-center items-center gap-[24px]">
            <img src={MoneyGuarantee} alt="Money-Guarantee" />
            <div>
              <h1 className="text-center mb-[8px] font-bold text-[1.25rem]">MONEY BACK GUARANTEE</h1>
              <p className="text-center text-[0.8rem]">We reurn money within 30 days</p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="w-[46px] h-[46px] bg-[#F5F5F5] rounded-full fixed bottom-[20px] right-[20px]"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
}

export default Home;
