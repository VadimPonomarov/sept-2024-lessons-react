import { FC, useEffect, useState } from "react";
import { ITodo } from "@/services/interfaces.ts";
import { todoService } from "@/services/todo.service.ts";
import { TodoComponent } from "@/components/TodoComponent.tsx";

type IProps = object;

export const TodoComponents: FC<IProps> = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const getTodos = async () => await todoService.todos();

  useEffect(() => {
    (async () => {
      try {
        const result = await getTodos();
        setTodos(result);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className={"flex w-full flex-wrap justify-evenly gap-2"}>
      {todos &&
        todos.map((item) => <TodoComponent key={item.id} item={item} />)}
    </div>
  );
};
