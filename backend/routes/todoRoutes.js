import express from 'express'
import { createTodo,getTodoById,getTodos,updateTodo,deleteTodo } from '../controllers/todoController.js'
import {authMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router()


// GET /todos - Retrieve all todos for the authenticated user.
router.get('/',authMiddleware,async (req,res) => {
try {

    const todos = await getTodos(req.userId)
    res.status(200).json(todos)

}
catch (error){
    console.error('Error Fetching todos:',error)
    res.status(500).json({message:'Server Error'})
}
    
})

// GET /todos/:id - Retrieve a specific todo by its ID.
router.get('/:id',authMiddleware,async (req,res) => {
    try {
    
         const todo = await getTodoById(req.params.id,req.userId)
        if (!todo) {
             return res.status(404).json({message:'Todo not found'})
        }
     res.status(200).json(todo)

    }
    catch (error){
        console.error('Error Fetching todos:',error)
        res.status(500).json({message:'Server Error'})
    }
        
    })

// POST /todos - Create a new todo.  
router.post('/',authMiddleware,async (req,res) => {

    try {

        const newTodo = await createTodo(req.body,req,userId)
        res.status(201).json(newtTodo)
        
    } catch (error) {
        console.error("Error creating todo:",error)
        res.status(500).json({message:'Server Error'})
    }
    
})


// PUT /todos/:id - Update an existing todo.
router.put('/:id',authMiddleware,async (req,res) => {

try {

    const updatedTodo = await updateTodo(req.params.id,req.body,req.userId)
 if (!updateTodo) {
    return res.status(404).json({message:'Todo not found'})
 }
    
} catch (error) {
   console.error('Error Updating Todo:',error)
   res.status(500).json({message:'Server Error'})   
}


    
})

// DELETE /todos/:id - Delete a todo.
router.delete('/:id',authMiddleware,async (req,res) => {

    try {
        const deleted = await  deleteTodo(req.params.id,req.userId)
        if (!deleteTodo) {
            return res.status(404).json({message:'Todo not found'})
        }
        res.status(200).json({message:'Todo delete Sucesfully'})
        
    } catch (error) {
        console.error('Error deleting todo:',error)
        res.status(500).json({message:'Server Error'})

    }
    
})


export default router