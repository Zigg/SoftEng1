import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"

export const Checkout = () => {

  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart Items", cartItems)
  const totalPriceArray = cartItems.map((item) => item.options.totalPrice * item.quantity);
  const cartTotalPrice = totalPriceArray.reduce((a, b) => a + b, 0);
  const cartLength = cartItems.length;
  const shippingFee = cartLength * 1.5;
  const cartGrandTotal = cartTotalPrice + shippingFee;
  console.log("Total Price Array", totalPriceArray)
  console.log("Cart Total Price", cartTotalPrice)

  return (
    <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto p-4">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold my-6 text-center">Checkout</h1>
      </div>
      <div className="border-b pb-4 mb-4 col-span-2 md:col-span-1">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Payment Method</h2>

        <div className="flex flex-col gap-y-2">
          <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2">
            <svg aria-hidden="true" class="w-10 h-3 me-2 -ms-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996" fill="#0E4595" /><path d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718" fill="#F2AE14" /></svg>
            Pay with Visa
          </button>


          <button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
            <svg class="w-4 h-4 me-2 -ms-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
            <span>Cash on Delivery</span>
          </button>


          <button type="button" class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
            <svg class="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
            Check out with PayPal
          </button>


          <button type="button" class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
            <svg class="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
            In-App Credits
          </button>
        </div>
      </div>

      <div className="border-b pb-4 mb-4 col-span-2 md:col-span-1">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order Summary</h2>


        <div className="overflow-y-auto max-h-96">
          <ul className="space-y-4">
            {cartItems.map((product) => (
              <li key={product.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-grow">
                  <p className="text-lg font-semibold">
                    <a href={product.href} className="text-blue-500 hover:underline cursor-pointer">
                      {product.name}
                    </a>
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700">Price: ${product.options.totalPrice}</p>
                      <p className="text-sm text-gray-700">Addons: {product.options.addons}</p>
                      <p className="text-sm text-gray-700">Size: {product.options.size}</p>
                      <p className="text-gray-500">Qty {product.quantity}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col mt-4">
          <span className="text-gray-700 text-sm py-4">Item Count: {cartLength}</span>
          <div className="flex justify-between">
            <span className="text-gray-700 text-sm">Shipping: </span> <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 text-sm">Subtotal </span>
            <span className="">${cartTotalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black font-bold text-lg">Total: </span>  <span className="text-black font-bold text-lg">${cartGrandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex flex-col col-span-2 mt-auto">Contact Information</h2>
      <div className="border-b pb-4 mb-4 col-span-2 md:col-span-1">
        <div className="flex flex-col space-y-2">
          <Label className="text-gray-600" htmlFor="mobile-number">
            Mobile Number
          </Label>
          <Input
            className="rounded-lg border-gray-300"
            id="mobile-number"
            placeholder="Enter your mobile number"
            type="tel"
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex flex-col items-center justify-center col-span-2 mt-auto">Shipping Information</h2>
      <div className="border-b pb-4 mb-4 col-span-2 grid-cols-2 md:col-span-1">

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label className="text-gray-600" htmlFor="name">
              Name
            </Label>
            <Input className="rounded-lg border-gray-300" id="name" placeholder="Enter your name" />
          </div>

          <div className="flex flex-col space-y-2">
            <Label className="text-gray-600" htmlFor="city">
              City
            </Label>
            <Input className="rounded-lg border-gray-300" id="city" placeholder="Enter your city" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-gray-600" htmlFor="state">
              State
            </Label>
            <Input className="rounded-lg border-gray-300" id="state" placeholder="Enter your state" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-gray-600" htmlFor="country">
              Country
            </Label>
            <Input className="rounded-lg border-gray-300" id="country" placeholder="Enter your country" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-gray-600" htmlFor="zip-code">
              Zip Code
            </Label>
            <Input className="rounded-lg border-gray-300" id="zip-code" placeholder="Enter your zip code" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-gray-600" htmlFor="address">
              Address
            </Label>
            <Input className="rounded-lg border-gray-300" id="address" placeholder="Enter your address" />
          </div>
        </div>
      </div>


      <Button className="col-span-2 mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
        Place Order
      </Button>

    </div >
  )
}

