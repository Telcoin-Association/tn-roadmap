export function formatLastUpdated(d: Date) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day % 100 !== 11 ? 'st' :
    day % 10 === 2 && day % 100 !== 12 ? 'nd' :
    day % 10 === 3 && day % 100 !== 13 ? 'rd' : 'th';
  return `${months[d.getMonth()]} ${day}${suffix}, ${d.getFullYear()}`;
}
