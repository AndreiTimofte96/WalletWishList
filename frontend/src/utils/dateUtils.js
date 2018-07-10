export default function getCurrentFormattedTime(){

  let today = new Date();
  let month = today.getMonth()+1;
  let day = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let seconds = today.getSeconds();

  if (month < 10){
      month = '0' + month;
  }
  if (day < 10){
      day = '0' + day;
  }
  if (hour < 10){
      hour = '0' + hour;
  }
  if (minute < 10){
      minute = '0' + minute;
  }
  if (seconds < 10){
      seconds = '0' + seconds;
  }

  let date = today.getFullYear()+'/'+ month +'/'+ day +' '+ hour +':'+ minute + ':' + seconds;
  return date;
}