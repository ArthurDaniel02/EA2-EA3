export default class Quest {
    #id;
    #titulo;
    #descricao;
    #xp;
    #dificuldade; 
    #dataEntrega;
    #turma; 

    constructor(id, titulo, descricao, xp, dificuldade, dataEntrega, turma) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descricao = descricao;
        this.#xp = xp;
        this.#dificuldade = dificuldade;
        this.#dataEntrega = dataEntrega;
        this.#turma = turma;
    }


    getId() { return this.#id; }
    setId(id) { this.#id = id; }

    getTitulo() { return this.#titulo; }
    setTitulo(titulo) { this.#titulo = titulo; }

    getDescricao() { return this.#descricao; }
    setDescricao(descricao) { this.#descricao = descricao; }

    getXp() { return this.#xp; }
    setXp(xp) { this.#xp = xp; }

    getDificuldade() { return this.#dificuldade; }
    setDificuldade(dificuldade) { this.#dificuldade = dificuldade; }

    getDataEntrega() { return this.#dataEntrega; }
    setDataEntrega(data) { this.#dataEntrega = data; }

    getTurma() { return this.#turma; }
    setTurma(turma) { this.#turma = turma; }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            xp: this.#xp,
            dificuldade: this.#dificuldade,
            dataEntrega: this.#dataEntrega,
            turma: this.#turma
        };
    }
}