const tasks = [
  {
    id: "task-42528647",
    completed: false,
    text: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit.",
    title: "Eu ea incididunt sunt consectetur.",
  },
  {
    id: "task-63583488",
    completed: false,
    text: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in.",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    id: "task-45299838",
    completed: false,
    text: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.",
    title: "Deserunt laborum id consectetur pariatur veniam occaecat.",
  },
  {
    id: "task-41603808",
    completed: false,
    text: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip.",
    title: "Deserunt laborum id consectetur.",
  },
];

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task.id] = task;
    return acc;
  }, {});

  const themes = {
    dark: {
      "--primary": "#181818",
      "--secondary": "#fafafa",
      "--task-bg": "#fafafa",
    },
    light: {
      "--primary": "#fafafa",
      "--secondary": "#181818",
      "--task-bg": "#cccccc",
    },
  };

  // DOM Elements
  const taskWrapper = document.querySelector(".task-wrapper");
  const form = document.forms.addTask;
  const inputTitle = form.elements.taskTitle;
  const inputText = form.elements.taskText;
  const selectTheme = document.querySelector(".header__select-theme");
  const htmlRoot = document.querySelector(":root");
  const themeFromLS = localStorage.getItem("theme");
  const modal = document.querySelector(".modal");
  const modalText = document.querySelector(".modal__text");
  let taskElem;
  let taskId;

  // Events
  renderAllTasks();
  setTheme(themeFromLS);
  selectTheme.value = themeFromLS || "dark";
  form.addEventListener("submit", onFormSubmitHandler);
  taskWrapper.addEventListener("click", onDeleteHandler);
  selectTheme.addEventListener("change", onThemeChangeHandler);
  modal.addEventListener("click", onModalHandler);

  // Functions
  function createTaskTemplate({ title, text, id }) {
    return `
      <div class="task" data-task-id="${id}">
        <h3>${title}</h3>  
        <p class="task__text">${text}</p>
        <button type="button" class="btn btn--delete">Delete task</button>
      </div>
   `;
  }

  function renderAllTasks() {
    let fragment = "";
    Object.values(objOfTasks).forEach((task) => {
      fragment += createTaskTemplate(task);
    });
    taskWrapper.insertAdjacentHTML("beforeend", fragment);
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();

    const titleValue = inputTitle.value.trim();
    const textValue = inputText.value.trim();

    const isError = document.querySelectorAll(".error");
    if (!titleValue) {
      const error = document.createElement("span");
      error.classList.add("error");
      error.append("Запоните заголовок");
      inputTitle.after(error);
      if (isError.length > 0) {
        error.remove();
      }
      return;
    } else if (isError.length) {
      document.querySelector(".error").remove();
    }

    const newTask = createNewTask(titleValue, textValue);
    const newTaskElement = createTaskTemplate(newTask);
    taskWrapper.insertAdjacentHTML("afterbegin", newTaskElement);

    form.reset();
  }

  function createNewTask(title, text) {
    const newTask = {
      id: `task-${Math.ceil(Math.random() * 10 ** 10)}`,
      completed: false,
      title,
      text,
    };
    objOfTasks[newTask.id] = newTask;
    return newTask;
  }

  function onDeleteHandler(e) {
    if (e.target.classList.contains("btn--delete")) {
      taskElem = e.target.closest(".task");
      taskId = taskElem.getAttribute("data-task-id");
      modal.style.display = "block";
      modalText.textContent = `Are you shure you wont to delete the task: ${objOfTasks[taskId].title}?`;
    }
  }

  function deleteTaskFromObj(id) {
    delete objOfTasks[id];
  }

  function deleteTaskFromLayout(el) {
    el.remove();
  }

  function onModalHandler(e) {
    if (e.target.classList.contains("btn--modal-return")) {
      modal.style.display = "none";
      return;
    }
    if (e.target.classList.contains("btn--modal-delete")) {
      deleteTaskFromObj(taskId);
      deleteTaskFromLayout(taskElem);
      modal.style.display = "none";
    }
  }

  function onThemeChangeHandler() {
    const selectedTheme = selectTheme.value;
    localStorage.setItem("theme", selectedTheme);
    setTheme(selectedTheme);
  }

  function setTheme(name) {
    const selectedThemeObj = themes[name];
    for (let key in selectedThemeObj) {
      htmlRoot.style.setProperty(key, selectedThemeObj[key]);
    }
  }
})(tasks);
