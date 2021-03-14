let potvrdio1=false;
let potvrdio2=false;
function potvrdili(dugme)
{
    
if (dugme.name=="potvrdi1")
{
potvrdio1=true;
}
else 
{
    potvrdio2=true;
}
if (potvrdio1&&potvrdio2)
{
    document.location.href = "skocko-podesavanja.html";
}
}