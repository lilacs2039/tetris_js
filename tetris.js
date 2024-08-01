document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("tetris");
  const context = canvas.getContext("2d");
  const scoreElement = document.getElementById("score");
  const grid = createMatrix(10, 20);
  const colors = [
    null,
    "#FF0D72",
    "#0DC2FF",
    "#0DFF72",
    "#F538FF",
    "#FF8E0D",
    "#FFE138",
    "#3877FF",
  ];

  canvas.width = 240;
  canvas.height = 400;
  context.scale(20, 20);

  function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value];
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(grid, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
  }

  function merge(grid, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          grid[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  function playerDrop() {
    player.pos.y++;
    if (collide(grid, player)) {
      player.pos.y--;
      merge(grid, player);
      playerReset();
      gridSweep();
      updateScore();
    }
    dropCounter = 0;
  }

  function playerMove(dir) {
    player.pos.x += dir;
    if (collide(grid, player)) {
      player.pos.x -= dir;
    }
  }

  function playerReset() {
    const pieces = "ILJOTSZ";
    player.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
    player.pos.y = 0;
    player.pos.x =
      ((grid[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
    if (collide(grid, player)) {
      grid.forEach((row) => row.fill(0));
      player.score = 0;
      updateScore();
    }
  }

  function createPiece(type) {
    switch (type) {
      case "I":
        return [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ];
      case "L":
        return [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ];
      case "J":
        return [
          [0, 3, 0],
          [0, 3, 0],
          [3, 3, 0],
        ];
      case "O":
        return [
          [4, 4],
          [4, 4],
        ];
      case "Z":
        return [
          [5, 5, 0],
          [0, 5, 5],
          [0, 0, 0],
        ];
      case "S":
        return [
          [0, 6, 6],
          [6, 6, 0],
          [0, 0, 0],
        ];
      case "T":
        return [
          [0, 7, 0],
          [7, 7, 7],
          [0, 0, 0],
        ];
    }
  }

  function collide(grid, player) {
    const [m, o] = [player.matrix, player.pos];
    return m.some((row, y) =>
      row.some(
        (value, x) =>
          value !== 0 && (grid[y + o.y] && grid[y + o.y][x + o.x]) !== 0
      )
    );
  }

  function gridSweep() {
    outer: for (let y = grid.length - 1; y > 0; --y) {
      for (let x = 0; x < grid[y].length; ++x) {
        if (grid[y][x] === 0) {
          continue outer;
        }
      }
      const row = grid.splice(y, 1)[0].fill(0);
      grid.unshift(row);
      ++y;
      player.score += 10;
    }
  }

  function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }
    dir > 0 ? matrix.forEach((row) => row.reverse()) : matrix.reverse();
  }

  function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(grid, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > player.matrix[0].length) {
        rotate(player.matrix, -dir);
        player.pos.x = pos;
        return;
      }
    }
  }

  let dropCounter = 0;
  let dropInterval = 1000;
  let lastTime = 0;

  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      playerDrop();
    }
    draw();
    requestAnimationFrame(update);
  }

  function updateScore() {
    scoreElement.innerText = `スコア: ${player.score}`;
  }

  const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
  };

  document.addEventListener("keydown", (event) => {
    event.keyCode === 37
      ? playerMove(-1)
      : event.keyCode === 39
      ? playerMove(1)
      : event.keyCode === 40
      ? playerDrop()
      : event.keyCode === 81
      ? playerRotate(-1)
      : event.keyCode === 87
      ? playerRotate(1)
      : null;
  });

  playerReset();
  updateScore();
  update();
});
