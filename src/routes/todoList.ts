import express from 'express';
import db from "../db";
import { createTodoList, deleteTodoList } from '../handlers/todoList';

const app = express.Router()

//get a user list
app.get('/', async (req, res) => {
    const Liste = await db.todoList.findMany(
        {
            where:{
                userId: req.user.id
            }
        }
    )
    res.status(200).json({ Liste })
})

//get a todolist with the todoItems
app.get('/:uuid', async (req, res) => {
    const Items = await db.todoItem.findMany(
        {
            where:{
                todoListId: req.params.uuid
            }
        }
    )
    res.status(200).json({ Items })
})

//call function create (handlers)
app.post('/', createTodoList)

//delete
app.delete('/:uuid', deleteTodoList)

export default app