const getNumbers = document.getElementById('getNumbers')
const saveTheCanvas = document.getElementById('saveCanvas')


function setup() {
  let c = createCanvas(400, 400);
  c.addClass("canvas-background");

  saveTheCanvas.addEventListener('click', function (event) {
    event.preventDefault()
    save(c, 'myCanvas', 'png');
  } )


}

function drawElementsOnCanvas (data) {
  function draw() {
    background(0);
    noStroke();
    const dataLength = data.length
    for (let index = 0; index < dataLength; (index+=3) % dataLength ) {

      let first = data[index]
      let second = data[index+1]
      let third = data[index+2]

      const randColor = (first+second+third)*(Math.random()*10) % 255
      const largerPseudoNumber = Math.random() * 1000
      
      fill(first, second, third, randColor)
      arc((first+largerPseudoNumber) % 100, (second+largerPseudoNumber) % 100, third, (first+second+third)*(Math.random()*10) % 100,  0, HALF_PI)
      rotate(PI / first);
      
      triangle(first, second, third, first, third, second);
      fill(second, first, third, randColor)
      rotate(PI / second);

      fill(third, second, first, randColor)
      circle((first+largerPseudoNumber) % 400, (second+largerPseudoNumber) % 400, third)
      
      fill(first, first, third, randColor)
      square(third, second, first)
      rotate(PI / third);
    }
  }
draw()
}

getNumbers.addEventListener('click', getRandomNumbers)


function getRandomNumbers() {
  const Url = 'https://qrng.anu.edu.au/API/jsonI.php?length=60&type=uint8';
  fetch(Url)
    .then(data => { return data.json(); })
    .then(res => {drawElementsOnCanvas(res.data)});
}

