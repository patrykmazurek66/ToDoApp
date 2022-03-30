const inputHTML = document.querySelector('nav form input');
const addBtn = document.querySelector('button.add');
const listHTML = document.querySelector('ul.todolist');
const colorPicker = document.querySelector('input[data-jscolor]');


let elementsArray = [];
let elementsNum = 0;

//console.log(colorPicker.value);

function add(input = ''){
    if(input === ''){
         input = inputHTML.value;
    }
    const color = colorPicker.value;
    if(input ===''){
        alert("Can't be empty!");
        return;
    }
    inputHTML.value = '';
    const newItem = new listItem(input,color);
    elementsArray.push(newItem);
    elementsNum++;
 
    refresh();
}

function refresh(){
    saveNotes(elementsArray);
    listHTML.innerHTML='';
    for(let i=0;i<elementsArray.length;i++){
        const newItemList = document.createElement('li');   //tworzenie nowego elementu
        listHTML.appendChild(newItemList);
        newItemList.style.backgroundColor = elementsArray[i].getColor();  //ustaw kolor tła

        newItemList.innerHTML += ` <div></div>`;
        newItemList.innerHTML += ` <div>${elementsArray[i].getText()}</div>`;//ustaw treść
        newItemList.innerHTML += ` <button class = "deleteBtn" data-id = ${i}><i class="fa-solid fa-trash"></i></button>`; //przycisk do usuwania
        newItemList.innerHTML += ` <button class = "doneBtn" data-id = ${i}><i class="fa-solid fa-check"></i></i></button>`; //przycisk do wykreślania
        newItemList.innerHTML += ` <button class = "editBtn" data-id = ${i}><i class="fa-solid fa-pen"></i></i></button>`; //przycisk do edycji
        
        document.querySelector(`.deleteBtn[data-id = "${i}"]`).addEventListener('click',(e)=>{
            elementsArray.splice(newItemList.querySelector('.deleteBtn').getAttribute('data-id'),1);
            elementsNum--;
            refresh();
        });
        document.querySelector(`.doneBtn[data-id = "${i}"]`).addEventListener('click',(e)=>{
            elementsArray[i].setIsDone(!elementsArray[i].getIsDone());
            refresh();
        });
        document.querySelector(`.editBtn[data-id = "${i}"]`).addEventListener('click',(e)=>{
            inputHTML.value = elementsArray[i].getText();
            elementsArray.splice(newItemList.querySelector('.deleteBtn').getAttribute('data-id'),1);
            elementsNum--;
            refresh();
        });


        newItemList.setAttribute('data-id', i);
        newItemList.setAttribute('data-done',elementsArray[i].getIsDone());
    
    }
}





function saveNotes(items){
    window.localStorage.clear();
    for(let i = 0;i<items.length;i++){
        window.localStorage.setItem(`notes-${i}`,JSON.stringify(items[i]));
    }
    window.localStorage.setItem("notesAmmount", elementsNum);
}

function loadNotes(){
    elementsNum = window.localStorage.getItem("notesAmmount");
    for(let i=0;i<elementsNum;i++){
        let newItem = JSON.parse(window.localStorage.getItem(`notes-${i}`));
        Object.setPrototypeOf(newItem, new listItem());
        elementsArray.push(newItem);
    }
    refresh();
}


addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    add();
    });

loadNotes();





