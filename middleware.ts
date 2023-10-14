// Properly secure routes down the line 
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages:{
        signIn: "/"
    }
});

export const config = {
    matcher:[
    "/users/:path*"    
    
    ]

};