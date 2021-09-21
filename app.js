// *** SELECTION *** //

const form = document.querySelector('.grocery-form');
const alert = document.querySelector('.alert');
const input = document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const deleteBtn = document.querySelector('.delete-btn');
const editBtn = document.querySelector('.edit-btn');
const clearBtn = document.querySelector('.clear-btn');

// *** EDIT OPTION *** //

let editElement ;
let editFlag = false;
let editID = '';
// *** FUNCTION *** //
const displayAlert = (text, action)=>{
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(()=>{
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);

  }, 1000)
}

// Set Back to default

const setDefault = ()=>{
  input.value ='';
  editFlag = false;
  editID = '';
  submitBtn.textContent= 'submit';

};
// clear everything

const clearItems = ()=>{

  const items = document.querySelectorAll('.grocery-item');

  if (items.length > 0){
    items.forEach(item =>list.removeChild(item))
  }

  container.classList.remove('show-container');

};

// Deleting Item

const removeItem = (e)=>{

  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element)

  if (list.children.length == 0){
    container.classList.remove('show-container');
  }

  displayAlert('Item Deleted Successfully', 'danger');
};
// Edit Item

const editItem = (e)=>{
 //const element = e.currentTarget.parentElement.parentElement;
 editElement = e.currentTarget.parentElement.previousElementSibling;
 input.value = editElement.innerHTML;
 editFlag = true;
 submitBtn.textContent = 'edit';



};


// Add to local storage

const addToLocalStorage = (id, value)=>{
  
  let items = getLocalItems();
  let itemArr = {id, value};
  items.push(itemArr);
  localStorage.setItem('item', JSON.stringify(items));
};

const getLocalItems = ()=>{
  return localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item'))
  : [];
}
// Edit local Storage

const editLocalStorage = (id,value)=>{

  let items = getLocalItems();

  items = items.map((item) =>{

    if (item.id === id){
      item.value = value;
    }
    return item;
  })
localStorage.setItem('item', JSON.stringify(items))

};

const addItems = (e)=>{
  e.preventDefault();
  let value = input.value;
  let id = new Date().getTime().toString();
  if (value && !editFlag){
    const element = document.createElement('article'); // Creating element

    element.classList.add('grocery-item') // adding class

    // Adding ID 

    const atribute = document.createAttribute('data-id'); // Creating a "id" attribute

    atribute.value = id; // Set the value of the attribute

    element.setAttributeNode(atribute); // adding attribute to element
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
    <!-- edit btn -->
    <button type="button" class="edit-btn">
    <i class="fas fa-edit"></i>
    </button>
    <!-- delete btn -->
    <button type="button" class="delete-btn">
    <i class="fas fa-trash"></i>
    </button>
    </div>`;
   list.appendChild(element); // append child 
   container.classList.add('show-container');// Displaying the container

   const deleteBtn = element.querySelector('.delete-btn');
   const editBtn = element.querySelector('.edit-btn');


   deleteBtn.addEventListener('click', removeItem);
   editBtn.addEventListener('click', editItem);

   displayAlert('item added successfully', 'success');
   addToLocalStorage(id, value);
   setDefault();

  }else if (value && editFlag){
    editElement.innerHTML = value;
    displayAlert('Item editted Successfully', 'success');
    setDefault();
    


  }else{
    displayAlert('Empty! Please Enter Something', 'danger')

  }
}
// *** EVENT LISTENER *** //

form.addEventListener('submit', addItems);
clearBtn.addEventListener('click', clearItems);

// *** SETUP *** //



