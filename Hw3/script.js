function priority(a) {
    if (a === "^")
        return 3;
    else if (a === "*" || a === "/" || a === "÷" || a === "×" || a === "%")
        return 2;
    else if (a === "+" || a === "-")
        return 1;
    else
        return 0;
}


function operand(a) {
    if (a === "^" || a === "*" || a === "/" || a === "+" || a === "-" || a === "%" || a == "(" || a == ")" || a === "÷" || a === "×")
        return 0;
    else
        return 1;
}


function eval(data) {
    var array, infix = [], postfix = [];
    data = "(" + data + ")";
    data = data.replace(/\s/g, "");
    array = data.split("");
    for (let i = 0, j = 0; i < array.length; i++) {
        if (operand(array[i])) {
            let c = array[i];
            while (operand(array[i + 1]))
                c = c + array[++i];
            infix[j++] = Number(c);
        }
        else {
            if (array[i] == "(" && array[i + 1] == "-") {
                let c = array[++i];
                while (operand(array[i + 1]))
                    c = c + array[++i];
                if (array[i + 1] == ")")
                    i++;
                else
                    infix[j++] = "(";
                infix[j++] = Number(c);
            }
            else
                infix[j++] = array[i];
        }
    }

    console.log(infix);
    var stack = ["("];
    var i = 1;
    while (i < infix.length) {
        let item = infix[i];
        let key = stack.pop();
        if (operand(item)) {
            stack.push(key);
            postfix.push(item);
        } else {
            if (item == ")") {
                while (key != "(") {
                    postfix.push(key);
                    key = stack.pop();
                }
            } else if (item == "(") {
                stack.push(key);
                stack.push(item);
            } else if (priority(key) >= priority(item)) {
                while (priority(key) >= priority(item)) {
                    postfix.push(key);
                    key = stack.pop();
                }
                stack.push(key);
                stack.push(item);
            } else if (priority(key) < priority(item)) {
                stack.push(key);
                stack.push(item);
            }
        }
        i += 1;
    }
    if (stack.length == 0) {
        return evaluate(postfix);
    } else {
        return "undefined";
    }
}


function operation(x, y, z) {
    if (z == "+")
        return x + y;
    else if (z == "-")
        return x - y;
    else if (z == "%")
        return x % y;
    else if (z == "*" || z == "×")
        return x * y;
    else if (z == "/" || z == "÷")
        return x / y;
    else if (z == "^")
        return x ** y;
}


function evaluate(a) {
    var stack = [];
    var i = 0;
    while (i < a.length) {
        if (operand(a[i])) {
            stack.push(a[i]);
        } else {
            x = stack.pop();
            y = stack.pop();
            let temp = operation(y, x, a[i]);
            stack.push(temp);
        }
        i++;
    }
    let m = stack.pop();
    if (Number.isNaN(m) || typeof m == "undefined") {
        return "undefined";
    } else {
        return m;
    }
}

var flag = {
    numberflg: false,
    brflg1: false,
    brflg2: false,
    history: false,
    brcount: 0
};
function btnclk(a) {
    var data = document.getElementById('calculation').textContent;
    data = data.slice(0, data.length - flag.brcount);
    if (a == "AC") {
        document.getElementById('answer').innerHTML = "Ans = " + data;
        flag.numberflg = false;
    }
    if (!flag.numberflg)
        data = "";
        
    function write() {
        flag.numberflg = true;
        if (flag.brflg1) {
            flag.brflg2 = true;
            let temp = "";
            for (let i = 0; i < flag.brcount; i++)
                temp += ")";
            data += a + '<span style="color: lightgray;">' + temp + '</span';
        }
        return data;
    }
    if (a == ".")
        data = write() + a;
    if (a == 1)
        data = write() + a;
    if (a == 2)
        data = write() + a;
    if (a == 3)
        data = write() + a;
    if (a == 4)
        data = write() + a;
    if (a == 5)
        data = write() + a;
    if (a == 6)
        data = write() + a;
    if (a == 7)
        data = write() + a;
    if (a == 8)
        data = write() + a;
    if (a == 9)
        data = write() + a;
    if (a == 0)
        data = write() + a;
    if (a == "-")
        data = write() + a;
    if (a == "%")
        data = write() + a;
    if (a == "÷")
        data = write() + a;
    if (a == "×")
        data = write() + a;
    if (a == "+")
        data = write() + a;
    if (data.length == 0) {
        data = 0;
        flag.numberflg = false;
    }

    if (a == "=") {
        document.getElementById('answer').innerHTML = data + " ="
        let temp = eval(data);
        if (temp == "undefined") {
            temp = "Error";
            flag.numberflg = false;
        }
        historyadd(data, temp);
        data = temp;
        document.getElementById('clear').innerHTML = "AC";
    }
    document.getElementById('calculation').innerHTML = data;
}


/*let divToHide = document.getElementById('history');
let icon = document.getElementById('icon');
document.onclick = function (e) {
    if (e.target !== divToHide && e.target !== icon) {
        divToHide.style.display = 'none';
        document.querySelector('.icon').style.color = "rgb(112, 112, 112)";
        flag.history1 = false;
    }
};*/

window.addEventListener('mouseup', function (e) {
    let divToHide = document.getElementById('history');
    if (e.target !== divToHide && e.target!==document.getElementById('icon') && e.target !== document.getElementById('historyinner') && e.target !== document.getElementById('historyitm')) {
        divToHide.style.display = 'none';
        document.querySelector('.icon').style.color = "rgb(112, 112, 112)";
        flag.history = false;
    }
});


document.addEventListener('keydown', function (event) {
    if (event.key == 0) {//0
        btnclk("0");
    }
    else if (event.key == 1) {//1
        btnclk("1");
    }
    else if (event.key == 2) {//2
        btnclk("2");
    }
    else if (event.key == 3) {//3
        btnclk("3");
    }
    else if (event.key == 4) {//4
        btnclk("4");
    }
    else if (event.key == 5) {//5
        btnclk("5");
    }
    else if (event.key == 6) {//6
        btnclk("6");
    }
    else if (event.key == 7) {//7
        btnclk("7");
    }
    else if (event.key == 8) {//8
        btnclk("8");
    }
    else if (event.key == 9) {//9
        btnclk("9");
    }
    else if (event.key == "%") {//%
        btnclk("%");
    }
    else if (event.key == "*") {//*
        btnclk("×");
    }
    else if (event.key == "+") {//+
        btnclk("+");
    }
    else if (event.key == "-") {//-
        btnclk("-");
    }
    else if (event.key == ".") {//.
        btnclk(".");
    }
    else if (event.key == "/") {///
        btnclk("÷");
    }

    console.log(event.keyCode + " " + event.key);
});

function historyclk(e) {
    document.getElementById('calculation').innerHTML = e;
    document.getElementById('clear').innerHTML = "CE";
    flag.numberflg = true;
}
function historyadd(a, b) {
    let his = document.querySelector('.historyinner');
    his.innerHTML += '<div class="historyitm" id="historyitm"><div class="historyBtn" onclick="historyclk(this.textContent)">' + a + '</div><span>=</span><div class="historyBtn" onclick="historyclk(this.textContent)">' + b + '</div></div>';
}