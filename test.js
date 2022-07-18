let d_t = new Date('2022-07-07T17:44:33.578Z')
// const d_t = new Date();
 
let year = d_t.getFullYear();
let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
let day = ("0" + d_t.getDate()).slice(-2);
let hour = d_t.getHours();
let minute = d_t.getMinutes();
let seconds = d_t.getSeconds();

console.log(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds);