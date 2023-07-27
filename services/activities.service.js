const path = require("path");
const newsData = require("../db/activities.json"); //cargo el json
const filePath = path.join(__dirname, "../db/activities.json");
const fs = require("fs");

class activitiesService {
  constructor() {
    this.actividades = newsData.actividades;
  }

  async create(data) {
    const newData = {
      id: data.id,
      title: data.title,
      fecha: data.fecha,
      image: data.image,
      content: data.content,
    };
    this.actividades.push(newData);
    // escribe los datos nuevos en el mismo db.json
    const jsonData = {
      actividades: this.actividades
    };
    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    return jsonData;
  }

  async find() {
    return this.actividades;
  }

  async findOne(id) {
    return this.actividades.find((item) => item.id === id);
  }

  async update(id, changes) {
    //devolver la posición del objeto encotrado
    const index = this.actividades.findIndex(
      (item) => item.id === parseInt(id, 10)
    );
    //comprobar si el objeto, realmente existe
    if (index === -1) {
      throw new Error("objeto no encontrado");
    }
    const news = this.actividades[index];
    //actualizar el objeto con los cambios realizados
    //persistir los datos y lsolo cambiar la nueva información
    this.actividades[index] = {
      ...news,
      ...changes,
    };

    // escribe los datos actualizados en db.json
    const jsonData = {
      actividades: this.actividades,
    };
    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    return this.actividades[index];
  }

  async delete(id) {
    //devolver la posición del objeto encotrado
    const index = this.actividades.findIndex(
      (item) => item.id === parseInt(id, 10)
    );
    //comprobar si el objeto, realmente existe
    if (index === -1) {
      throw new Error("objeto no encontrado");
    }

    //eliminar el objeto
    this.actividades.splice(index, 1);
    // escribe los datos actualizados en db.json
    const jsonData = {
      actividades: this.actividades,
    };

    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    return "Elemento eliminado";
  }
}
module.exports = activitiesService;
