import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formIsIsoDate, formIsNotEmptyString } from '../../globals/FormValidations';
import { Locale } from '../../globals/Translations';
import useNotifier from '../../hooks/UseNotifier';
import { getEmptyTodo, Todo } from '../../models/Todo';
import { isReadingSelector, isSubmittingSelector } from '../../reducers/ApiCallsReducer';
import { dataTableVisibleSelector } from '../../reducers/DataTableReducer';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import {
  createTodoThunk,
  deleteTodoThunk,
  readTodosThunk,
  todosSelector,
  updateTodoThunk,
} from '../../reducers/TodosReducer';
import { DataTable } from '../dataTable/DataTable';
import { DataTypes } from '../dataTable/DataTableInterfaces';

export const TodoDialog = () => {
  const todos: Todo[] = useAppSelector(todosSelector);
  const isReading: boolean = useAppSelector(isReadingSelector);
  const isSubmitting: boolean = useAppSelector(isSubmittingSelector);
  const dataTableVisible: boolean = useAppSelector(dataTableVisibleSelector);

  const { i18n } = useTranslation();
  const lang: Locale = i18n.language as Locale;
  const dispatch = useAppDispatch();
  useNotifier();
  useEffect(() => {
    dispatch(readTodosThunk());
  }, [dispatch]);

  return (
    dataTableVisible ?
      <DataTable<Todo>
        id={'todo-table'}
        columns={[
          { property: 'owner', datatype: DataTypes.STRING, validateFn: formIsNotEmptyString },
          { property: 'dueDate', datatype: DataTypes.DATE, validateFn: formIsIsoDate },
          { property: 'description', datatype: DataTypes.STRING, validateFn: formIsNotEmptyString },
          { property: 'completed', datatype: DataTypes.BOOLEAN },
        ]}
        rowsData={todos}
        manager={{
          create: (entity: Todo) => dispatch(createTodoThunk(entity)),
          read: () => dispatch(readTodosThunk()),
          update: (entity: Partial<Todo>) => dispatch(updateTodoThunk(entity)),
          delete: (entity: Todo) => dispatch(deleteTodoThunk(entity.id)),
          getEmpty: getEmptyTodo,
        }}
        lang={lang}
        isReading={isReading}
        isSubmitting={isSubmitting}
      />
      : <div></div>
  );
};
