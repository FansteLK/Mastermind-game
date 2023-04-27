$("document").ready(function()
    {
        let popunjeno1=false;
      let popunjeno2=false;
let popunjeno3=false;
let popunjeno4=false; 
        let igrac=0;
        let brojPopunjenih=0;
        let tmpKomb=[];
        let cnt=1;
        inicijalizacije();
        function inicijalizacije()
        {
            tmpKomb.push(popunjeno1);
            tmpKomb.push(popunjeno2);
            tmpKomb.push(popunjeno3);
            tmpKomb.push(popunjeno4);
            $(".dodaj").hide();
            ini("tabela1");
            ini("tabela2");
            ini2("tabela3","=>");
            ini2("tabela4","<=");
            ini3("tabela8");
            ini3("tabela9");
            ini4("tabela5")
            ini4("tabela6");
          let slike=  $(".dodaj").each
          (
              function()
              {
                  $(this).click(function()
                  {
                      
                      dodajUKomb(this);
                  })
              }
          );
          
        }
       
        function ini(ime)
        {
            let cntIni;
            if (ime=="tabela1")
            {
           cntIni=0;
            }
            else
            {
                
           cntIni=28;
            }
          
        let tabela=$("#"+ime)
            for (let i=0;i<7;i++)
            {
                var red= $("<tr></tr>")
                for (let j=0;j<4;j++)
                {
                    cntIni++;
                   
                 var celija=$("<td></td>").attr("id","td"+cntIni).css(
                     {
                         "background-color":"blue",
                        "width":"25%",
                        "height":"14%",
                       "border-style": "solid",
                       "border-radius": "15px",
                       "border-width": "1px",
                     
                     })
                 red.append(celija);
                     
                }
        
                tabela.append(red);
                
            }
        }
        function ini2(ime,znak)
        {
            let cnt;
            if (ime=="tabela3")
            {
              cnt=0;
            }
            else
            {
                cnt=7;
            }
            let tabela=$("#"+ime)
            for (let i=0;i<7;i++)
            {
                cnt++;
                let red= $("<tr></tr>");

                let celija=$("<td></td>").css(
                  {
                    "width":"100%",
                 
                 
                  }
                ).append($("<button>"+znak+"</button>").css(
                    {
                        "width":"100%",
                      
                        "height":"30px"
                    }).addClass("btn btn-primary btn-sm").attr("id","dugmeProveri"+cnt).addClass("dugmeProveri").prop("disabled",
                    true).on(
                        "click",
                        function()
                        {
                            proveriTacnost($(this));
                        }
                    )
                    )
                red.append(celija);
                tabela.append(red);
            }
        }
        function ini3(ime)
        {
            let cntIni;
            if (ime=="tabela8")
            {
           cntIni=0;
            }
            else
            {
                
           cntIni=4;
            }
             let tabela=$("#"+ime)
          
               
                    
                    let red= $("<tr></tr>")
                    for (var j=0;j<4;j++)
                    {
                        cntIni++;
                     let celija=$("<td></td>").attr("id","tdD"+cntIni).css(
                         {
                            "background-color":"blue",
                            "width":"25%",
                            "height":"14%",
                           "border-style": "solid",
                           "border-radius": "15px",
                           "border-width": "1px",
                        
                         })
                     red.append(celija);
                         
                    }

                tabela.append(red);
        }
        function ini4(ime)
        {
            let cntIni;
            if (ime=="tabela5")
            {
           cntIni=0;
            }
            else
            {
                
           cntIni=28;
            }
          
        let tabela=$("#"+ime)
            for (let i=0;i<7;i++)
            {
                var red= $("<tr></tr>")
                for (let j=0;j<4;j++)
                {
                    cntIni++;
                   
                 var celija=$("<td></td>").attr("id","tdP"+cntIni).css(
                     {
                        //  "background-color":"coral-red",
                        "width":"25%",
                        "height":"14%",
                    //    "border-style": "solid",
                    //    "border-radius": "50%",
                    //    "border-width": "1px",
                     
                     })
                 red.append(celija);
                     
                }
        
                tabela.append(red);
               
        }
    }
        let vreme;
       let vreme1=0;
       let vreme2=0;
       let handler;
       $("#dugmeNova").click(function()
       {
        document.location.href = "skocko-podesavanja.html";
        // reset();
        // clearInterval(handler);
        // $(".jakfont").text("");

        //    vreme1=60;
        //    vreme2=60;
        //    $("#dugmeStart").prop("disabled",false); 
        //    $("#dugmeProveri1").prop("disabled",true);
       })
        $("#dugmeStart").click(function()
        {
            $(".dodaj").show();
            $("#dugmeProveri1").prop("disabled",false);
            $(this).prop("disabled", true);
            
            vreme1=60;
            vreme2=60;
            vreme=vreme1;
           handler= setInterval(promeniVreme,1000);

        })
   function proveriSifru(broj)
    {
        let  komPrava
    if (broj>7)
    {
       komPrava=JSON.parse(localStorage.getItem("kombinacija1"))
    }
    else
    {
         komPrava=JSON.parse(localStorage.getItem("kombinacija2"));
    }
       let dobraMesta=[]
        let crveni=0;
        let  zuti=0;
        for (let i=0;i<4;i++)
        {
        if (komPrava[i]==tmpKomb[i]) {
            crveni++;
         dobraMesta.push(i);
         }
        }
           for (let i=0;i<4;i++)
        {
            if (dobraMesta.includes(i)) continue;
            
            for(let j=0;j<4;j++)
            {
                if (dobraMesta.includes(j)) continue;
              if ( tmpKomb[i]==komPrava[j])
              {
                  zuti++;
                  komPrava[j]=false;
                  break;
              }
            }
    }
    prikaziTacnost(crveni,zuti);
    // alert(komPrava+" = "+tmpKomb+" crveni="+crveni + " zuti="+zuti);
    return crveni;
    }  
    function zavrsiIgruPogodio(igrac)
    {
        var broj=igrac+1;
        if (igrac!=3){
    alert("Igrac "+broj+" je pobedio")
        }
        else
        {
            alert("Nereseno je");
        }
    clearInterval(handler);
    reset();

    }
function proveriTacnost(dugme)
{
    if (brojPopunjenih!=4){alert("Unesite sva polja") 
    return}

$(dugme).prop("disabled",true);
var zapisId=$(dugme).attr("id")
var zapis=zapisId.substring(12);
var dugmeNext=parseInt(zapis);
if (proveriSifru(dugmeNext)==4) 
zavrsiIgruPogodio(igrac)
else{
if (dugmeNext==14) {zavrsiIgruPogodio(3)}

if (igrac==0)
{
    dugmeNext+=7;
    cnt+=28;
    igrac=1;
    vreme=vreme2
}
else
{
    dugmeNext-=6;
    cnt-=24
    igrac=0
    vreme=vreme1
}
pobrisi();

$("#dugmeProveri"+dugmeNext).prop("disabled",false);
}
}
function promeniVreme()
{
  
if (vreme==0){
    if (igrac==0)
    alert("Isteklo je vreme pobednik je igrac 2");
    else alert("Isteklo je vreme pobednik je igrac 1");
clearInterval(handler);
reset();

}
$(".jakfont").text(vreme);
vreme--;
if (igrac==0) vreme1--;
else vreme2--;


}
function dodajUKomb(slika)
{

    if (brojPopunjenih==4) return;
    brojPopunjenih++;
    
    var nadjen=false;
    
for (let i=0;i<4;i++)
    {
      
        if (tmpKomb[i]==false)
        {
            nadjen=true;
       tmpKomb[i]=$(slika).attr("name");
       let kopija= document.createElement("img");
       kopija.src=$(slika).attr("src")
       kopija.name=$(slika).attr("name");
       kopija.value=cnt+i;
       kopija.classList.add("obrisi")
       kopija.addEventListener("click",function(){obrisi(this)});
       kopija.style.width="100%";
       kopija.style.height="70px";
       let zbir=cnt+i;
      
       $("#td"+zbir).append(kopija)
     
       return;
      }

    }
}
function obrisi(slika)
{
  if (slika.value>=cnt&&slika.value<cnt+4){
    if (tmpKomb[(slika.value-1)%4]!==false)
    {
        tmpKomb[(slika.value-1)%4]=false; 
        brojPopunjenih--;
        slika.parentNode.removeChild(slika);
    }  
  }
  
} 
function pobrisi()
{
    
 brojPopunjenih=0;
 for (let j=0;j<tmpKomb.length;j++)
 {   
    tmpKomb[j]=false;
    
}

}
function obrisiSlike()
{
    $(".obrisi").each(function()
    {
        
        $(this).parent().empty(".obrisi")
    })

}
function reset()
{
    pobrisi()
    // obrisiSlike()
    cnt=0
    $(".dugmeProveri").each(function()
           
    {
        $(this).prop("disabled",true);
    })
    cnt=1;
 $(".dodaj").hide();
 prikaziResenje();
}
function prikaziResenje()
{
    let komPrava1=JSON.parse(localStorage.getItem("kombinacija1"))
    let komPrava2=JSON.parse(localStorage.getItem("kombinacija2"))
  
    for (let i=0;i<4;i++)
    {
        let slika1=$("[name="+komPrava2[i]+"]");
        let slika2=$("[name="+komPrava1[i]+"]");
       let kopija= document.createElement("img");
       kopija.src=$(slika1).attr("src")
       kopija.name=$(slika1).attr("name");
       kopija.value=i+1;
       kopija.classList.add("obrisi")
       kopija.style.width="100%";
       kopija.style.height="70px";
       let kopija2= document.createElement("img");
       kopija2.src=$(slika2).attr("src")
       kopija2.name=$(slika2).attr("name");
       kopija2.value=i+5;
       kopija2.classList.add("obrisi")
       kopija2.style.width="100%";
       kopija2.style.height="70px";
       
       var zbir=i+1;
       $("#tdD"+zbir).append(kopija)
       var zbir=i+5;
       $("#tdD"+zbir).append(kopija2)
      
      }

    }
function prikaziTacnost(crveni,zuti)
{

    let tmpCnt=0;
   for(let c=0;c<crveni;c++)
   {
    var zbir=tmpCnt+cnt;
       let kopija= document.createElement("img");
       kopija.src="skocko-dodatno/crvena.png"
       kopija.classList.add("obrisi")
       kopija.style.width="100%";
       kopija.style.height="50px";
       var zbir=tmpCnt+cnt;
    $("#tdP"+zbir).append(kopija)
    tmpCnt++;
   }
   for (let z=0;z<zuti;z++)
   {
    
    let kopija2= document.createElement("img");
    kopija2.src="skocko-dodatno/zuta.png"
    kopija2.classList.add("obrisi")
    kopija2.style.width="100%";
    kopija2.style.height="50px";
    var zbir=tmpCnt+cnt;
    $("#tdP"+zbir).append(kopija2)
    tmpCnt++;
   }
 
}
   }
)