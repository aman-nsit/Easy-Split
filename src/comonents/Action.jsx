import React, { useState } from 'react'
import billCalculator from '../service/service';
import { div } from '@tensorflow/tfjs';
function Action() {
  const members=[];
  const [res,getRes] = useState();
  const handleSubmit = (e) =>{
    e.preventDefault();
    const member = e.target[0].value;
    var amount =parseFloat( e.target[1].value );
    members.push({member,amount});
    console.log(members);
    // console.log(amount);
  }
  const handleSplitBills = (e) => {
    console.log(members);
      if(members){ 
        const billresult=billCalculator(members);
        getRes(billresult)
      }

      
  }
  return (

    <div className='contanier'>
      <div>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Squad Member'/>
            <input type="text" placeholder='Amount Given'/>
            <button type="reset">Reset form</button>
            <button>Add</button>
          </form>
          <button onClick={handleSplitBills}>Split Bill</button>
          {res && <div> {res} </div>}
          {/* if({res} && <div>{res}</div>); */}
      </div>
    </div>
  )
}


export default Action


