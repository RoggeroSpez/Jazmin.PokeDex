const list=document.getElementById('list');
const stats=document.getElementById('stats');

function render(filter=''){
 const items=pokemonData.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()));
 list.innerHTML='';
 items.forEach(p=>{
  const key='p_'+p.dex;
  const collected=localStorage.getItem(key)==='true';
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`#${p.dex} ${p.name}
  <br><label><input type="checkbox" ${collected?'checked':''}> Collected</label>
  <br>Card #: <input placeholder="58/102">`;
  div.querySelector('input[type=checkbox]').onchange=e=>{
    localStorage.setItem(key,e.target.checked);
    updateStats();
  };
  list.appendChild(div);
 });
 updateStats();
}
function updateStats(){
 let count=0;
 pokemonData.forEach(p=>{if(localStorage.getItem('p_'+p.dex)==='true') count++;});
 stats.textContent=`Collected ${count}/${pokemonData.length}`;
}
document.getElementById('search').oninput=e=>render(e.target.value);
render();
