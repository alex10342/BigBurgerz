import{h as n}from"/build/_shared/chunk-G2T34B7H.js";import{a as d}from"/build/_shared/chunk-DFJ6R3ZR.js";import{e as a,i}from"/build/_shared/chunk-KBFEZAWC.js";var c=a(d());var e=a(i());function r({bookings:o}){return(0,e.jsxs)("div",{className:"bg-[#f9fafb] h-auto w-full rounded-b-md -translate-y-1 shadow-md z-10 flex flex-col items-center w-9/10 pb-5 mb-5",children:[o.length==0?(0,e.jsx)("div",{className:"flex justify-center w-full pt-6",children:(0,e.jsx)("span",{children:"No Bookings."})}):"",o.map((s,m)=>(0,e.jsxs)("div",{className:"grid grid-cols-3 bg-white rounded-lg w-11/12 h-auto shadow items-center mt-3 py-1",children:[(0,e.jsxs)("div",{className:"flex flex-col items-center",children:[(0,e.jsx)("h3",{className:"text-center text-sm",children:s.name}),(0,e.jsxs)("h3",{className:"text-center text-sm",children:["Ph: ",s.phone]})]}),(0,e.jsx)("h1",{className:"text-center",children:s.tableNum}),(0,e.jsx)("h1",{className:"text-center",children:s.date})]},m))]})}var t=a(i());function l(){let o=n();return(0,t.jsx)("div",{className:"overflow-hidden",children:(0,t.jsx)("div",{className:"grid grid-cols-3 gap-4",children:(0,t.jsxs)("div",{className:"col-start-2 col-span-1 h-screen w-[43rem] flex justify-start flex-col",children:[(0,t.jsxs)("div",{className:"bg-white h-14 w-full mt-[5rem] rounded shadow z-20 grid grid-cols-3 px-7 items-center",children:[(0,t.jsx)("h1",{className:"text-center",children:"Your Contact"}),(0,t.jsx)("h1",{className:"text-center",children:"Table Number"}),(0,t.jsx)("h1",{className:"text-center",children:"Booking Date"})]}),(0,t.jsx)(r,{bookings:o.bookings})]})})})}export{l as default};