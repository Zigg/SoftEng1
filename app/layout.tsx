import AuthContext from '@/context/AuthContext'
import ToasterContext from '@/context/ToasterContext'
import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ordering System',
  description: 'Ordering System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* TODO: */}
        {/* Below is the login/register page just commenting out for the mean time, this wont be inputted here but I just put it for viewing purposes*/}
        {/* Focus on first sprint first */}
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
        
        {/* To be added */}
        {/* <Footer/> */}
        </body>
    </html>
  )
}
