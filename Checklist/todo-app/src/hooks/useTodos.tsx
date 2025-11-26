import { useReducer, useDebugValue } from "react";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

// 定义 reducer 的所有 action 类型
type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "TOGGLE"; id: string }
  | { type: "DELETE"; id: string };

// 任务 reducer：集中处理所有操作
function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "TOGGLE":
      // 翻转某个任务的完成状态
      return state.map(t =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );

    case "DELETE":
      return state.filter(t => t.id !== action.id);

    default:
      return state;
  }
}

export default function useTodos(initial: Todo[]) {
  // useReducer 用于复杂状态（比 useState 更好管理）
  const [todos, dispatch] = useReducer(todoReducer, initial);

  // useDebugValue 仅用于 devtools 提示
  useDebugValue(`Todos count = ${todos.length}`);

  return { todos, dispatch };
}
