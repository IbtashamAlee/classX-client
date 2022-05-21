export function getEndingDate(clockDate) {
  let time = new Date(clockDate).toLocaleTimeString('en-US',
      {hour12:true,hour:'numeric',minute:'numeric'}
  );
  let date = new Date(clockDate);
  return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ends at ' + time;
}
