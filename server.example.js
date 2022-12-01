const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    // res.setHeader("Content-Type", "text/html");
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(content);

    // Headers - заголовки которые отправил нам сервер. Это некоторая Meta информация которая уходит с каждым запросом. Например: text/html и т.д
    // res.setHeader - нужен для добавления каких-то хедеров
    // res.writeHead - нужен для добавления номера запроса (404, 200 и т.д)
    // Альтернотвой метода res.setHeader является добавлением этих параметров объектом во второй параметр метода res.writeHead
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });

    req.on("end", () => {
      // console.log("END", body.toString().split("=")[1].replaceAll("+", " "));
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);

      res.end(`Title = ${title}`);
    });

    // req.on - слушатель событий для request
    // Событие 'data' это бафферы которые приходят нам
    // end событие которое отвечает за то что все данные пришли
  }
  // res.end("Hello from server!!!"); // говорим что нужно делать серверу
}); // создаём web-server
