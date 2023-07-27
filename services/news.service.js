const path = require("path");
const newsData = require("../db/news.json"); //cargo el json
const filePath = path.join(__dirname, "../db/news.json");
const fs = require("fs");

class newsService {
  constructor() {
    this.noticias = newsData.noticias;
  }

  async create(data) {
    const newData = {
      id: data.id,
      title: data.title,
      fecha: data.fecha,
      image: data.image,
      content: data.content,
    };
    this.noticias.push(newData);
    // escribe los datos nuevos en el mismo db.json
    const jsonData = {
      noticias: this.noticias,
    };
    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    return jsonData;
  }

  async find() {
    return this.noticias;
  }

  async findOne(id) {
    return this.noticias.find((item) => item.id === id);
  }

  async update(id, changes) {
    //devolver la posición del objeto encotrado
    const index = this.noticias.findIndex(
      (item) => item.id === parseInt(id, 10)
    );
    //comprobar si el objeto, realmente existe
    if (index === -1) {
      throw new Error("objeto no encontrado");
    }
    const news = this.noticias[index];
    //actualizar el objeto con los cambios realizados
    //persistir los datos y lsolo cambiar la nueva información
    this.noticias[index] = {
      ...news,
      ...changes,
    };

    // escribe los datos actualizados en db.json
    const jsonData = {
      noticias: this.noticias,
    };
    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    return this.noticias[index];
  }

  async delete(id) {
    //devolver la posición del objeto encotrado
    const index = this.noticias.findIndex(
      (item) => item.id === parseInt(id, 10)
    );
    //comprobar si el objeto, realmente existe
    if (index === -1) {
      throw new Error("objeto no encontrado");
    }

    //eliminar el objeto
    this.noticias.splice(index, 1);
    // escribe los datos actualizados en db.json
    const jsonData = {
      noticias: this.noticias,
    };

    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    return "Elemento eliminado";
  }
}
module.exports = newsService;
