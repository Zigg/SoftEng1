import * as React from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

// TODO: Fix the cart badge to show the number of items in the cart fetched from the backend
export default function CartBadge() {
  return (
    <Stack spacing={4} direction="row" sx={{ color: "action.active" }}>
      <Badge color="primary" badgeContent={24}
      
      className="">
        
      </Badge>
    </Stack>
  );
}
