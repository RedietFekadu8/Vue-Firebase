<template>
  <div class="firebase-todo">

    <div class="title has-text-centered">

      Firebase Tutorial
    </div>

    <form
    @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
  <p class="control is-expanded">
    <input
    v-model="newTodoContent"
      class="input"
      type="text"
      placeholder="Add a Todo">
  </p>
  <p class="control">
    <button
    :disabled="!newTodoContent || newTodoContent === '' "
      class="button is-info">
      Add
    </button>
  </p>
</div>
    </form>

  </div>



<div
v-for="todo in todos"
  class="'card mb-5'"
  :class="{'has-background-success-dark' : todo.done}"
  >
  <div class="card-content">
    <div class="content">

      <div class="columns is-mobile is-vcentered">
        <div class="column">
          {{todo.content}}
        </div>
        <div class="column is-5 has-text-right">
          <button
            @click="toggleDone(todo.id)"
            class="button is-light"
            :class="todo.done ? 'is-success' : 'is-light'"
            >
        &check;
      </button>
      <button
      @click="deleteTodo(todo.id)"
        class="button is-danger ml-5">
        &cross;
      </button>
        </div>
      </div>
      

      
    </div>
  </div>
</div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { collection, query, orderBy, 
   onSnapshot, doc, addDoc,
   deleteDoc,updateDoc  } from 'firebase/firestore';
import { db } from '@/firebase'


const todoCollectionRef = collection(db, 'todos')
const todosCollectionQuery = query(todoCollectionRef, orderBy("date", "desc"))

const todos = ref([
  // {
  //   id: 'id1',
  //   content: 'Tutorial one',
  //   done: false
  // },
  // {
  //   id: 'id2',
  //   content: 'Tutorial two',
  //   done: false
  // },
  // {
  //   id: 'id3',
  //   content: 'Tutorial three',
  //   done: true
  // }
])

onMounted(() =>{
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
  const fbTodos = []
  querySnapshot.forEach((doc) => {
  const todo = {
      id: doc.id,
      content: doc.data().content,
      done: doc.data().done
    }
    fbTodos.push(todo)
  })
  todos.value = fbTodos

});
})
 

const newTodoContent = ref('')

const addTodo =  () => {

  addDoc(todoCollectionRef, {
    content: newTodoContent.value,
    done:false,
    date: Date.now()
});
  // const newTodo ={
  //   id: uuidv4(),
  //   content: newTodoContent.value,
  //   done:false
  // }
  // todos.value.unshift(newTodo)
  newTodoContent.value = ''
}

const deleteTodo = id =>{
  deleteDoc(doc(todoCollectionRef, id));

}

const toggleDone = id =>{
  const index= todos.value.findIndex(todo => todo.id === id)
 
 updateDoc(doc(todoCollectionRef, id), {
 done:!todos.value[index].done

});
}

</script>
<style>
@import '../node_modules/bulma/css/bulma.min.css';

.firebase-todo{
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>