// Import model that may have empty states this will be shown when inventory is empty, cart is empty etc might need to create separate empty states for each model
const DefaultEmptyState = () => {
  return (
    <div
      className="
        px-4
        py-10
        sm:px-6
        h-full
        flex
        justify-center
        items-center
       
        "
    >
      <div
        className="
        text-center
        items-center 
        flex 
        flex-col
        "
      >
        <h3
          className="
            mt-2
            text-2xl
            font-semibold
            text-gray-900
            "
        >
          Nothing Found
        </h3>
      </div>
    </div>
  );
};

export default DefaultEmptyState;
