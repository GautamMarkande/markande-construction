// import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// export const myApis = createApi({
//   reducerPath: 'myApis', // Redux Toolkit automatically creates a slice machine under the hood
//   baseQuery: fetchBaseQuery({
//     baseUrl:'http://localhost:3000/api/',
//     credentials: "same-origin",
//     prepareHeaders: (headers) => {
//         const accessToken = localStorage.getItem("token");

//             headers.set("authorization", `Bearer ${accessToken}`);
//             headers.set("Content-Type", "application/json");
//             headers.set('Access-Control-Allow-Origin', '*')

//         return headers;
//     },
// }),
//   endpoints:(builder)=>({
//     register:builder.mutation({
//         query:(formData)=>({
//             url:'user/register',
//             method:'POST',
//             body:formData
//         })
//     }),
//     login:builder.mutation({
//       query:(body)=>({
//         url:'user/login',
//         method:"POST",
//         body:JSON.stringify(body)
//       })
//     }),
//     test:builder.query({
//       query:(body)=>({
//         url:'user/test',
//         method:"GET",
//         body:body
//       })
//     })
//   })
// })
// export const  {useRegisterMutation,useLoginMutation,useTestQuery} = myApis
