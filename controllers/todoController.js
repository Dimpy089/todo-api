const Todo=require('../models/Todo');

const createTodo= async(req,res)=>{
    try{
        const{title,description}=req.body;
        const todo=new Todo({title,description});
        await todo.save();
        res.status(201).json(todo);
    }
    catch(error){
        res.status(500).json({error:"Failed to create todo"});
    }
};

const getTodos=async(req,res)=>{
    try{
        const todos=await Todo.find();
        res.json(todos);
    }
    catch(error){
        res.status(500).json({error:"Failed to fetch todos"});
    }
};

const deleteTodo=async(req,res)=>{
    try{
        const {id}=req.params;
        await Todo.findByIdAndDelete(id);
        res.json({message: 'Todo deleted successfully'});
    }
    catch(error){
        res.status(500).json({error:"Failed to delete todos"});
    }
};

const updateTodo=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,completed}=req.body;
        const updateTodo=await Todo.findByIdAndUpdate(
            id,
            {title,description,completed},
            { new: true }
        );
        if(!updateTodo){
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to update todo' });
    }
}

module.exports={createTodo,getTodos,deleteTodo,updateTodo};