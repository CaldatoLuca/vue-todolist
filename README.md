# ToDoList

https://github.com/CaldatoLuca/vue-todolist/assets/144032332/eb0de255-5ceb-49ee-a1c3-f3a31b4b2a3c


Rifare l'esercizio della to do list.
Questa volta però ogni todo sarà un oggetto, formato da due proprietà:

- text, una stringa che indica il testo del todo
- done, un booleano (true/false) che indica se il todo è stato fatto oppure no

## Svolgimento

Dopo aver creato la struttura base html implemento vue js.

**Creo la lista dei tasks**

```html
<ul class="list-group">
  <li
    v-for="(task, index) in tasks"
    class="list-group-item d-flex justify-content-between align-items-center"
  >
    {{ task.text }}
    <button type="button" class="btn-close" aria-label="Close"></button>
  </li>
</ul>
```

```js
const vueConfig = {
  data() {
    const mainTitle = "ToDoList";
    const tasks = [
      {
        text: "Portare fuori il cane",
        done: false,
      },
      {
        text: "Fare la spesa",
        done: false,
      },
      {
        text: "Innaffiare le piante",
        done: false,
      },
      {
        text: "Pulire la stanza",
        done: false,
      },
      {
        text: "Studiare Vue Js",
        done: false,
      },
    ];
    return {
      mainTitle,
      tasks,
    };
  },
};
```

Attraverso `v-for` ripeto l' elemento `li`

Inserisco nel `li` la descrizione del task `{{ task.text }}`

**Rimuovo il task al click sul bottone**

```html
<button
  type="button"
  class="btn-close"
  aria-label="Close"
  @click="removeTask(index)"
></button>
```

```js
  methods: {
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
  },
```

Creo un evento click sul bottone (`@click` che equivale a `v-on@click`)

Richiamo la funzione removeTask a cui passo l' indice dell' elemento task(la funzione rimuove dall' array l' elemento con l' indice corrente)

NB uso `splice`: nella parentesi indico l' indice dell' elemento da eliminare e quanti elementi eliminare a seguire

**Aggiungere un nuovo task**

```html
<div class="mb-3">
  <label for="new-task" class="form-label text-white">New Task</label>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Add your new task here..."
      aria-describedby="button-addon1"
      id="new-task"
      v-model="newTask"
    />
    <button
      class="btn btn-primary"
      type="button"
      id="button-addon1"
      @click="addTask"
    >
      Add
    </button>
  </div>
</div>
```

```js
const vueConfig = {
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === "") {
        return (this.newTask = "");
      } else {
        this.tasks.push({ text: this.newTask, done: false });
        this.newTask = "";
      }
    },
  },
};
```

Aggiungo al mio campo di input l' attributo `v-model` che collegherà il contenuto del campo di input con la variabile newTask

Attraverso la funzione addTask pusho il nuovo oggetto nell' array tasks

Svuoto il valore di newTask al completamento dell' azione

NB effettuo un controllo per evitare che si inseriscano task 'vuoti' composti solo da spazio (mi aiuto col metodo `.trim()` che elimina/accorcia gli spazi in eccesso)

**Bonus: 1, intercettare anche il tasto ENTER per aggiungere il todo alla lista**

```html
<input
  type="text"
  class="form-control"
  placeholder="Add your new task here..."
  aria-describedby="button-addon1"
  id="new-task"
  v-model="newTask"
  @keyup.enter="addTask"
/>
```

Richiamo la stessa funzione usata al click del bottone ma sull' input

Uso ` @keyup.enter` (keyup = premi, enter = pulsante di invio)

**Bonus: 2, cliccando sul testo dell'item, invertire il valore della proprietà done del todo corrispondente (se done era uguale a false, impostare true e viceversa)**

```html
<li
  v-for="(task, index) in tasks"
  class="list-group-item d-flex justify-content-between align-items-center"
  :class="{'text-decoration-line-through' : task.done === true}"
  @click="isDone(index)"
></li>
```

```js
  methods: {
    removeTask(index) {
      this.tasks.splice(index, 1);
      if (this.tasks[index].done === false) {
        this.tasks[index].done = true;
      } else if (this.tasks[index].done === true) {
        this.tasks[index].done = false;
      }
    },
    isDone(index) {
      if (this.tasks[index].done === false) {
        this.tasks[index].done = true;
      } else if (this.tasks[index].done === true) {
        this.tasks[index].done = false;
      }
    },
  },
```

Aggiungo un evento click all' elemento `li` che richiama la funzione isDone

Quest' ultima cambia il valore di done a seconda del suo valore iniziale

A seconda poi del valore di done si aggiungerà una classe al `li` (`:class="{'text-decoration-line-through' : task.done === true}"`)

NB

Ho notato che cliccando sulla X per eliminare un task quest' ultimo si eliminava correttamente ma il task che 'prendeva il suo posto' subiva l' evento di isDone(quindi il testo si sbarrava da solo).

Questo probabilmente avveniva perchè il click continuava anche dopo aver eliminato il task e quindi scatenava isDone sul task successivo, andando a cambiare il valore di done da true a false e viceversa.

Per ovviare a questo problema ho aggiunto una condizione di reset alla funzione removeTask
