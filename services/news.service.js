const news = require("../db/db.json"); //cargo el json

class newsService {
  constructor() {
    this.noticias = news.noticias;
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
    return newData;
  }

  async find() {
    return this.noticias;
  }

  async findOne(id) {
    return this.noticias.find((item) => item.id === id);
  }

  async update(id, changes) {
    //devolver la posición del objeto encotrado
    const index = this.noticias.findIndex((item) => item.id === parseInt(id, 10));
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

    return this.noticias[index];
  }

  async delete(id) {
    //devolver la posición del objeto encotrado
    const index = this.noticias.findIndex((item) => item.id === parseInt(id, 10));
    //comprobar si el objeto, realmente existe
    if (index === -1) {
      throw new Error("objeto no encontrado");
    }
    //eliminar n elemento a partir de la posicion encontrada
    this.noticias.splice(index, 1);

    return "Elemento eliminado";
  }
}
module.exports = newsService;
