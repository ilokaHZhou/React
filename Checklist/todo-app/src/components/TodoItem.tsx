import { memo, useCallback } from "react";
import { type Todo } from "../hooks/useTodos";

interface Props {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ item, onToggle, onDelete }: Props) {
  // useCallback：避免子组件重复创建函数 → 提升性能
  const toggle = useCallback(() => onToggle(item.id), [item.id]);
  const remove = useCallback(() => onDelete(item.id), [item.id]);

  return (
    <div className="todo-item">
      <input type="checkbox" checked={item.done} onChange={toggle} />
      <span className={item.done ? "done" : ""}>{item.text}</span>
      <button onClick={remove}>删除</button>
    </div>
  );
}

// memo()：避免任务本身不变时重复渲染
export default memo(TodoItem);
