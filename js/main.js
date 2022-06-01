
let element=document.getElementById("totalPrecio");
element.innerHTML="Total en precio";

let txtNombre=document.getElementById("Name");
//txtNombre.value="Leche Semidescremada";

let txtNumber=document.getElementById("Number");

let campos=document.getElementsByClassName("campo");
// campos[0].value="Leche descremada deslactosada light=agua";
// console.log(campos);
// console.log(campos[0].value);

for(let i=0; i<campos.length; i++)
{
    campos[i].style.border="red thin solid";
}

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

let agregar=document.getElementById("btnAgregar");
//agregar.addEventListener("click",(event)=>{console.log("Click en el boton agregar", event);}); //con event.target mada el bottom en codigo HTML
//con function aparte tambien se peude
agregar.addEventListener("click",(event)=>{

    let precio=Math.random()*50;
    let tmp=`<tr>  
    <th scope="row">1</th>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>$ ${precio}</td>
    </tr> `;
    console.log(tmp);
    bodyTabla[0].innerHTML +=tmp;
    //console.log(txtNombre.value,txtNumber.value);
    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus();
});