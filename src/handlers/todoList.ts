import { Request, RequestHandler } from "express";
import db from "../db";

interface TypedRequestParam extends Request {
    body: {
      name?: string;
    }
  }
 
//create
export const createTodoList: RequestHandler = async (req: TypedRequestParam, res) => {
    try{
        if (!(req.body?.name)) {
            throw new Error('Invalid body provided')
          }
          
          const List = await db.todoList.create({
            data: {
              name: req.body.name,
              userId: req.user.id
            }
          })
          return res.status(200).json({List})
          
    }catch(e) {
      res.status(400).json({ error: e?.toString() })
    }
}

//delete
export const deleteTodoList: RequestHandler = async (req: TypedRequestParam, res) => {
  try{
      if (!(req.params.uuid)) {
          throw new Error('Invalid body provided')
        }
        
        const dList = await db.todoList.delete({
          where: {
           id: req.params.uuid
          }
        })

        return res.status(200).json({dList})
        
  }catch(e) {
    res.status(400).json({ error: e?.toString() })
  }
}