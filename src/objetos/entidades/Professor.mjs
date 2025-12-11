export default class Professor {
    #id;
    #nome;
    #email;
    #especialidade;
    #nivel;         

    constructor(id, nome, email, especialidade, nivel) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#especialidade = especialidade;
        this.#nivel = nivel;
    }

    getId() { return this.#id; }
    setId(id) { this.#id = id; }

    getNome() { return this.#nome; }
    setNome(nome) { this.#nome = nome; }

    getEmail() { return this.#email; }
    setEmail(email) { this.#email = email; }

    getEspecialidade() { return this.#especialidade; }
    setEspecialidade(especialidade) { this.#especialidade = especialidade; }

    getNivel() { return this.#nivel; }
    setNivel(nivel) { this.#nivel = nivel; }

   
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            especialidade: this.#especialidade,
            nivel: this.#nivel
        };
    }
}