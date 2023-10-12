import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
// FIXME: Might cause runtime errors??
// Extend the built-in Session types
declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      // TODO: Supposed to add role name to the current session to dynamically render the dashboard based on the user's role, but shits being a bitch
      rolename: string; 
    };
  }
}

// Extend the built-in User types
declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}
