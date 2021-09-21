//selecting

let form = document.querySelector('.grocery-form');
let alert = document.querySelector('.alert');
let input = document.querySelector('#grocery');
let submitBtn = document.querySelector('.submit-btn');
let container = document.querySelector('.grocery-container');
let list = document.querySelector('.grocery-list');
let clearBtn = document.querySelector('.clear-btn');
const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');


//***Editiing***//

let editID = '';
let editFlag = false;
let editElement;



//**Functions **//

//Displaying alert//

const displayAlert = (text, action)=>{
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout (()=>{
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);

    }, 1000)
};
// *** SET TO DEFAULT *** //

const setDefault  = ()=>{
    input.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent= 'submit';

};

// *** CLEAR ITEM *** //

const clearItems = ()=>{
    let items = document.querySelectorAll('.grocery-item');

    if(items.length > 0){
    items.forEach((item)=>{
        list.removeChild(item);
    })
}

    container.classList.remove('show-container');
    localStorage.removeItem('item');

};

// *** DELETE ITEM *** //

const deleteItem = (e)=>{

    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    if(list.children.length = 0){
        container.classList.remove('show-container');
    }

    displayAlert('Item Deleted', 'danger');
    setDefault();

    // remove item from local Storage
        removeLocalStorage(id);
    

};

//*** EDIT ITEM ***//

const editItem = (e)=>{
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    input.value = editElement.innerHTML;
    editFlag = true;
    submitBtn.textContent = 'edit';
    
}

// *** LOCAL STORAGE*** //

const getLocalItems = ()=>{
    return localStorage.getItem('item')? JSON.parse(localStorage.getItem('item')) 
    : [];
    
}
// adding items to local storage


const addToLocalStorage = (id, value)=>{
    const itemArr = {id, value};
    const items = getLocalItems();
    items.push(itemArr);
    localStorage.setItem('item', JSON.stringify(items));

}

// Editting Local Storage 

const editLocalStorage =(id, value) =>{
    let items = getLocalItems();
    items = items.map((item)=> {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    localStorage.setItem("item", JSON.stringify(items));
  }

// Remove items from Local Storage

const removeLocalStorage = (id)=>{
    let items = getLocalItems();
    items = items.filter((item)=>{
        if (item.id !== id){
            return item;
        }
    });
    localStorage.setItem('item', JSON.stringify(items));   

}
// Creating Items

const createItems = (id, value)=>{

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
        
        const delBtn = element.querySelector('.delete-btn');
        const edtBtn = element.querySelector('.edit-btn');
        delBtn.addEventListener('click', deleteItem);
        edtBtn.addEventListener('click', editItem);
        
}

// Set Up Items

 const setItems = ()=>{

    let items = getLocalItems();
    if (items.length > 0){

        items.forEach((item)=>{
            createItems(item.id, item.value);

    
        })

        container.classList.add('show-container');
    }


 };


// Adding Item in the DOM //

const addItem = (e)=>{
    e.preventDefault();
    const id = new Date().getTime().toString();
    
    let value = input.value;
    
    if (value && !editFlag){

        createItems(id, value)
        
        displayAlert('Item Added Successfully', 'success'); // Displaying Alert

  
        container.classList.add('show-container'); // Displaying the container

       

        addToLocalStorage(id, value); // adding to local storage


        setDefault(); // Set Back to default
        
    } else if (value && editFlag){

        editElement.innerHTML = value;
        displayAlert('Item editted Successfully', 'success');

        // Edit local Storage

        editLocalStorage(editID, value);


        setDefault();
        
    }else{
        displayAlert('Please Enter Something', 'danger')
    }
    
    };

    //**Event Listeners**//
    
    // submitting the form //
    form.addEventListener('submit',  addItem);

    // Clearing all the items

    clearBtn.addEventListener('click', clearItems);

    // Setup 

    window.addEventListener('DOMContentLoaded', setItems);
