var now = new Date();

let times = now.getFullYear().toString()+ '年' +
(now.getMonth()+1).toString()+ '月' + 
 now.getDate().toString() +'日'+
 now.getHours().toString() +'点'+
 now.getMinutes().toString() +'分'+
 now.getSeconds().toString()+'秒'
// + (Math.round(Math.random()*899999999999-100000000000)).toString() +'毫毫毫毫毫毫毫秒'

    


export default time => times