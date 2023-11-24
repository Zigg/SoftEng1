import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Minus, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, addToCart, increaseQuantity, reduceQuantity, clearCart } from '../../../../../context/actions/cartAction';
import { productsMockData } from '../../../dashboard/pages/mock/productsMockData';

// TODO: Update the cart when choosing different sizes and addons from initial product page, and add the price of the addons to the total price
// TODO: Fix image to be displayed in the cart, for now its the local JSON, but im setting up the firebase functionality already
// TODO: The addons and size should be fetched from the backend
// TODO: Add the addons price, which must also be fetched from the backend

// TODO: Add the increment and decrement function for the quantity



// TODO: Fetch the cart data from the global store
// FIXME: Cart items undefined..
export function Cart() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart Items", cartItems)
  const totalPriceArray = cartItems.map((item) => item.options.totalPrice);
  const cartTotalPrice = totalPriceArray.reduce((a, b) => a + b, 0);
  console.log("Total Price Array", totalPriceArray)

  // TODO: When the API endpoints are made, fetch the cart items from the backend
  // useEffect(() => {
  //   if (Array.isArray(cartItems)) {
  //     const newTotal = cartItems.reduce((sum, product) => {
  //       let price = parseFloat((product.totalPrice || '').replace('$', '')) || 0;
  //       let quantity = parseInt(product.quantity, 10) || 1;
  //       return sum + price * quantity;
  //     }, 0);
  //     setTotal(newTotal);
  //     console.log("New Total", newTotal)

  //   }

  //   setIsLoading(false);
  // }, [cartItems]);

  if (isLoading) {
    return <p>Loading...</p>
  }

  // TODO: 
  if (!cartItems || cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(reduceQuantity(productId));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((product) => (
                              <li
                                key={product.id}
                                className="flex py-6">
                                <div
                                  className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center" />
                                </div>
                                <div
                                  className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div
                                      className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a
                                          href={product.href}>{product.name}</a>
                                      </h3>
                                      <p
                                        className="ml-4">{product?.options?.totalPrice}</p>
                                    </div>
                                    <p
                                      className="mt-1 text-sm text-gray-500">Addons: {product?.options?.addons}</p>
                                    <p
                                      className="mt-1 text-sm text-gray-500">Size: {product?.options?.size}</p>
                                  </div>
                                  <div
                                    className="flex flex-1 items-end justify-between text-sm">
                                    <p
                                      className="text-gray-500">Qty {product.quantity}</p>
                                    <div
                                      className="flex">
                                      <div className="gap-x-1 mr-2 mt-1 p-1 flex">
                                        <button onClick={() => handleIncreaseQuantity(product.id)}>
                                          <Plus className="w-4 h-4 hover:text-blue-600" />
                                        </button>
                                        <button onClick={() => handleDecreaseQuantity(product.id)}>
                                          <Minus className="w-4 h-4 hover:text-blue-600" />
                                        </button>
                                      </div>
                                      <button type="button" className="font-medium text-red-600 hover:text-red-500" onClick={() => handleRemoveFromCart(product.id)}>
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* TODO: Add the scrolling effect animation to the total price */}
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${cartTotalPrice.toFixed(2)}</p>
                      </div>
                      {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-blue-600 hover:text-blue-500"
                            onClick={() => {
                              setOpen(false);
                              navigate('/menu', { replace: true });
                            }}
                          >
                            Continue Browsing
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root >
  )
}
