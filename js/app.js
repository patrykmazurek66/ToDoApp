const inputHTML = document.querySelector('nav form input');
const addBtn = document.querySelector('button.add');
const listHTML = document.querySelector('ul.todolist');
const colorPicker = document.querySelector('input[data-jscolor]');


let elementsArray = [];
let elementsNum = 0;

console.log(colorPicker.value);

function add(){

    const input = inputHTML.value;
    const color = colorPicker.value;
    if(input ===''){
        alert("Can't be empty!");
        return;
    }
    inputHTML.value = '';
    const newItem = new listItem(input,color);
    elementsArray.push(newItem);
    elementsNum++;
    console.log(elementsArray)
    refresh();
}

function refresh(){
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

function updateColorSelect(){
    colorOption.style.backgroundColor = colorOption.value;
}

function loadColorsList(){
    for (const option of colorList) {
        option.style.backgroundColor = option.value;
        option.addEventListener("click",updateColorSelect);
    }
}


addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    add();
    });


loadColorsList();
updateColorSelect();


