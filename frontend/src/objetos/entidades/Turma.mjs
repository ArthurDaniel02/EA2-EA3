export default class Turma {
    #id;
    #nome;
    #codigo;
    #semestre;
    #descricao;
    #ativa;
    #professor; // ADICIONADO: A turma precisa ter um dono

    constructor(id, nome, codigo, semestre, descricao, ativa, professor) {
        this.#id = id;
        this.#nome = nome;
        this.#codigo = codigo;
        this.#semestre = semestre;
        this.#descricao = descricao;
        this.#ativa = ativa;
        this.#professor = professor;
    }

    getId() { return this.#id; }
    setId(id) { this.#id = id; }

    getNome() { return this.#nome; }
    setNome(nome) { this.#nome = nome; }

    getCodigo() { return this.#codigo; }
    setCodigo(codigo) { this.#codigo = codigo; }

    getSemestre() { return this.#semestre; }
    setSemestre(semestre) { this.#semestre = semestre; }

    getDescricao() { return this.#descricao; }
    setDescricao(descricao) { this.#descricao = descricao; }

    getAtiva() { return this.#ativa; }
    setAtiva(ativa) { this.#ativa = ativa; }

    // ADICIONADO: Getter e Setter do Professor
    getProfessor() { return this.#professor; }
    setProfessor(professor) { this.#professor = professor; }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            codigo: this.#codigo,
            semestre: this.#semestre,
            descricao: this.#descricao,
            ativa: this.#ativa,
            professor: this.#professor // Envia o ID ou Objeto pro back
        };
    }
}