//Write a function that returns a Promise that resolves with the string "Success" after 2 seconds.

const delay = ()=>{
    return new Promise(( res )=>{
        setTimeout(() => {
            res("Success")
        }, 2000);
    })
}


delay().then( res =>console.log(res))

//Create two Promises: one that resolves with a number after 1 second and another that resolves with a string after 2 seconds. Use Promise.all() to log both results once they are resolved.

const promise1 = new Promise(( resolve ) => {
    setTimeout(() => {
        resolve("Success from Promise 1")
    }, 2000);
})

const promise2 = new Promise(( resolve ) => {
    setTimeout(() => {
        resolve("Success from Promise 2")
    },1000)
})

Promise.all([promise2,promise1]).then((res) => console.log(res));

// Write a function that simulates three API calls using Promises. One should resolve, one should reject, and one should resolve after 3 seconds. Use Promise.allSettled() to log the results.


const fakeApi = () => {
    const promiseResolve = new Promise((res) => {
        res("Success ")
    });

    const promiseReject = new Promise(( res ,reject ) => {
        reject(" Reject promise ")
    });

    const promiseResolve3s = new Promise( ( res ) => {
        setTimeout(()=>{
            res("resolve")
        },3000)
    });

    Promise.allSettled([promiseResolve,promiseReject,promiseResolve3s]).then((result) => {console.log(result)
        }
    );


};

fakeApi();

// Using Promise.race():Create two Promises that resolve after different timeouts. Use Promise.race() to log the value of the first one that resolves.

const promiseA = new Promise(( res ) => setTimeout(res,1000,"PromiseA"))
const promiseB = new Promise(( res ) => setTimeout(res,2000,"PromiseB"))
console.log("4");

Promise.race([promiseA,promiseB]).then( firstPromise => console.log(firstPromise));

//Write a function that uses Promise.all() with three Promises: two that resolve and one that rejects. Log the results and observe what happens to the output.

console.log("5");

const promiseFunction = () => {
    const promiseResolve = new Promise((res) => {
        res("Success ")
    });

    const promiseReject = new Promise(( res ,reject ) => {
        reject(" Reject promise ")
    });

    const promiseResolve3s = new Promise( ( res ) => {
        setTimeout(()=>{
            res("resolve")
        },3000)
    });

    Promise.all([promiseResolve,promiseReject,promiseResolve3s]).then((result) => {console.log(result)});
};

promiseFunction();

//Create a function that uses async/await to fetch data from three different APIs in sequence, ensuring each call waits for the previous one to complete.

console.log("6");

const fetchApi = async () => {
    const first = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const data1 = await first.json()

    const second = await  fetch("https://jsonplaceholder.typicode.com/posts/1/comments") 
    const  data2 = await  second.json()

    const third = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
    const data3 = await third.json()

    return [data1,data2,data3];
}

fetchApi().then(result => console.log(result))

//Write a program that simulates a race condition with two asynchronous functions that increment a shared variable. Log the final value of the shared variable after all operations are complete.

var raceVariable = 0;

const promiseRace = async () => {


    const function1 =  fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
        raceVariable = 9;
    })
    const function2 = fetch("https://jsonplaceholder.typicode.com/comments?postId=1").then((res) => {
        raceVariable = 4;
    })


    await Promise.race([function1,function2]);

    return raceVariable;
}

promiseRace().then((res)=>{console.log(raceVariable)
}) 




