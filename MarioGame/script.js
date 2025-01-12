const imgBird1="./run1.png"
const imgBird2="./run2.png"
let flag = 1;
let isMoving=1;

const imgElement = document.getElementById("objectImage")
imgElement.src = imgBird1;

const intervalImage = setInterval(() => {
    (flag%2==0)?imgElement.src = imgBird1 : imgElement.src = imgBird2;
    flag++;
}, 128);

const positions=[];
positions.unshift(-100);

const speed = 2;

const interval = setInterval(()=>{

    if(!isMoving) return;

    const width = window.innerWidth;
    var currPosition = positions.shift();

    currPosition += speed;
    
    if(currPosition >= width){
        currPosition = -100;
    }
    positions.unshift(currPosition);

    imgElement.style.left = positions[0] + 'px';

},16)

imgElement.addEventListener("click",()=>{
    imgElement.src="./dino-dead.png";
    clearInterval(interval);
    clearInterval(intervalImage);
    flag = -1;
    const audio = new Audio("./end.mp3");
    audio.play();
    const clickX = e.clientX; 
    imgElement.style.left = `${clickX - imgElement.width / 2}px`; 
});
