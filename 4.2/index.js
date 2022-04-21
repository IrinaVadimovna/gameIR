const numberLevel = document.querySelectorAll('.number-level');
const startButton = document.querySelector('.start-button');

for (let i = 0; i < numberLevel.length; i++) {
    let levelButton = numberLevel[i];

    levelButton.addEventListener('click', function(){
        const level = this.getAttribute("data-level");
        window.level = level;
        console.log(window.level);
    });
    
};


startButton.addEventListener('click', function (){
    console.log(window.level);

    if (window.level === undefined){
     for (let i = 0; i < numberLevel.length; i++) {
        numberLevel[i].style.border = '2px solid #CD5C5C';
        }
    }

    if (window.level !== undefined){
        window.location = './play.html';
    }
});