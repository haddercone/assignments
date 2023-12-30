import TodosWithJS from "./components/TodosWithJS";
import TodosWithState from "./components/TodosWithState";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="firstChild">
          <p className="todosTitle">Todos with plain JavaScript</p>
          <TodosWithJS />
        </div>
        <div className="secondChild">
          <p className="todosTitle">Todos with react states</p>
          <TodosWithState />
        </div>
      </div>
    </>
  );
}

export default App;
