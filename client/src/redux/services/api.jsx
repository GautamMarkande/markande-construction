
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const myApis = createApi({
  reducerPath: 'myApis', // Redux Toolkit automatically creates a slice machine under the hood
  baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:3000/api/',
   
}),
  endpoints:(builder)=>({
    register:builder.mutation({
        query:(formData)=>({
            url:'user/register',
            method:'POST',
            body:formData
        })
    })
  })
})
export const  {useRegisterMutation} = myApis