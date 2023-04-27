
let popunjeno1=false;
let popunjeno2=false;
let popunjeno3=false;
let popunjeno4=false;
let brojPopunjenih=0;
let popunjenost=[];
let igrac=1;
function inicijalizuj()
{
  
popunjenost.push(popunjeno1);
popunjenost.push(popunjeno2);
popunjenost.push(popunjeno3);
popunjenost.push(popunjeno4);
localStorage.setItem('kombinacija1',JSON.stringify(popunjenost));
localStorage.setItem('kombinacija2',JSON.stringify(popunjenost));
}
function dodajUKomb(slika)
{

    if (brojPopunjenih==4) return;
    brojPopunjenih++;
    var cnt=0;
    var nadjen=false;
    // alert(popunjenost);
for (let i=0;i<4;i++)
    {
 cnt++;
        if (popunjenost[i]==false)
        {
            nadjen=true;
       popunjenost[i]=slika.name;
       let kopija= document.createElement("img");
       kopija.src=slika.src;
       kopija.name=slika.name;
       kopija.value=cnt;
       kopija.classList.add("obrisi")
       kopija.addEventListener("click",function(){obrisi(this)});
       document.getElementById("td"+cnt).appendChild(kopija);
       return;
      }

    }
}
function obrisi(dugme)
{
  
    if (popunjenost[dugme.value-1]!==false)
    {
        popunjenost[dugme.value-1]=false; 
        brojPopunjenih--;
        dugme.parentNode.removeChild(dugme);
    }
    
 
   
}
function sacuvaj()
{
    if (igrac==1){
if (brojPopunjenih!=4) {
    alert("Neispravna kombinacija morate popuniti sva polja")
    return;}
localStorage.setItem('kombinacija1',JSON.stringify(popunjenost));
igrac++;
let dugmad=[];
  dugmad=document.getElementsByClassName('obrisi');
  var duzina=dugmad.length
 for (let j=0;j<duzina;j++)
 {   
    obrisi(dugmad[0]); 
    
    }
   
}
    else
    {
        if (brojPopunjenih!=4) {
            alert("Neispravna kombinacija morate popuniti sva polja")
            return;}
        localStorage.setItem('kombinacija2',JSON.stringify(popunjenost));
        document.location.href = "skocko-igra.html";
    }
}