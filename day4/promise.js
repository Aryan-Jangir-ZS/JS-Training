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

//Combining Promise Methods:Write a function that uses Promise.all() to fetch data from multiple sources and then uses Promise.race() on the results to find the fastest response.

const fetchFromSources = async (sources) => {
    try {
        const getPromises = sources.map((url) => fetch(url).then((res) => res.json()));
        
        const results = await Promise.all(getPromises);
        console.log('All results:', results);

        const fastest = await Promise.race(getPromises);
        console.log('Fastest response:', fastest);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchFromSources([
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
]);

// Promise with Random Failure:Create a function that returns a Promise that randomly resolves or rejects. Use Promise.allSettled() to call this function multiple times and log the results.

const randomPromise = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('Success') : reject('Failure');
        }, Math.random() * 1000);
    });

const multipleCall = async () => {
    const promises = Array(5).fill(null).map(() => randomPromise());

    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
        console.log(`Promise ${index + 1}:`, result.status, result.reason || result.value);
    });
};

multipleCall();

//Chaining Promises:Write a series of Promises that chain together to perform a calculation (e.g., adding two numbers, then multiplying the result by a third number). Log the final result.

const addNumbers = (a, b) =>
    new Promise((resolve) => setTimeout(() => resolve(a + b), 500));

const multiplyNumbers = (a, b) =>
    new Promise((resolve) => setTimeout(() => resolve(a * b), 500));

addNumbers(5, 10)
    .then((sum) => {
        console.log('Sum:', sum);
        return multiplyNumbers(sum, 3);
    })
    .then((product) => console.log('Final Result:', product))
    .catch((error) => console.error('Error:', error));

// Relay promise game 


const relayGame = async () => {
    const team1 = fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.json());
    const team2 = fetch('https://jsonplaceholder.typicode.com/posts/2').then((res) => res.json());
    const team3 = fetch('https://jsonplaceholder.typicode.com/posts/3').then((res) => res.json());
    const team4 = fetch('https://jsonplaceholder.typicode.com/posts/4').then((res) => res.json());

    const teams = [team1, team2, team3, team4];

    const results = await Promise.allSettled(teams);

    const sequence = results.map((result, index) => ({
        team: `team${index + 1}`,
        status: result.status,
    }));

    const raceWinner = await Promise.race(teams);
    console.log(`${raceWinner.team} won`);
    
    console.log('Sequence of teams are:');
    sequence.sort((firstPromise, secondPromise) => firstPromise.position - secondPromise.position).forEach((team, index) => console.log(`${team.team} -> ${index + 1}st position`));
};

relayGame();
