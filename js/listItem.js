class listItem {
    #text;
    #color = '#000';
    #isDone = false;
    constructor(text,color){
        this.#text = text;
        this.#color = color;
    }
    getText(){return this.#text;}
    getColor(){return this.#color;}
    getIsDone(){return this.#isDone;}

    setIsDone(value){this.#isDone = value;}
}