import React, { useState } from 'react'
import { Typography, Input, Button, List } from 'antd';
import billCalculator from '../service/service';
import { div } from '@tensorflow/tfjs';
const members = new Map();
let expense=0;
function Action() {
  // const members=[];
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [memberList, setMemberList] = useState(null);
  const [res,getRes] = useState();
  const handleSubmit = (e) =>{
    e.preventDefault();
    const member = e.target[0].value.toUpperCase();
    // console.log(member);
    const amount =parseFloat( e.target[1].value );
    if(member){
    if(members.has(member)){
      let temp=members.get(member);
      members.set(member,temp+amount);
    }
    else {
      members.set(member,amount);
    }
    expense+=amount;
    // members.push({member,amount});
    setName('');
    setAmount('');
    getRes();
    const newMemberList = Array.from(members).map(([memberName, amount]) => ({ name: memberName, amount }));
    setMemberList(newMemberList);
  }
  }
  const handleSplitBills = (e) => {
    // console.log(members);
      if(members){ 
        const billresult=billCalculator(members,expense);
        // console.log(billresult);
        if(billresult.length)getRes(billresult);
      }
  }
  const handleReset =(e) =>{
    getRes();
    setMemberList(null);
    members.clear();
  }
  return (
    <div className='container'>
      <div className="form-group">
          <form action="" onSubmit={handleSubmit}>
            <Typography.Title level={4}>Squad Member</Typography.Title>
            <input type="text" value={name} onChange={(e) => setName(e.target.value) } placeholder='Member Name' required/>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount Given' required/>
            <button>Add Member</button>
          </form>
      </div>
      {(memberList && !res) && <div className="member-list">
          <h2>Member List:</h2>
          <ul className='member-item'>
          {memberList && <b><li><div>Payer:</div>Amount</li></b>}
            {memberList.map((member, index) => (
              <li key={index}>
                 <div style={{backgroundColor:'gold',padding:'5px', borderRadius:'5px'}}>{member.name}</div>
                 <div style={{backgroundColor:'red',padding:'5px', borderRadius:'5px'}}>Rs {member.amount.toFixed(2)}</div> 
              </li>
            ))}
          </ul>
        </div>
      }
        <div>    
          <button onClick={handleSplitBills}>Split Bill</button>
          <button onClick={handleReset}>Reset</button>
          {res && <div className="member-list">
          <h2>Amount:</h2>
          <ul className='member-item'>
            {res && <b><li>Payer<div>Amount</div>Reciever</li></b>}
            {res.map((member) => (
              <li  key={member}>
                <div style={{backgroundColor:'red',padding:'5px', borderRadius:'5px'}}>{member[0]}</div> 
                <div style={{backgroundColor:'gold',padding:'5px', borderRadius:'5px'}}>  Rs {member[2].toFixed(2)} 
                </div> <div style={{backgroundColor:'#5ccc25',padding:'5px', borderRadius:'5px'}}>{member[1]}</div>
              </li>
            ))}
          </ul>
        </div>}
      </div>
    </div>
  )
}
export default Action


