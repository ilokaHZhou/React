import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback
} from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useTodos, { type Todo } from "./hooks/useTodos";

export default function App() {
  // 初始化 localStorage 数据
  const initialTodos: Todo[] = (() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  })();

  // 分离 todos 状态，使逻辑更清晰
  const { todos, dispatch } = useTodos(initialTodos);

  const [filter, setFilter] = useState("all");

  // 用于测量 DOM（列表高度）
  const listRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(0);

  // useEffect：每次任务变化时持久化到 localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // useLayoutEffect：比 useEffect 更早执行，用来“同步读取 DOM 尺寸”
  useLayoutEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.getBoundingClientRect().height);
    }
  }, [todos]);

  // useCallback：保持函数引用稳定，避免子组件重复渲染
  const handleAdd = useCallback(
    (task: Todo) => dispatch({ type: "ADD", payload: task }),
    []
  );

  const handleToggle = useCallback(
    (id: string) => dispatch({ type: "TOGGLE", id }),
    []
  );

  const handleDelete = useCallback(
    (id: string) => dispatch({ type: "DELETE", id }),
    []
  );

  return (
    <div className="app">
      <h1>📝 React + TS 任务清单</h1>

      <TodoInput onAdd={handleAdd} />

      <div className="filters">
        <button onClick={() => setFilter("all")}>全部</button>
        <button onClick={() => setFilter("active")}>未完成</button>
        <button onClick={() => setFilter("done")}>已完成</button>
      </div>

      <p>列表高度: {listHeight}px</p>

      <div ref={listRef}>
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
