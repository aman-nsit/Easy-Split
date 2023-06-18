import React from 'react'

function billCalculator(members) {

    console.log(members);
    if(members.length===0)return ;
    let mp = new Map();
    let expense = 0;
    let n = members.length;
    let arr = new Array(n);
    let m=0; 
    for (let i = 0; i < n; i++) {
      if(mp.has(members[i].member)){
        let temp=mp.get(members[i].member);
        mp.set(members[i].member,temp+members[i].amount);
      }
      else {
        mp.set(members[i].member, members[i].amount);
        m++;
      }
      expense +=(members[i].amount);
      arr[i] = members[i].member;
    }
    console.log(expense);
    let individual = expense / m;
    let receiver = [];
    let giver = [];
    console.log(individual);
    for (let [member,amount] of mp) {
      console.log(member);
      console.log(amount);
      if (amount > individual) {
        receiver.push([amount - individual, member]);
      } else if (amount < individual) {
        giver.push([individual -amount, member]);
      }
    }
    let ans = [];
    while (receiver.length > 0 && giver.length > 0) {
      let a = receiver[0];
      let b = giver[0];
      receiver.shift();
      giver.shift();
      
      if (a[0] === b[0]) {
        ans.push([b[1], a[1], a[0]]);
      } else if (a[0] > b[0]) {
        ans.push([b[1], a[1], b[0]]);
        receiver.unshift([a[0] - b[0], a[1]]);
      } else {
        ans.push([b[1], a[1], a[0]]);
        giver.unshift([b[0] - a[0], b[1]]);
      }
    }
    for (let i = 0; i < ans.length; i++) {
      console.log(ans[i][0], ans[i][1], ans[i][2]);
    }
    return ans;
}

export default billCalculator ; 
