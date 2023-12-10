// Función para alternar entre los temas
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}


document.addEventListener("DOMContentLoaded", function () {

    var playContainer = document.getElementById("play-container");

    var totalNumbers = 50; 
    var visibleNumbers = 25; 
    var currentVisibleNumber = 1; 

    // Función para generar un array de números dentro de un rango dado
    function generateNumbers(start, end) {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }

    // Función para mezclar un array utilizando el algoritmo de Fisher-Yates
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // Función para manejar el clic en un número
    function handleNumberClick(number) {
        var clickedCell = document.querySelector('.grid-cell[data-number="' + number + '"]');

    
        if (number === currentVisibleNumber) {
            clickedCell.classList.add("transparent-cell");
            currentVisibleNumber++;

       
            if (currentVisibleNumber <= totalNumbers) {
                var nextNumber = currentVisibleNumber + visibleNumbers - 1;

                if (nextNumber <= totalNumbers) {
                    var nextCell = createGridCell(nextNumber);
                    playContainer.replaceChild(nextCell, clickedCell);
                }
            }

           
            if (currentVisibleNumber > totalNumbers) {
                alert("¡Felicidades! :)");
                resetGame();
            }
        }
    }

    // Función para reiniciar el juego
    function resetGame() {
        playContainer.innerHTML = "";
        currentVisibleNumber = 1;
        var numbers = generateNumbers(1, visibleNumbers);
        numbers = shuffleArray(numbers);

        // Crea las nuevas celdas del juego
        numbers.forEach(function (number) {
            var gridCell = createGridCell(number);
            playContainer.appendChild(gridCell);
        });
    }

    // Función que crea una celda del juego con un número dado
    function createGridCell(number) {
        var gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.setAttribute("data-number", number);
        gridCell.textContent = number;

        // Agrega un evento de clic a la celda para manejar el juego
        gridCell.addEventListener("click", function () {
            handleNumberClick(number);
        });

        return gridCell;
    }

    // Genera un array de números consecutivos y lo mezcla
    var numbers = generateNumbers(1, visibleNumbers);
    numbers = shuffleArray(numbers);

    // Crea una celda para cada número y las agrega al contenedor del juego
    numbers.forEach(function (number) {
        var gridCell = createGridCell(number);
        playContainer.appendChild(gridCell);
    });
});
