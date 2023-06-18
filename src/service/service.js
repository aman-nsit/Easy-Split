import React from 'react'

function billCalculator(members,expense) {

    console.log(members);
    let m = members.size;
    console.log(expense);
    let individual = expense / m;
    let receiver = [];
    let giver = [];
    console.log(individual);
    for (let [member,amount] of members) {
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
