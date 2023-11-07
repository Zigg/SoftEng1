import { Toast } from "flowbite-react";
import { AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";
import { BsCheck2Square, BsCartCheck, BsCartX } from "react-icons/bs";
import React, { useState, useEffect, useRef } from "react";

export function GlobalAlert({ type, message }) {
  // TODO: Try to limit toast popups to 1 do not allow toast notifications to stack
  // TODO: These are placeholders for now, Add or remove some of these later on

  const [showToast, setShowToast] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false);
        clearInterval(timerRef.current);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showToast]);

  if (type === "danger") {
    return (
      <div className="fixed right-0  left-0 bottom-5 flex justify-center z-10">
        <div className="p-3">
          <Toast className="">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <MdOutlineDangerous className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {(message, "Are you sure?")}
            </div>
            <Toast.Toggle />{" "}
          </Toast>
        </div>
      </div>
    );
  }

  if (type === "success") {
    return (
      <div className="fixed right-0  left-0 bottom-5 flex justify-center z-10">
        <div className="p-3">
          {" "}
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <BsCheck2Square className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {(message, "Success Message")}
            </div>

            <Toast.Toggle />
          </Toast>
        </div>
      </div>
    );
  }
  if (type === "warning") {
    return (
      <div className="fixed right-0  left-0 bottom-5 flex justify-center z-10">
        <div className="p-3">
          {" "}
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <AiOutlineWarning className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {(message, "Warning Message")}
            </div>

            <Toast.Toggle />
          </Toast>
        </div>
      </div>
    );
  }

  if (type === "info") {
    return (
      <div className="fixed right-0  left-0 bottom-5 flex justify-center z-10">
        <div className="p-3">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-700 dark:text-blue-200">
              <AiOutlineInfoCircle className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {(message, "Info Message")}
            </div>

            <Toast.Toggle />
          </Toast>
        </div>
      </div>
    );
  }
  // TODO: Fetch the item name or shortened item name from the database (just the first word to be spliced), this is then displayed for the {Item Name} below
  // TODO: Replace Messages with the appropriate actions
  if (type === "cart-add" && showToast) {
    return (
      <div className="fixed right-0  left-0 bottom-5 flex justify-center z-10">
        {" "}
        <div className="p-3">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <BsCartCheck className="h-5 w-5" />
            </div>

            <div className="ml-3 text-sm font-normal">
              {(message, "Item added to Cart")}
            </div>
          </Toast>
        </div>
      </div>
    );
  }

  if (type === "cart-remove" && showToast) {
    return (
      <div className="fixed right-0  left-0 bottom-5 flex justify-center z-10">
        {" "}
        <div className="p-3">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <BsCartX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {(message, "Item removed from Cart")}
            </div>
          </Toast>
        </div>
      </div>
    );
  }
}
