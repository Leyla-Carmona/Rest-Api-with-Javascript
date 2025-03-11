console.log(CONFIG.CAT_API_URL);
fetch(CONFIG.CAT_API_URL, {
  headers: { "x-api-key": CONFIG.CAT_API_KEY }
})
.then(response => response.json())
.then(data => console.log(data));

const ct1 = process.env.CAT_API_URL;
const fc2 = process.env.CAT_FAVOURITES_URL;
const kca = process.env.CAT_API_KEY;

const dg1 = process.env.DOG_API_URL;
const fd2 = process.env.DOG_FAVOURITES_URL;
const kda = process.env.DOG_API_KEY;

function aky(api) {  // aki for API key
    if (api === 'dog') 
        return process.env.DOG_API_KEY; // Usando process.env para obtener la clave
    else 
        return process.env.CAT_API_KEY; // Usando process.env para obtener la clave
}

function fav(api) {  //fav Api Key
    if (api === 'dog') 
        return process.env.DOG_FAVOURITES_URL; // Usando process.env para la URL de favoritos del perro
    else 
        return process.env.CAT_FAVOURITES_URL; // Usando process.env para la URL de favoritos del gato
}

function lnk(api, id) {  // lnk for link
    if (api === 'dog') 
        return `${process.env.DOG_API_URL}/${id}`; // Usando process.env para obtener la URL de imágenes del perro
    else 
        return `${process.env.CAT_API_URL}/${id}`; // Usando process.env para obtener la URL de imágenes del gato
}

async function hom() {
    const sel = document.getElementById("opt").value; //Sel for Selection
    const typ = document.getElementById("fav").value; //Typ for Type (Only Favorites or All animals)   

    if (sel == 'dog' & typ == 'all') stt(dg1, sel);
    else if (sel == 'dog' & typ == 'fav') fvs(fd2, kda, sel);
    else if (sel == 'cat' & typ == 'all') stt(ct1, sel)
    else if (sel == 'cat' & typ == 'fav') fvs(fc2, kca, sel);
}

async function stt(url, sel) { //stt for Start
    const res = await fetch(url); //Res for Response and API connection for random animals.
    const dta = await res.json(); //Dta for data
    const neC = document.createElement('div');  //Nec for New Card
    neC.id = "neC"; 
    document.querySelectorAll("div, h2, img, p").forEach(el => el.remove()); //Remove to avoid repeat the information 
    dta.forEach(aml => { 
        const inf = 'https://api.the'+sel+'api.com/v1/images/' + aml.id; //Inf for Information
        //Create the elements that we will use 
        const crd = document.createElement('div') //Crd card element 
        const iml = document.createElement('img'); //Iml por imagen element
        const nam = document.createElement('h2'); //Nam for name    
        const des = document.createElement('p'); //Des for description
        const lif = document.createElement('p'); //Ser for serie        
        const tem = document.createElement('p'); //Tem for temperament
        const btt = document.createElement('button'); //Btt por Button        
        const btd = document.createElement('button'); //Btd por Button Delete
        dtl(inf, nam, des, tem, lif, btt); //Function to get the animal information
        //Add the information that we have 
        iml.src = aml.url;    
        btt.innerText ='Save as favorite';
        //Add the information for our div
        crd.appendChild(nam);
        crd.appendChild(iml);
        crd.appendChild(des);
        crd.appendChild(lif);
        crd.appendChild(btt);
        neC.appendChild(crd);
        crd.id = 'crd';  
        //Add the information that we made before and add to the father.
        document.body.appendChild(neC);         
        const key = aky(sel);
        const url = fav(sel);
        //Safe a favorite button
        btt.addEventListener('click', () => {
            sfv(url, key, aml.id);
        }); 
    });
} 

async function dtl(url, nam, des, tem, lif) { //Dlt for Details
    const res = await fetch(url); 
    const dta = await res.json();    
    //Information that we will see is getting here.
    nam.innerText = dta.breeds?.[0]?.name  || 'Name not available';    
    des.innerText = dta.breeds?.[0]?.description || 'Description not available';
    tem.innerText = 'Temperament: ' + dta.breeds?.[0]?.temperament  || 'Temperament not available';
    lif.innerText = 'Life span: ' + dta.breeds?.[0]?.life_span  || 'Life span not available';     
} 

async function fvs(url, key, sel) { //Fvs for Favorites   
   // let ans = aky(sel); //call the function ; 
   const res = await fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': key
        }
    })
    const dta = await res.json(); 
    const neC = document.createElement('div');  //Nec for New Card
    neC.id = "neC"; 
    document.querySelectorAll("div, h2, img, p").forEach(el => el.remove()); //Remove to avoid repeat the information    
    dta.forEach(aml => { 
        //Create the elements that we will use 
            const crd = document.createElement('div') //Dse for section or Div        
            const iml = document.createElement('img'); //Iml por imagen element
            const nam = document.createElement('h2'); //Des for description   
            const des = document.createElement('p'); //Des for description
            const lif = document.createElement('p'); //Ser for serie        
            const tem = document.createElement('p'); //Tem for temperament      
            const btd = document.createElement('button'); //Btd por Button Delete
            //Add the information that we have                         
            iml.src = aml.image.url;   
            nam.innerText = aml.image_id;                          
            const inf = lnk(sel, aml.image_id)
            dtl(inf, nam, des, tem, lif); //Function to get the animal information
            btd.innerText ='Delete from favorite';
            //Add the information for our div
            crd.appendChild(nam);
            crd.appendChild(iml);
            crd.appendChild(des);
            crd.appendChild(lif);
            crd.appendChild(btd);
            neC.appendChild(crd);
            crd.id = 'crd';  
            //Add the information that we made before and add to the father.
            document.body.appendChild(neC);
            
        btd.addEventListener('click', () => {
            dfv(url,key, aml.id, sel);            
        });
        });
} 

async function sfv(url, key, id) { //Sfv for Save favorites   
    const res = await fetch(url, {
            method: 'POST', //When we use POST we need to specify the information to Javascript.         
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            body: JSON.stringify
                (
                    {
                        image_id: id
                    }
                ),                
        }
    );    
    alert('Saved');
}

async function dfv(url, key, id, sel) { //Sfv for Save favorites   
    const res = await fetch(`${url}/${id}?api_key=${key}/`, {
            method: 'DELETE',      
            headers: {
                'x-api-key': key
            } 
        });
        alert('Deleted!');
        fvs(url, key, sel);
        const data =  await res.json();
}