// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import ChatProfile from "../components/internalChatComp/ChatProfile";

// function Chat() {
//   return (
//     <>
//       {/* Main container */}
//       <div className="flex">
//         {/* Left container */}
//         <div className="w-1/3 h-screen p-5">
//           <div className="h-full flex flex-col">
//             {/* User Display */}
//             <div className="flex mt-20 justify-between items-center">
//               <figure className="w-[80px] h-[80px] rounded-full overflow-hidden">
//                 <img
//                   src="src/assets/perosn.jpg"
//                   alt="person"
//                   className="w-full h-full object-cover"
//                 />
//               </figure>
//               <div className="mr-30">
//                 <h1 className="text-2xl font-semibold">John Doe</h1>
//                 <p className="text-gray-500">Chat anonymously</p>
//               </div>

//               <div className="p-3 bg-[#3a85b3] text-white h-12 font-semibold rounded-2xl">
//                 <select className="bg-transparent outline-none">
//                   <option>Show Name</option>
//                   <option>Don't Show Name</option>
//                 </select>
//               </div>
//             </div>

//             {/* Searchbar */}
//             <div className="h-auto bg-gray-600/40 mt-5 p-3 text-gray-900 text-[20px] font-semibold rounded-3xl px-6 mx-3">
//               <input
//                 type="text"
//                 name="user"
//                 placeholder="🔍 Search Chat"
//                 className="w-full border-none outline-none bg-transparent"
//               />
//             </div>

//             {/* Tabs: Students & Landlords */}
//             <Tabs>
//               <TabList className="grid grid-cols-2 mt-5 border-b-2 border-t-2 border-gray-300 text-2xl text-gray-600 font-bold">
//                 <Tab
//                   className="pb-2 pt-2 cursor-pointer outline-none w-full text-center"
//                   selectedClassName="border-b-4 border-[#1e5f8a] text-[#1e5f8a] bg-gray-700/10"
//                 >
//                   Students
//                 </Tab>
//                 <Tab
//                   className="pb-2 pt-2 cursor-pointer outline-none w-full text-center"
//                   selectedClassName="border-b-4 border-[#1e5f8a] text-[#1e5f8a] bg-gray-700/10"
//                 >
//                   Landlords
//                 </Tab>
//               </TabList>

//               {/* Students Panel */}
//               <TabPanel className="flex flex-col p-2 gap-2 mt-5">
//                 <ChatProfile />
//                 <ChatProfile />
//               </TabPanel>

//               {/* Landlords Panel */}
//               <TabPanel className="flex flex-col p-2 gap-2 mt-5">
//                 <ChatProfile />
//               </TabPanel>
//             </Tabs>
//           </div>
//         </div>

//         {/* Right container (Chat area) */}
//         <div className="w-2/3 p-10 bg-[#e0ebf3] h-screen">
//           <div className="bg-[#3a85b3]/30 h-9/10 rounded-lg w-full mt-20 flex flex-col">
//             {/* user details */}
//             <div className="flex pt-5 pl-5 pb-2 border-b-1 border-gray-500">
//               <figure className="w-[80px] h-[80px] rounded-full overflow-hidden">
//                 <img
//                   src="src/assets/perosn.jpg"
//                   alt="person"
//                   className="w-full h-full object-cover"
//                 />
//               </figure>
//               <h1 className="text-2xl mt-5 font-bold ml-10">Knight rider</h1>
//             </div>

//             {/* chat */}
//             <div></div>

//             {/* sending options */}
//             <div className="h-4 bg-gray-600 flex">
//               <input type="text" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Chat;
