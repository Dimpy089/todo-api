const API_URL = "http://localhost:5000/api/todos";

async function fetchTodos() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const todos = await res.json();
  
      const list = document.getElementById("todo-list");
      list.innerHTML = "";
  
      todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${todo.title}</strong>: ${todo.description}
          <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;
        list.appendChild(li);
      });
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      // Optionally, show a user-friendly message on the page
      const list = document.getElementById("todo-list");
      list.innerHTML = "<li>Error loading todos. Please try again later.</li>";
    }
  }
  

async function addTodo(){
    const title=document.getElementById("title").value;
    const description=document.getElementById("description").value;

    await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({title,description,completed:false})
    });
    fetchTodos();
}

async function deleteTodo(id){
    await fetch(`${API_URL}/${id}`,{
        method:"DELETE"
    });
    fetchTodos();
}

fetchTodos();


