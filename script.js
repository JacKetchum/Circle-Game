document.getElementById('startButton').addEventListener('click', startGame);
document.querySelectorAll('.answerButton').forEach(button => {
  button.addEventListener('click', function() {
    checkAnswer(this.getAttribute('data-answer'));
  });
});
document.getElementById('resetButton').addEventListener('click', resetGame);

let score = 0;
let circlesCount = 0;
const colors = ["blue", "green", "red", "purple", "yellow", "orange"];
let availableColors = [...colors];

function startGame() {
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('resetButton').style.display = 'inline-block';
  circlesCount = Math.floor(Math.random() * 6) + 1; // Generate between 1 and 6 circles
  availableColors = [...colors]; // Reset color availability for a new game
  for (let i = 0; i < circlesCount; i++) {
    createCircle();
  }
}

function createCircle() {
  const container = document.getElementById('circlesContainer');
  const containerWidth = container.offsetWidth;

  const circle = document.createElement('div');
  circle.classList.add('circle');

  // Set a unique color
  const colorIndex = Math.floor(Math.random() * availableColors.length);
  const color = availableColors.splice(colorIndex, 1)[0];
  circle.style.backgroundColor = color;

  // Set a unique size
  const size = Math.random() * 50 + 30; // Circle size between 30px and 80px
  circle.style.width = circle.style.height = `${size}px`;

  // Set a unique top position within its section
  const sectionHeight = container.offsetHeight / circlesCount;
  const section = Math.floor(Math.random() * circlesCount);
  const minTop = section * sectionHeight;
  const maxTop = (section + 1) * sectionHeight - size;
  const topPosition = Math.random() * (maxTop - minTop) + minTop;
  circle.style.top = `${topPosition}px`;

  // Set the initial left position to just outside the container
  circle.style.left = `${-size}px`;

  // Append the circle to the container
  container.appendChild(circle);

  // Calculate speed based on score. As the score increases, reduce the max duration.
  let maxDuration = 2000 - score * 100; // Decrease max duration by 100ms per point of score
  maxDuration = Math.max(maxDuration, 500); // Ensure max duration does not go below 500ms

  const speed = Math.random() * (maxDuration - 500) + 500; // Speed will be between 500ms and maxDuration

  // Calculate the total distance the circle needs to move to exit the grey rectangle
  const totalDistanceToMove = containerWidth + size;

  // Animate the circle to move across and out of the container
  circle.animate([
    { transform: `translateX(${totalDistanceToMove}px)` }
  ], {
    duration: speed,
    fill: 'forwards'
  });
}

function checkAnswer(answer) {
  if (parseInt(answer) === circlesCount) {
    score++;
    alert('Correct!');
  } else {
    alert('Wrong! Try again.');
  }
  updateScore();
  resetGame();
}

function updateScore() {
  document.getElementById('scoreChart').innerText = `Score: ${score}`;
}

function resetGame() {
  // Clear circles
  const circlesContainer = document.getElementById('circlesContainer');
  circlesContainer.innerHTML = '';

  // Hide reset button and show start button again
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('startButton').style.display = 'inline-block';
}