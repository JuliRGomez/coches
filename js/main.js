const cars = [
    {
        id: 1,
        brand: 'TOYOTA',
        model:'SUPRA',
        color:'ROJO',
        year:'2020',
        price:'50000'
    },
    {   
        id: 2,
        brand: 'FORD MUSTANG SHELBY',
        model:'GT350',
        color:'BBLANCO',
        year:'2020',
        price:'60000'
    },
];
let tableProperties ={
    cols:[],
    rows:[],
    ids:[]
}
let currentID='';
let view='list';
let currentCars;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CreateCard(cardProperties,img){
    
    let cardString=`<div class="card col-md-3 m-1">
                        <h4 class="card-title">${cardProperties.brand}</h4>
                        <img class="card-img-top" src="${img}" alt="Imagen de usuario">
                        <div class="card-body">
                            <h6 class="card-text">${cardProperties.model}</h6>
                            <h6 class="card-text">${cardProperties.price}</h6>
                            
                        </div>
                        <div class="card-footer">
                            <h6 class="card-text">${cardProperties.year}</h6>
                        </div>
                    </div>`
                     
    return cardString;
                                             
}
function printCards(cardsToPrint){
    const cards=document.getElementById("card-users")
    let cardReturn='';
    cardsToPrint.forEach((car)=>{
         cardReturn+=CreateCard(car,'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
    })
    cards.innerHTML=cardReturn;  
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cleanInfo() {
    const table=document.getElementById('table-cars');
    const cards=document.getElementById("card-users")
    table.innerHTML='';
    cards.innerHTML='';
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Creatable(propertiesIn) {
    const table=document.getElementById('table-cars');
    //add table head
    let headString= `<thead>
                        <tr>
                            <th scope="col">#</th>`;
    propertiesIn.cols.forEach((col)=>headString+=`<th scope="col">${col}</th>`);
    headString+=`</tr>
                    </thead>`;
    let rowString='';
    let count=1;
    propertiesIn.rows.forEach((user) => {
        rowString+=`<tr id="row-id-${propertiesIn.ids[count-1]}" onclick="selection(${propertiesIn.ids[count-1]})"><th scope="row">${count}</th>`
        user.forEach((element)=>rowString+=`<td>${element}</td>`);
        rowString+=`</tr>`
        count+=1;
    });
    let bodyString=`<tbody id="table-tbody">${rowString}</tbody>`;
    table.innerHTML=`${headString}${bodyString}`;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeItems(type){
    const form=document.getElementById("form-container");
    let htmlString='';
    if(type==='search'){
        htmlString=`    <form id="main-form" onsubmit="event.preventDefault(),summit('${type}')" action="/search">
                            <div class="row">
                                <div  class="form-group col-md-8 my-auto">
                                    <input type="text" class="form-control" id="search"  placeholder="Buscar por palabra clave">
                                </div>
                                <div class="col-md-4 my-auto">
                                    <button type="submit" class="btn btn-primary">Buscar</button>
                                </div>         
                            </div>
                        </form>`;
        search('refresh')
    }
    else if((type=='new')||(type=='update')){
        let textButton='';
        if(type=='new'){
            textButton='GUARDAR';
        }
        else{
            textButton='ACTUALIZAR'
        }
        htmlString= `<form id="main-form" onsubmit="event.preventDefault(),summit('${type}')" action="/search">
                        <div class="row">
                            <div  class="form-group">
                                <input type="text" class="form-control" id="brand"  placeholder="MARCA" required>
                            </div>
                            <div  class="form-group">
                                <input type="text" class="form-control" id="model"  placeholder="MODELO" required>
                            </div>
                            <div  class="form-group">
                                <input type="text" class="form-control" id="color"  placeholder="COLOR" required>
                            </div>
                            <div  class="form-group">
                                <input type="text" class="form-control" id="year"  placeholder="AÑO" required>
                            </div>
                            <div  class="form-group">
                                <input type="text" class="form-control" id="price"  placeholder="PRECIO" required>
                            </div>
                            <div class="">
                                <button type="submit" class="btn btn-primary">${textButton}</button>
                            </div> 
                        </div>
                    </form>`;
    }
    form.innerHTML=htmlString;     
}


function search(type) {
    if(type=='refresh'){
        tableProperties.cols=['Marca','Modelo','Color','Año','Precio'];
        tableProperties.rows=[];
        tableProperties.ids=[];
        cars.forEach(element => {
            tableProperties.rows.push([element.brand,element.model,element.color,element.year,element.price])
            tableProperties.ids.push(element.id);
        });
        const carReturn =cars.filter((car)=>{
            return car.id>0;
        })
        if(view=='list')
        Creatable(tableProperties);
        else if(view=='mosaic')
        printCards(carReturn);
        currentCars=carReturn;
        
    }
    else if(type=='filter'){
        let inText= document.getElementById('search').value;
        inText=inText.toUpperCase();
        const matchCar= cars.filter((car)=>{
        return car.brand.includes(inText)||car.model.includes(inText)||car.color.includes(inText)||car.year.includes(inText);
        });
        
        if(matchCar.length>0){
            tableProperties.cols=['Marca','Modelo','Color','Año','Precio'];
            tableProperties.rows=[];
            matchCar.forEach(element => {
                tableProperties.rows.push([element.brand,element.model,element.color,element.year,element.price])
            });
            if(view=='list')
            Creatable(tableProperties);
            else if(view=='mosaic')
            printCards(matchCar);
            currentCars=matchCar;
        }
        else{
            alert('No se encontró ninguna coincidencia');   
        }
    }

}

function deleteCar(){
    
    if(currentID>0){
        const position=cars.findIndex((car)=>car.id===currentID)
        if (position<0){
            alert('no es posible eliminar');
        }
        else {
            cars.splice(position, 1);
            currentID=-1;
            search('refresh');
            confirm("REgistro eliminado")
    }
    }
    else{
        alert('Seleccione un elemento de la lista');
    }

}

function updateCar() {
    if(currentID>0){
        const position=cars.findIndex((car)=>car.id===currentID)
        if (position<0){
            alert('no es posible actualizar, asegurese de seleccionar un elemento');
        }
        else {
            changeItems('update');
            document.getElementById('brand').value=cars[position].brand;
            document.getElementById('model').value=cars[position].model;
            document.getElementById('color').value=cars[position].color;
            document.getElementById('year').value=cars[position].year;
            document.getElementById('price').value=cars[position].price;
            
    }
    }
    else{
        alert('Seleccione un elemento de la lista');
    }
  

}

function selection(id){
    if(currentID>0){
        const preSelected=document.getElementById('row-id-'+currentID);  
        preSelected.classList.remove('bg-secondary')
    }
    currentID=id;
    const selected=document.getElementById('row-id-'+currentID);  
    selected.classList.add('bg-secondary')
    
}

function summit(type){
    if(type==='search'){
        let inText= document.getElementById('search').value;
        inText=inText.toUpperCase();
        if(inText===''){
            search('refresh');
        }
        else{
            search('filter')
        }
    }
    else if(type=='new'){
        const  idCreater=cars.length+1;
        cars.push({ id:idCreater,
                    brand:document.getElementById('brand').value.toUpperCase(),
                    model:document.getElementById('model').value.toUpperCase(),
                    color:document.getElementById('color').value.toUpperCase(),
                    year:document.getElementById('year').value.toUpperCase(),
                    price:document.getElementById('price').value.toUpperCase()})
        confirm("DATOS GUARDADOS EXITOSAMENTE");
        
    }
    else if(type=='update'){
        if(currentID>0){
            const position=cars.findIndex((car)=>car.id===currentID)
            if (position<0){
                alert('no es posible actualizar, asegurese de seleccionar un elemento');
            }
            else {
              cars[position].brand=document.getElementById('brand').value.toUpperCase();
              cars[position].model=document.getElementById('model').value.toUpperCase();
              cars[position].color=document.getElementById('color').value.toUpperCase();
              cars[position].year=document.getElementById('year').value.toUpperCase();
              cars[position].price=document.getElementById('price').value.toUpperCase();
              confirm("Registro actualizado")
              currentID=-1;
              search('refresh');
              document.getElementById('main-form').reset();
        }
        }
    }

    
}

function viewList(type){
    view=type;
    if(type=='mosaic'){
        cleanInfo();
        document.getElementById('btn-mosaic').classList.remove('btn-secondary');
        document.getElementById('btn-mosaic').classList.add('btn-primary');
        document.getElementById('btn-list').classList.remove('btn-primary');
        document.getElementById('btn-list').classList.add('btn-secondary');
        printCards(currentCars);
        alert('En este modo no se puede actualizar o eliminar datos');
        
    }
    if(type=='list'){
        cleanInfo();
        document.getElementById('btn-mosaic').classList.add('btn-secondary');
        document.getElementById('btn-mosaic').classList.remove('btn-primary');
        document.getElementById('btn-list').classList.add('btn-primary');
        document.getElementById('btn-list').classList.remove('btn-secondary');
        if(document.getElementById('search').value=='')
        search('refresh');
        else
        search('filter');
        }
   
    
    // document.getElementById('btn-'+type).classList.remove('btn-secondary');
    
}


window.summit=summit;
window.changeItems=changeItems;
window.selection=selection;
window.deleteCar=deleteCar;
window.updateCar=updateCar;
window.viewList=viewList;
