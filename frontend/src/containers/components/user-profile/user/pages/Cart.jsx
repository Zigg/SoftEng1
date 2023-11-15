import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Minus, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// TODO: The addons and size should be fetched from the backend
// TODO: Add the addons price, which must also be fetched from the backend
const products = [
  {
    id: 1,
    name: 'Pizza',
    href: '#',
    size: 'Small',
    addOns: 'Pepperoni, Cheese, Tomato',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D',
    imageAlt: 'Pepperoni pizza with fresh basil, on top of a round wooden table.',
  },
  {
    id: 2,
    name: 'Chicken Burger',
    href: '#',
    size: 'Regular',
    addOns: 'Cheese, Pickles',
    price: '$32.00',
    quantity: 4,
    imageSrc: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt:
      'Chicken Burger with white sesame seeded bun, pickles, sliced tomatoes, lettuce, and cheese.',
  },

  // More products...
]
// TODO: Add the increment and decrement function for the quantity

let total = products.reduce((sum, product) => {
  let price = parseFloat(product.price.replace('$', ''));
  return sum + price * product.quantity;
}, 0);




// TODO: Fetch the cart data from the global store

export function Cart(data) {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

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
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Addons: {product.addOns}</p>

                                    <p className="mt-1 text-sm text-gray-500">Size: {product.size}</p>
                                  </div>

                                  <div className="flex flex-1 items-end justify-between text-sm">

                                    <p className="text-gray-500">Qty {product.quantity}
                                    </p>

                                    {/* TODO: Add add button functionality */}
                                    <div className="flex">
                                      <div className='gap-x-1 mr-2 mt-1 p-1 flex '>
                                        <button><Plus className='w-4 h-4 hover:text-blue-600' /></button>
                                        <button><Minus className='w-4 h-4 hover:text-blue-600' /></button>
                                      </div>
                                      <button
                                        type="button"
                                        className="font-medium text-red-600 hover:text-red-500"
                                      >
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

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${total.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
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
