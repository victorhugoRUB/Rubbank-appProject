import React, {useState} from 'react';
import {Button, FlatList} from 'react-native';
import {ScreenBase} from '../components/screen-base/screen-base';
import {Input, ItemText, ListItem} from './todo-list.styles';

export interface Task {
  id: string;
  value: string;
}

const TodoList = () => {
  const [task, setTask] = useState<Task>({id: '', value: ''});
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask() {
    setTasks([...tasks, task]);
    setTask({id: '', value: ''});
  }

  function handleRemoveTask(taskId: string) {
    const filteredTasks = tasks.filter(taskItem => taskItem.id !== taskId);
    setTasks(filteredTasks);
  }

  function renderTask(taskItem: Task) {
    return (
      <ListItem>
        <ItemText>{taskItem.value}</ItemText>
        <Button title="X" onPress={() => handleRemoveTask(taskItem.id)} />
      </ListItem>
    );
  }

  return (
    <ScreenBase>
      <Input
        placeholder="Adicione uma nova tarefa"
        placeholderTextColor="#404040"
        value={task.value}
        onChangeText={(text: string) =>
          setTask({id: Math.random().toString(), value: text})
        }
      />
      <Button title="Adicionar Tarefa" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        renderItem={itemData => renderTask(itemData.item)}
        keyExtractor={item => item.id}
      />
    </ScreenBase>
  );
};

export default TodoList;
