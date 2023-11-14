
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Home, Pencil, Phone } from "lucide-react";

export function UserProfile() {
  return (
    (<div className="w-full min-h-screen bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>UP</AvatarFallback>
                </Avatar>
                <Button variant="outline">Upload Photo</Button>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="text-lg font-medium">Current Username</div>
                <div className="flex items-center space-x-2">
                  <Pencil className=" h-5 w-5 text-gray-500 dark:text-gray-300" />
                  <Button variant="link">Edit</Button>
                  <Button variant="link">Change Password</Button>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="text-lg font-medium">Phone Number</div>
                <div className="flex items-center space-x-2">
                  <Phone className=" h-5 w-5 text-gray-500 dark:text-gray-300" />
                  <Button variant="link">Edit</Button>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="text-lg font-medium">Address Book</div>
                <div className="flex items-center space-x-2">
                  <Home className=" h-5 w-5 text-gray-500 dark:text-gray-300" />
                  <Button variant="link">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>123456</TableCell>
                  <TableCell>Nov 1, 2023</TableCell>
                  <TableCell>$50.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>123457</TableCell>
                  <TableCell>Oct 31, 2023</TableCell>
                  <TableCell>$75.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>123458</TableCell>
                  <TableCell>Oct 30, 2023</TableCell>
                  <TableCell>$100.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>)
  );
}
