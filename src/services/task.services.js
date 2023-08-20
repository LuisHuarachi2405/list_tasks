
import axios from 'axios';
import { loadAbort } from '../utilities/load-abort-axios.utility';

const URI = process.env.REACT_APP_URI_API

export const getTasks = () => {
  const controller = loadAbort();
  return { call: axios.get(`${URI}/tarea`, { signal: controller.signal }), controller };
};

export const getTaskById = id => {
  const controller = loadAbort();
  return { call: axios.get(`${URI}/tarea/${id}`, { signal: controller.signal }), controller };
};

export const addTask = (task) => {
  const controller = loadAbort();
  return { call: axios.post(`${URI}/tarea`, task, { signal: controller.signal }), controller };
};

export const updateTask = (task) => {
  const controller = loadAbort();
  return { call: axios.put(`${URI}/tarea/${task.id}`, task, { signal: controller.signal }), controller };
};

export const removeTask = id => {
  const controller = loadAbort();
  return { call: axios.delete(`${URI}/tarea/${id}`, { signal: controller.signal }), controller };
};