
const API_URL = "http://localhost:5000/api/todos";

async function fetchTodos(){
  try{
    const res=await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const todos=await res.json();
    const list=document.getElementById("todo-list");
    list.innerHTML="";
    todos.forEach(todo=>{
      const li=document.createElement("li");
      li.innerHTML=`
      <strong>${escapeHtml(todo.title)}</strong>: ${escapeHtml(todo.description)}
      <button class="delete-btn" onclick="deleteTodo('${todo._id}')">Delete</button>
      `;
      if(todo.completed){
        li.style.textDecoration="completed";
      }
      list.appendChild(li);
    });
  }
  catch(error){
    console.error("Failed to fetch todos:", error);
    const list = document.getElementById("todo-list");
    list.innerHTML = "<li>Error loading todos. Please try again later.</li>";
  }
}

async function addTodo(){
  const titleInput=document.getElementById("title");
  const descriptionInput=document.getElementById("description");
  const title=titleInput.value.trim();
  const description=descriptionInput.value.trim();
  if (!title || !description) {
    alert("Both title and description are required!");
    return;
  }
  try{
    const res=await fetch(API_URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({title,description,completed:false}),
    });
    if(!res.ok) throw new Error(`Failed to add todo: ${res.status}`);
    titleInput.value = "";
    descriptionInput.value = "";
    fetchTodos();
  }
  catch(error){
    console.error(error);
    alert("Error adding todo. Please try again.");
  }
}

async function deleteTodo(id){
  if (!confirm("Are you sure you want to delete this todo?")) return;
  try{
    const res=await fetch(`${API_URL}/${id}`,{
      method:"DELETE"
    });
    if (!res.ok) throw new Error(`Failed to delete todo: ${res.status}`);
    fetchTodos();
  }
  catch (error) {
    console.error(error);
    alert("Error deleting todo. Please try again.");
  }
}

function escapeHtml(str){
  const div=document.createElement("div");
  div.textContent=str;
  return div.innerHTML;
}

fetchTodos();