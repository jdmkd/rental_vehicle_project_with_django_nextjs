import axios from 'axios'
import React from 'react'


async function getData() {
    // const res = await axios.get('http://localhost:8080/api/home') // Assuming backend runs on same domain
    // const udata = res.data.userdata;
    // // console.log("res.json()x :", udata);
    // // console.log(userdata.map(user => ({"idx":user.id, "usernamex":user.name})))
  
    // // if (!res.ok) {
    // //   throw new Error('Failed to fetch datax')
    // // }
    const res = await axios.get('http://localhost:8000/contactus')
    const udata = res.data;
  
    return udata
  }


export default async function Page() {
    const data = await getData()
    
  return (
    <>
        <div>
            {data.map(user => (
              

                <div key={user.id}>
                <h1>name : {user.name}</h1>
                <h1>email : {user.email}</h1>
                <h1>phone : {user.phone}</h1>
                <h1>message : {user.message}</h1>
                <h1>contact_date : {user.contact_date}</h1>
                <br />
                </div>
              
            
            ))}
        </div>
    
    </>
  )
}
