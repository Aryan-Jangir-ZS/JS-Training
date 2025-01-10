const dates = [];
for (let i = 0; i < 10; i++) {
    dates[i] = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
}

const incDates = dates.slice().sort((firstDate, secondDate) => new Date(firstDate) - new Date(secondDate));
const decDates = dates.slice().sort((firstDate, secondDate) => new Date(secondDate) - new Date(firstDate));

console.log('Increasing Dates:', incDates);
console.log('Decreasing Dates:', decDates);
console.log('Original Dates:', dates);


const dateData = document.querySelectorAll('.date');
 const incDateData = document.querySelectorAll('.incDate');
    const desDateData = document.querySelectorAll('.desDate');

dates.forEach((date, index) => {
        dateData[index].textContent = date.toLocaleString();
    });

 incDates.forEach((date, index) => {
        incDateData[index].textContent = date.toLocaleString();
    });

 decDates.forEach((date, index) => {
        desDateData[index].textContent = date.toLocaleString();
    });

