import React from 'react'

const UpdateForm = (prop) => {

  
    
  return (
    <div>
        <input onChange={(e)=> prop.setName(e.target.value)} type="text" name='name' value={prop.name}/>
        <input onChange={(e)=> prop.setEmail(e.target.value)} type="text" name='email' value={prop.email}/>
        <button onClick={()=> prop.updateStudent(prop.studentID)}>Submit</button>
    </div>
  )
}

export default UpdateForm
