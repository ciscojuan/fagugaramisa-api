const news = require('../db/db.json');//cargo el json

class newsService{
    
    constructor(){
        this.noticias = news ;
    }

    create(){

    }

    find(){
        return this.noticias;
    }


    findOne(id){
        return this.noticias.find((item) => item.id === id);
    }

    update(){

    }

    delete(){

    }
}
module.exports = newsService;