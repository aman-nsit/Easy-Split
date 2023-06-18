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
    const member = e.target[0].value;
    const amount =parseFloat( e.target[1].value );
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
    const newMemberList = Array.from(members).map(([memberName, amount]) => ({ name: memberName, amount }));
    setMemberList(newMemberList);
  
  }
  const handleSplitBills = (e) => {
    console.log(members);
      if(members){ 
        const billresult=billCalculator(members,expense);
        console.log(billresult);
        if(billresult.length)getRes(billresult);
      }
  }
  return (
    <div className='container'>
      <div className="form-group">
          <form action="" onSubmit={handleSubmit}>
            <Typography.Title level={4}>Squad Member</Typography.Title>
            <input type="text" value={name} onChange={(e) => setName(e.target.value) } placeholder='Member Name'/>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount Given'/>
            <button>Add Member</button>
          </form>
      </div>
      {(memberList && !res) && <div className="member-list">
          <h2>Member List:</h2>
          <ul className='member-item'>
            {memberList.map((member, index) => (
              <li key={index}>
                {member.name} Rs- {member.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      }
        <div>    
          <button onClick={handleSplitBills}>Split Bill</button>
          {res && <div className="member-list">
          <h2>Amount:</h2>
          <ul className='member-item'>
            {res.map((member) => (
              <li  key={member}>
                {member[0]} <b>Gives </b>Rs- {member[2].toFixed(2)} <b>To</b> {member[1]}
              </li>
            ))}
          </ul>
        </div>}
      </div>
    </div>
  )
}


export default Action


