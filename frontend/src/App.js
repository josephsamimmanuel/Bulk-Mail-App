import { useState } from 'react';
import './App.css';
import axios from "axios"
import * as XLSX from "xlsx"

function App() {

const [msg,setmsg]=useState("")
const [emaillist,setemaillist]=useState([])

//Sending, Sent
const[status,setstatus]=useState(false)

function handlemsg(event)
{
  setmsg(event.target.value)
}

function handlefile(event){
  const file=event.target.files[0]
    
  const reader=new FileReader()

  reader.onload=function(event){
      const data=event.target.result
      const workbook=XLSX.read(data,{type:"binary"})
     const sheetname=workbook.SheetNames[0]
     const worksheet=workbook.Sheets[sheetname]
  //    console.log(worksheet)
     const emaillist=XLSX.utils.sheet_to_json(worksheet,{header:"A"})
     console.log(emaillist)
      const totalemail=emaillist.map(function(item){
        return(item.A)
      })
      console.log(totalemail)
      setemaillist(totalemail)
  }

  reader.readAsBinaryString(file)
}

function send()
{
  setstatus(true)
  axios.post("http://localhost:5000/sendemail",{msg:msg,emaillist:emaillist})
  // for getting alert msg
  .then(function(data){
    if(data.data===true)
    {
      alert("Msg Sent Sucessfully...")
      setstatus(false)
    }
    else
    {
      alert("Failed")
    }
  })
}

  return (
    <div>
      <div className=' bg-blue-950 text-white text-center'>
        <h1 className=' text-2xl font-medium px-5 py-3'>Bulk Mail</h1>
      </div>

      <div className=' bg-blue-800 text-white text-center'>
        <h1 className=' text-2xl font-medium px-5 py-3'>We can help you send multiple emails at once</h1>
      </div>

      <div className=' bg-blue-600 text-white text-center'>
        <h1 className=' text-2xl font-medium px-5 py-3'>Drag and Drop</h1>
      </div>

      <div className=' bg-blue-400 flex flex-col items-center text-black px-5 py-3'>
        <textarea onChange={handlemsg} value={msg} name="" id="" cols="" rows="" className=' w-[80%] h-32 outline-none px-2 border border-black rounded-md' placeholder='Enter the email Text...'></textarea>
      
      <div>
        <input type="file" onChange={handlefile} className='border-4 border-dashed py-4 px-4 mt-5 mb-5' /> 
      </div>
      <p className=' text-center'>Total Emails in the file: {emaillist.length}</p>
      <button onClick={send} className=' bg-blue-950 py-2 px-2 text-white font-medium rounded-md w-fit mt-2'>{status?"Sending...":"Send"}</button>
      </div>

      <div className=' bg-blue-300 text-white text-center p-8'>
        
      </div>

       
        <div className=' bg-blue-200 text-white text-center p-8'> 
      </div>

    </div>
  );
}

export default App;
