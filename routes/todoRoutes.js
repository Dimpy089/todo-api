const express=require('express');
const router=express.Router();
const {createTodo,getTodos,deleteTodo,updateTodo}=require('../controllers/todoController');

router.post('/todos',createTodo);
router.get('/todos',getTodos);
router.delete('/todos/:id',deleteTodo);
router.put('/todos/:id',updateTodo);

module.exports=router;