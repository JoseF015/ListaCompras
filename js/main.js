
let element=document.getElementById("totalPrecio");
element.innerHTML="Total en precio";

let txtNombre=document.getElementById("Name");
//txtNombre.value="Leche Semidescremada";

let txtNumber=document.getElementById("Number");

let campos=document.getElementsByClassName("campo");
// campos[0].value="Leche descremada deslactosada light=agua";
// console.log(campos);
// console.log(campos[0].value);

// for(let i=0; i<campos.length; i++) Lee los span y le agrega el style
// {
//     campos[i].style.border="red thin solid";
// }

//campos es una coleccion HTML-HTMLAllCollection.

let spans=document.getElementsByTagName("span");
for (let i = 0; i < spans.length; i++) {
    console.log(spans[i].textContent);
}

/* <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>$ 25</td>
</tr> */

let tabla=document.getElementById("tablaCompras");
let bodyTabla=tabla.getElementsByTagName("tbody"); /*busca los tbody del html
con otro tbody en html se usa [1]
pero que este dentro de la misam tabla o mandar a llamar otra tabla. */



/* bosyTable.innerHTML lleva el [0] porque trae varios elementos y hay que 
especificar a cual desde eñ 0. */

/*bodyTabla[0].innerHTML=`<tr>  
<th scope="row">1</th>
<td>Leche Descremada</td>
<td>2</td>
<td>$ 25</td>
</tr> `;*/

// let agregar=document.getElementById("btnAgregar");
// console.log(agregar)
let contador=0;
let costoTotal=0;
let datos=[];
let agregar=document.getElementById("btnAgregar");
let total=document.getElementById("totalPagar");
let totalEnProductos=0;

function validarNombre()
{
    if(txtNombre.value.lenght <3){return false;}
    return true;
}

function validarCantidad()
{
    if(txtNumber.value.lenght==0){return false;}
    if(isNaN(txtNumber.value)){return false;}
    if(parseFloat(txtNumber.value)<=0){return false;}
    return true;
}



//agregar.addEventListener("click",(event)=>{console.log("Click en el boton agregar", event);}); //con event.target mada el bottom en codigo HTML
//con function aparte tambien se puede
agregar.addEventListener("click",(event)=>{
    event.preventDefault();
   
    if((! validarNombre()) || (! validarCantidad()))
    {
        let lista="";

        if(!validarNombre())
        {
            txtNombre.style.border="red thin solid";
            lista+="<li>Se debe escribir un nombre válido</li>"
        }

        if(!validarCantidad())
        {
            txtNombre.style.border="red thin solid";
            lista+="<li>Se debe escribir una cantidad válida</li>"
        }
        document.getElementById("alertValidText").innerHTML=`Los campos deben ser llenados correctamente. <ul>${lista}</ul>`;
        
        document.getElementById("alertValidacion").style.display="block";

        setTimeout(function()
        {
            document.getElementById("alertValidacion").style.display="none";
        }, 5000);

        return false;
    }

    txtNumber.style.border="";
    txtNombre.style.border="";

    document.getElementById("alertValidacion").style.display="none";
    // no breack porque solo es para siclos

    contador++;
    document.getElementById("contadorProductos").innerHTML=contador; //se asigna el valor 
    localStorage.setItem ("contadorProductos", contador);
    let precio=(Math.floor((Math.random()*50)*100))/100;
    let cantidad=parseFloat(txtNumber.value);

    totalEnProductos += (cantidad<1)?Math.ceil(cantidad):parseInt(cantidad);
    document.getElementById("productosTotal").innerHTML = totalEnProductos;  
    localStorage.setItem ("productosTotal", totalEnProductos);
    costoTotal +=(precio*cantidad);
    total.innerHTML=`$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("precioTotal", costoTotal.toFixed(2));

    //JSON
    let elemento=`{"id":${contador},
     "nombre":"${txtNombre.value}",
     "cantidad": ${txtNumber.value}, 
     "precio":${precio}
    }`;
    //cantidad tambien entre comillas si no muestra en datos. 

    datos.push(JSON.parse(elemento));
    localStorage.setItem("elementosTabla", JSON.stringify(datos)); //elementos tabla es el nombre con se identifica
    console.log(datos);

    let tmp=`<tr>  
    <th scope="row">${contador}</th>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>$ ${precio}</td>
    </tr> `;

    bodyTabla[0].innerHTML +=tmp;
    //console.log(txtNombre.value,txtNumber.value);
    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus(); //colocla el puntador en el Nombre
});

// let numero = 5.56789; 
// let conDecimal = numero.toFixed(2);  Solo dos decimales.

//blur cuando se pierde el foco
txtNombre.addEventListener("blur", (event)=>{
    event.target.value=event.target.value.trim();
});
//para quitar los espacios antes escribir una letra en el cuadro
txtNumber.addEventListener("blur", (event)=>{
    event.target.value=event.target.value.trim();
});

window.addEventListener("load", function() {
    if (localStorage.getItem ("contadorProductos")!=null)   {
        contador = parseInt(localStorage.getItem ("contadorProductos"));
        document.getElementById("contadorProductos").innerHTML=contador;
    }//if  contadorProductos
     if (localStorage.getItem ("productosTotal")){
        totalEnProductos = parseInt(localStorage.getItem ("productosTotal"));
        document.getElementById("productosTotal").innerHTML = totalEnProductos; 
     } //if productosTotal
      if (localStorage.getItem ("precioTotal")){
        costoTotal = parseFloat(localStorage.getItem ("precioTotal"));
        total.innerHTML = costoTotal;
      }//if precioTotal
      if(localStorage.getItem("elementosTabla")!=null)
      {
          datos=JSON.parce(localStorage.getItem("elementosTabla"));
          datos.forEach(element =>
            {
                bodyTabla[0].innerHTML += `<tr>  
                <th scope="row">${element.id}</th>
                <td>${element.nombre}</td>
                <td>${element.cantidad}</td>
                <td>$ ${element.precio}</td>
                </tr> `;
            })
      }

      for(let i=0;i<localStorage.length;i++)
      {
          console.log(i+": "+localStorage.key(i)+":"+localStorage.getItem(localStorage.key(i)));
      }
    }
);