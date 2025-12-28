import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings={
  databaseURL: "https://task-app-83f99-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings);
const database=getDatabase(app);
const itemInDB=ref(database,"items");

const addBtn=document.querySelector('.add-button');
const input=document.querySelector('.input-field');
const itemsDiv=document.querySelector('.items');

onValue(itemInDB,(snapshot)=>{
  if (snapshot.exists()){
    let itemsArray=Object.entries(snapshot.val());

    clearItemsDiv();

    itemsArray.forEach((item)=>{
      addElement(item);
    });
  }
  else{
    clearItemsDiv();
  }
});

addBtn.addEventListener('click',()=>{
  const inputValue=input.value;
  if (inputValue===''){
    alert("Enter an item to add to cart!");
    return;
  }
  push(itemInDB,inputValue);
  clearInput();
});

function addElement(item){
  const el=document.createElement("span");
  el.classList.add('item');
  el.innerHTML=item[1];
  el.addEventListener('dblclick',()=>{
    let exactLoc=ref(database,`items/${item[0]}`);
    remove(exactLoc);
  });
  itemsDiv.appendChild(el);
}

function clearInput(){
  input.value="";
}

function clearItemsDiv(){
  itemsDiv.innerHTML='';
}