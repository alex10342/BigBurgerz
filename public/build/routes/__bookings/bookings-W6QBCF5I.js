import"/build/_shared/chunk-MANCNQZP.js";import{a as x,b as o}from"/build/_shared/chunk-KPIV2DRR.js";import{f as p,g as h,h as g,i as v}from"/build/_shared/chunk-G2T34B7H.js";import{a as I}from"/build/_shared/chunk-DFJ6R3ZR.js";import{e as n,h as F,i as d}from"/build/_shared/chunk-KBFEZAWC.js";var i=n(d());function u({progress:r,width:a,text:m}){return(0,i.jsxs)("div",{style:{width:a},children:[(0,i.jsxs)("div",{className:"flex justify-between",children:[(0,i.jsx)("span",{className:"text-base font-medium text-blue-700",children:m}),(0,i.jsxs)("span",{className:"text-sm font-medium text-blue-700",children:[Math.floor(parseInt(r)),"%"]})]}),(0,i.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-400",children:(0,i.jsx)("div",{className:"bg-blue-600 h-1.5 rounded-full",style:{width:r}})})]})}var D=n(I()),b=n(F());var e=n(d());function w(){let r=h(),a=v(),m=g(),[s,c]=(0,b.useState)(0),y=l=>{s+1>=o.length?(r(l.currentTarget,{replace:!0}),c(0)):c(s+1)},N=l=>{s-1>=0&&c(s-1)};return(0,e.jsxs)("div",{className:"overflow-hidden",children:[(0,e.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,e.jsx)("div",{className:"col-span-1 h-screen w-full flex justify-end",children:(0,e.jsx)("div",{className:"bg-white h-64 w-80 mt-[5rem] rounded-md shadow-md text-center pt-2 leading-none flex flex-col items-center justify-center",children:(0,e.jsxs)("div",{className:"flex flex-col items-center",children:[(0,e.jsx)("img",{src:"icon.svg",alt:"Home",className:"w-16 h-16 mb-3"}),(0,e.jsx)("h1",{className:"text-lg font-bold",children:x}),(0,e.jsx)("h2",{children:"Book over here! \u{1F449}"}),(0,e.jsx)("h3",{className:"text-indigo-500 italic text-sm",children:"Open 10am-10pm every day"})]})})}),(0,e.jsxs)("div",{className:"col-start-2 col-span-2 h-screen w-[43rem] flex justify-start flex-col",children:[(0,e.jsx)("div",{className:"bg-white h-14 w-full mt-[5rem] rounded shadow z-20 flex justify-center items-end pb-4",children:(0,e.jsx)(u,{progress:`${(s+1)/o.length*100}%`,width:"70%",text:"Reservation Progress"})}),(0,e.jsx)("div",{className:"bg-[#f9fafb] h-96 w-full rounded-b-md -translate-y-3 shadow-md z-10 flex justify-center w-9/10 mt-2",children:(0,e.jsxs)(p,{method:"post",className:"w-[90%] grid grid-rows-2",children:[(0,e.jsx)("fieldset",{className:"row-start-1 row-span-1 pt-1",children:o.map((l,f)=>l.map((t,k)=>(0,e.jsxs)("div",{id:"formHandler",className:"flex flex-col w-1/1",children:[(0,e.jsxs)("label",{htmlFor:`${t.id}-input`,hidden:s!==f,className:"pt-2",children:[t.label,a&&Object.keys(t.id)!=null?(0,e.jsxs)("span",{className:"text-sm text-red-600",children:[" ",a[t.id]]}):null]}),(0,e.jsx)("input",{hidden:s!==f,type:t.type,id:`${t.id}-input`,name:t.id,placeholder:t.placeholder,min:t.min,value:t.takeValue&&m[t.id],className:`border rounded py-1 px-2 ${a&&a[t.id]?"border-red-600":"border-gray-400"}`})]},k)))}),(0,e.jsxs)("div",{className:"flex flex-col justify-end items-center mb-5 row-start-2 row-span-1",children:[(0,e.jsx)("h3",{className:"text-indigo-500 italic text-sm mt-14",children:"Fields marked with * are required!"}),(0,e.jsxs)("div",{className:"flex flex-col space-x-2",children:[a&&a.booking?(0,e.jsx)("p",{className:"rounded-md bg-red-500 text-white text-sm px-2 py-1",children:a.booking}):"",(0,e.jsxs)("div",{className:"flex justify-center space-x-3",children:[(0,e.jsx)("button",{type:"button",onClick:N,className:"flex items-center text-white bg-slate-500 mt-2 px-2 text-sm rounded",children:"Back"}),(0,e.jsxs)("button",{type:"button",onClick:y,className:"flex items-center text-white bg-blue-500 mt-2 px-3 py-1 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-300",children:[s+1>=o.length?"Submit":"Continue",(0,e.jsx)("svg",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className:"w-4 h-4 ml-1",viewBox:"0 0 24 24",children:(0,e.jsx)("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]})]})]})]})})]})]}),(0,e.jsx)("div",{className:"grid grid-cols-3 gap-4"})]})}export{w as default};
