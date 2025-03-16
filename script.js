document.addEventListener("DOMContentLoaded", () => {
    const toggleMode = document.getElementById("toggleMode");

    // Apply saved theme on page load
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark"); // Tailwind dark mode
        document.body.classList.add("dark-mode"); // Custom CSS
    }

    toggleMode.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent interaction with input box
        document.documentElement.classList.toggle("dark"); // Tailwind dark mode
        document.body.classList.toggle("dark-mode"); // Custom CSS

        // Save the current theme in localStorage
        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    const display = document.getElementById("display");
    const expressionDisplay = document.createElement("div");
    expressionDisplay.style.textAlign = "right";
    expressionDisplay.style.color = "gray";
    expressionDisplay.style.fontSize = "14px";
    display.parentNode.insertBefore(expressionDisplay, display);
    
    let expression = "";
    display.value = "0"; // Show 0 initially

    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText;

            if (value === "M") return; // Ignore M button for calculations

            if (value === "AC") {
                expression = "";
                display.value = "0";
                expressionDisplay.innerText = "";
            } else if (value === "🅇") {
                expression = expression.slice(0, -1);
                display.value = expression || "0";
            } else if (value === "=") {
                try {
                    expressionDisplay.innerText = expression; // Show recent expression
                    expression = expression.replace("×", "*").replace("÷", "/");
                    display.value = eval(expression);
                    expression = display.value;
                } catch {
                    display.value = "Error";
                    expression = "";
                }
            } else if (value === "x") {
                expression += "*";
                display.value = expression;
            }else if (value === "π") {
                expressionDisplay.innerText = `(${expression}) π`;  // Show the π symbol in history
                expression += Math.PI.toFixed(6);   // Use π value with 6 decimal places
                display.value = expression;
            } else if (value === "√") {
                expressionDisplay.innerText = `√(${expression}) =`;
                expression = `Math.sqrt(${expression})`;
                display.value = eval(expression);
            } else if (value === "∛") {
                expressionDisplay.innerText = `∛(${expression}) =`;
                expression = `Math.cbrt(${expression})`;
                display.value = eval(expression);
            } else if (value === "x²") {
                expressionDisplay.innerText = `(${expression})² =`;
                expression = `Math.pow(${expression},2)`;
                display.value = eval(expression);
            } else if (value === "x³") {
                expressionDisplay.innerText = `(${expression})³ =`;
                expression = `Math.pow(${expression},3)`;
                display.value = eval(expression);
            } else if (value === "sin") {
                expressionDisplay.innerText = `sin(${expression}) =`;
                expression = `Math.sin(${expression} * Math.PI / 180)`;
                display.value = eval(expression);
            } else if (value === "cos") {
                expressionDisplay.innerText = `cos(${expression}) =`;
                expression = `Math.cos(${expression} * Math.PI / 180)`;
                display.value = eval(expression);
            } else if (value === "tan") {
                expressionDisplay.innerText = `tan(${expression}) =`;
                expression = `Math.tan(${expression} * Math.PI / 180)`;
                display.value = eval(expression);
            } else {
                if (display.value === "0") {
                    expression = value; // Replace 0 with first input
                } else {
                    expression += value;
                }
                display.value = expression;
            }
        });
    });
});