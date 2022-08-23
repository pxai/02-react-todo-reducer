import tasks from '../initialTasks';

const addTaskToTasks = (tasks, taskToAdd) => {
  return [...tasks, taskToAdd];  
};

const removeTaskFromTasks = (tasks, idToRemove) => {
    return tasks.filter( task => task.id !== idToRemove)
};

const updateTaskFromTasks = (tasks, taskToUpdate) => {
    const filteredTasks = tasks.filter( task => task.id !== taskToUpdate.id);

    return [...filteredTasks, taskToUpdate];
}

export const TASKS_ACTION_TYPES = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    CREATE_TASK: 'CREATE_TASK',
    SEARCH_TASK: 'SEARCH_TASK',
};

export const initialTaskState = {
    taskTotal: 0,
    isTasksEmpty: true,
    tasks,
    searchTerm: '',
}

export const taskReducer = (state, action) => {
    const {type, payload} = action;
    let changedTasks = null;
    switch (type) {
        case TASKS_ACTION_TYPES.ADD_TASK:
                changedTasks = addTaskToTasks(state.tasks, payload);
                return {
                    ...state,
                    taskTotal: changedTasks.length,
                    isTasksEmpty: changedTasks.length > 0,
                    tasks: changedTasks,
                };
        case TASKS_ACTION_TYPES.UPDATE_TASK:
            changedTasks = updateTaskFromTasks(state.tasks, payload);
            return {
                ...state,
                taskTotal: changedTasks.length,
                isTasksEmpty: changedTasks.length > 0,
                tasks: changedTasks
            };
        case TASKS_ACTION_TYPES.REMOVE_TASK:
            changedTasks = removeTaskFromTasks(state.tasks, payload);
            return {
                ...state,
                taskTotal: changedTasks.length,
                isTasksEmpty: changedTasks.length > 0,
                tasks: changedTasks
            };
        case TASKS_ACTION_TYPES.SEARCH_TASK:
            return {
                ...state,
                searchTerm: payload,
            };
        default:
            throw new Error(`Unhandled action for reducer: ${type}`)
    }
}

