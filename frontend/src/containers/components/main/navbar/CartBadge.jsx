import React from 'react';
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";

// TODO: Fix the cart badge to show the number of items in the cart fetched from the backend
export const CartBadge = () => {
  return (
    <Stack spacing={4} direction="row" sx={{ color: "action.active" }}>
      {/* Place holder for the cart item number data */}
      <Badge color="primary" badgeContent={24}

        className="">

      </Badge>
    </Stack>
  );
}
