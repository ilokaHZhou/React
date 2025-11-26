import { useMemo } from "react";
import TodoItem from "./TodoItem";
import { type Todo } from "../hooks/useTodos";

interface Props {
  todos: Todo[];
  filter: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, filter, onToggle, onDelete }: Props) {
  // useMemo：对过滤结果进行缓存 → 避免每次都重新计算
  const filtered = useMemo(() => {
    switch (filter) {
      case "done":
        return todos.filter(t => t.done);
      case "active":
        return todos.filter(t => !t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <>
      {filtered.map(t => (
        <TodoItem
          key={t.id}
          item={t}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
