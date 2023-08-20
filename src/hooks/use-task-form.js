import { useForm } from 'react-hook-form'
import { taskResolver } from '../utils/task-resolver'

export const defaultValues = {
  id: null,
  descripcion: '',
  estado: ''
}

export const useTaskForm = ({ prevValues }) =>
  useForm({
    defaultValues: prevValues || defaultValues,
    resolver: taskResolver,
    mode: 'onSubmit',
  })