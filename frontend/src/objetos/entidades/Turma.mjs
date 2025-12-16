export default class Turma {
    #id;
    #nome;
    #codigo;
    #semestre;
    #descricao;
    #ativa;

    constructor(id, nome, codigo, semestre, descricao, ativa) {
        this.#id = id;
        this.#nome = nome;
        this.#codigo = codigo;
        this.#semestre = semestre;
        this.#descricao = descricao;
        this.#ativa = ativa;
    }

    get id() { return this.#id; }
    set id(novoId) { this.#id = novoId; }

    getNome() { return this.#nome; }
    setNome(nome) {
        if (nome) {
            this.#nome = nome;
            return true;
        }
        return false;
    }

    getCodigo() { return this.#codigo; }
    setCodigo(codigo) {
        if (codigo) {
            this.#codigo = codigo;
            return true;
        }
        return false;
    }

    getSemestre() { return this.#semestre; }
    setSemestre(semestre) {
        if (semestre) {
            this.#semestre = semestre;
            return true;
        }
        return false;
    }

    getDescricao() { return this.#descricao; }
    setDescricao(descricao) {
        this.#descricao = descricao;
        return true;
    }

    getAtiva() { return this.#ativa; }
    setAtiva(ativa) {
        this.#ativa = ativa;
        return true;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            codigo: this.#codigo,
            semestre: this.#semestre,
            descricao: this.#descricao,
            ativa: this.#ativa
        };
    }
}