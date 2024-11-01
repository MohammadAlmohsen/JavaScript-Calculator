import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();
  const isOperator = (Symbol: string) => {
    return /[*/+-]/.test(Symbol);
  };
  const buttonPress = (Symbol: string) => {
    if (Symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (Symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (Symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(Symbol)) {
      setExpression(et + " " + Symbol + " ");
    } else if (Symbol === "=") {
      calculate();
    } else if (Symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + Symbol);
      }
    } else if (Symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if(!lastNumber)return
      if (lastNumber?.includes(".")) return;
      setExpression(expression + Symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + Symbol);
      } else {
        setExpression(expression + Symbol);
      }
    }
  };
  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newparts = [];
    for (let i = parts.length - 1; i >= 0; i--) {
      if(["*","/","+"].includes(parts[i])&& isOperator(parts[i-1])){
        newparts.unshift(parts[i]);
        let j=0;
        let k=i-1;
        while(isOperator(parts[k])){
          k--;
          j++;
        }
        i-=j;  
      }else{
        newparts.unshift(parts[i]);
      }
    }
    const newExpression=newparts.join(" ");
    if(isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer+newExpression) as string);
    }else {

      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };
  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button
            onClick={() => buttonPress("clear")}
            className="light-gray"
            id="clear"
          >
            C
          </button>
          <button
            onClick={() => buttonPress("negative")}
            className="light-gray"
            id="negative"
          >
            +/-
          </button>
          <button
            onClick={() => buttonPress("percentage")}
            className="light-gray"
            id="percentage"
          >
            %
          </button>
          <button
            onClick={() => buttonPress("/")}
            className="yellow"
            id="divide"
          >
            /
          </button>
          <button
            onClick={() => buttonPress("7")}
            className="dark-gray"
            id="seven"
          >
            7
          </button>
          <button
            onClick={() => buttonPress("8")}
            className="dark-gray"
            id="eight"
          >
            8
          </button>
          <button
            onClick={() => buttonPress("9")}
            className="dark-gray"
            id="nine"
          >
            9
          </button>
          <button
            onClick={() => buttonPress("*")}
            className="yellow"
            id="multiply"
          >
            *
          </button>
          <button
            onClick={() => buttonPress("4")}
            className="dark-gray"
            id="four"
          >
            4
          </button>
          <button
            onClick={() => buttonPress("5")}
            className="dark-gray"
            id="five"
          >
            5
          </button>
          <button
            onClick={() => buttonPress("6")}
            className="dark-gray"
            id="six"
          >
            6
          </button>
          <button
            onClick={() => buttonPress("-")}
            className="yellow"
            id="subtract"
          >
            -
          </button>
          <button
            onClick={() => buttonPress("1")}
            className="dark-gray"
            id="one"
          >
            1
          </button>
          <button
            onClick={() => buttonPress("2")}
            className="dark-gray"
            id="two"
          >
            2
          </button>
          <button
            onClick={() => buttonPress("3")}
            className="dark-gray"
            id="three"
          >
            3
          </button>
          <button onClick={() => buttonPress("+")} className="yellow" id="add">
            +
          </button>
          <button
            onClick={() => buttonPress("0")}
            className="dark-gray"
            id="zero"
          >
            0
          </button>
          <button
            onClick={() => buttonPress(".")}
            className="dark-gray"
            id="decimal"
          >
            .
          </button>
          <button
            onClick={() => buttonPress("=")}
            className="yellow"
            id="equals"
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
