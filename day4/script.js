console.log("heelo");

let arr= [10,20,30];

const ans=arr.reduce((object ,el,index)=>{
    
    object[el]=index+1;
    return object;
},{})

console.log(ans);
