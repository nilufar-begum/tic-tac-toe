document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll('.box');
  const resetbutton = document.querySelector('#resetbutton');
  const NewGame = document.querySelector('#New-button');
  const msgContainer = document.querySelector('.msg-container');
  const msg = document.querySelector('#msg');

  let turnO = true;
  let gameOver = false;

  const winpatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    gameOver = true;
  };

  const checkWinner = () => {
    for (let pattern of winpatterns) {
      const [a, b, c] = pattern;
      const pos1 = boxes[a].innerText;
      const pos2 = boxes[b].innerText;
      const pos3 = boxes[c].innerText;

      if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return;
      }
    }

    // Check for draw
    if ([...boxes].every(box => box.innerText !== "") && !gameOver) {
      msg.innerText = "It's a draw!";
      msgContainer.classList.remove('hide');
      gameOver = true;
    }
  };

  const resetGame = () => {
    boxes.forEach(box => {
      box.innerText = "";
      box.disabled = false;
      box.removeAttribute('aria-disabled');
    });
    turnO = true;
    gameOver = false;
    msgContainer.classList.add('hide');
  };

  boxes.forEach(box => {
    box.addEventListener('click', () => {
      if (!gameOver && box.innerText === "") {
        box.innerText = turnO ? "O" : "X";
        box.setAttribute('aria-disabled', 'true');
        box.disabled = true;
        turnO = !turnO;
        checkWinner();
      }
    });
  });

  resetbutton.addEventListener('click', resetGame);
  NewGame.addEventListener('click', resetGame);
});
