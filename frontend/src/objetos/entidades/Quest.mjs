export default class Quest {
    #id;
    #titulo;
    #descricao;
    #xp;
    #dataEntrega;
    #turma; // Isso vai guardar um objeto Turma ou o ID dela

    constructor(id, titulo, descricao, xp, dataEntrega, turma) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descricao = descricao;
        this.#xp = xp;
        this.#dataEntrega = dataEntrega;
        this.#turma = turma;
    }

    get id() { return this.#id; }
    set id(novoId) { this.#id = novoId; }

    getTitulo() { return this.#titulo; }
    setTitulo(titulo) {
        if (titulo) {
            this.#titulo = titulo;
            return true;
        }
        return false;
    }

    getDescricao() { return this.#descricao; }
    setDescricao(descricao) {
        if (descricao) {
            this.#descricao = descricao;
            return true;
        }
        return false;
    }

    getXp() { return this.#xp; }
    setXp(xp) {
        if (xp > 0) {
            this.#xp = xp;
            return true;
        }
        return false;
    }

    getDataEntrega() { return this.#dataEntrega; }
    setDataEntrega(data) {
        if (data) {
            this.#dataEntrega = data;
            return true;
        }
        return false;
    }

    // --- AQUI ESTÁ O RELACIONAMENTO ---
    getTurma() { return this.#turma; }
    setTurma(turma) {
        // Aceita apenas se for um objeto válido ou ID
        if (turma) {
            this.#turma = turma;
            return true;
        }
        return false;
    }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            xp: this.#xp,
            dataEntrega: this.#dataEntrega,
            turma: this.#turma // Ao enviar pro back, envia o objeto ou ID
        };
    }
}