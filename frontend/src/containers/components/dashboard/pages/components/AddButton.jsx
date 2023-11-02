import { Button } from "flowbite-react";
import { Plus } from "lucide-react";

export function AddButton({ message }) {
  return (
    <div className="justify-end px-4 flex-shrink-0 ">
      <Button color="indigo">
        <Plus className="mr-2 h-4 w-4" />
        Add a {message}
      </Button>
    </div>
  );
}
