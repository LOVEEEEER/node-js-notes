document.addEventListener("click", ({ target }) => {
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;

    remove(id).then(() => {
      target.closest("li").remove();
    });
  } else if (target.dataset.type === "edit") {
    const newTitle = prompt("Введите новое название");
    const id = target.dataset.id;
    edit(id, newTitle).then(() => {
      target.parentNode.parentNode.childNodes[0].textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newTitle }),
  });
}
