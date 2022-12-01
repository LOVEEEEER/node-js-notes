const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");

// nodemon - нужен для автоматической перезагрузки проекта при вводе изменений

const port = 3000;
// const basePath = path.join(__dirname, "pages");
const app = express();

app.set("view engine", "ejs"); // данный метод позволяет переопределять какие то базовые настройки которые в нем присутсвуют
app.set("views", "pages"); // переназначили дефолтную папку views на pages

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: true })); // учим экспресс прнимать данные с Frontenda
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  // res.sendFile(path.join(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await updateNote(req.params.id, req.body.newTitle);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}`));
}); // Запускаем сервер, 1 параметр порт, 2 параметр(опционально) - колбэк функция которая будет вызвана в случае успешного запуска сервера
