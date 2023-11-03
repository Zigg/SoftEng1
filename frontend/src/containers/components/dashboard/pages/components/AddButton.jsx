import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { Plus } from "lucide-react";

export const AddButton = ({ message, path }) => {
  return (
    <Link to={path}>
      <Button color="indigo" className="ml-4 mt-2">
        <Plus className="mr-2 h-4 w-4" />
        Add a {message}
      </Button>
    </Link>
  );
};
