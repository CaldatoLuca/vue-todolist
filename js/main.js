"use script";

const { createApp } = Vue;

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
      newTask: "",
    };
  },
  methods: {
    removeTask(index) {
      this.tasks.splice(index, 1);
      if (this.tasks[index].done === false) {
        this.tasks[index].done = true;
      } else if (this.tasks[index].done === true) {
        this.tasks[index].done = false;
      }
    },
    addTask() {
      if (this.newTask.trim() === "") {
        return (this.newTask = "");
      } else {
        this.tasks.push({ text: this.newTask, done: false });
        this.newTask = "";
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
};

const myApp = createApp(vueConfig);
myApp.mount("#app");
