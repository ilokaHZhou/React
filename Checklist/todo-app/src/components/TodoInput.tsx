import {
  useRef,
  useState,
  useId,
  useCallback,
  useTransition
} from "react";
import { type Todo } from "../hooks/useTodos";

interface Props {
  onAdd: (task: Todo) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  // 用于输入框回到焦点
  const inputRef = useRef<HTMLInputElement>(null);

  // useId 生成稳定的前缀（不同渲染间不会变化）
  const id = useId();

  // useTransition，让添加任务不会阻塞 UI（React18 新特性）
  const [isPending, startTransition] = useTransition();

  const handleAdd = useCallback(() => {
    if (!text.trim()) return;

    // startTransition → 将更新标记为“低优先级”
    startTransition(() => {
      onAdd({
        id: id + Math.random(), // useId + random 组合保证唯一性
        text,
        done: false
      });
    });

    setText("");

    // 添加后自动回焦点
    inputRef.current?.focus();
  }, [text, id, onAdd]);

  return (
    <div className="input-box">
      <input
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="输入任务..."
      />
      <button onClick={handleAdd}>
        {isPending ? "处理中..." : "添加"}
      </button>
    </div>
  );
}
