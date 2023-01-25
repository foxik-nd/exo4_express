import express from 'express'
import * as dotenv from 'dotenv'
import db from './db'
import userRoutes from './routes/user'
import todoListRoutes from './routes/todoList'
//import todoItemsRoutes from './routes/todoItems'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import config from './config'

dotenv.config()

const app = express()
const PORT = config.port

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' })
})

app.use('/api', protect, [userRoutes])
app.use('/api/todo', protect, [todoListRoutes])
//app.use('/api/todo', protect, [todoItemsRoutes])

app.post('/signUp', createNewUser)
app.post('/signIn', signIn)

//app.post('/todos', createTodoList)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})