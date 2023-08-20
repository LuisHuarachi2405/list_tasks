import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const taskSchema = zod.object({
  id: zod.number().optional().nullable(),
  descripcion: zod.string().min(1, {
    message: 'El campo de descripcion es requerido.',
  }),
  estado: zod.string().min(1, {
    message: 'El campo de estado es requerido.',
  })
})

export const taskResolver = zodResolver(taskSchema)