import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App





// "use client"; // ✅ Keep this at the top
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import React from "react";
// import Navbar from '@/components/navbar/Navbar';
// import Sidebar from '@/components/sidebar/Sidebar';
// import { Provider } from 'react-redux';
// import store from "../store/Store";  

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <Provider store={store}>
//         <body className={`${geistSans.variable} ${geistMono.variable}`}>
//           <div className="flex">
//             <Sidebar />
//             <div className="w-screen">
//               <Navbar />
//               <div className="bg-slate-300 rounded-2xl dark:bg-black dark:text-white mt-2 w-[98%] ml-4 h-[86%]">
//                 {children}
//               </div>
//             </div>
//           </div>
//         </body>
//       </Provider>
//     </html>
//   );
// }
