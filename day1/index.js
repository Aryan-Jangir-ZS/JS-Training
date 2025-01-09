
var n= 8;

function sum(a){
    return (b)=>{
        console.log(b);
    if(b>n){
     return a;
    }
    return sum(a+b);
 } 
}

function sum2(a){
    return (b)=>{
    if(!b){
     return a;
    }
    return sum2(a+b);
 } 
}


console.log("sdhfaedf");

console.log( sum2(1)(2)(3)(4)());

console.log("dfad");
