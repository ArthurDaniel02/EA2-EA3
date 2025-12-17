import Professor from "../entidades/Professor.mjs";

export default class ProfessorDAO {
    constructor() {
        this.baseUrl = "http://localhost:3000/professores"; 
        this.cache = []; 
    }
      
    async carregarLista() {
        try {
            const resp = await fetch(this.baseUrl);
            if (!resp.ok) throw new Error("Erro ao listar Professores");

            const data = await resp.json();
            this.cache = data.map((prof) => this.mapProfessor(prof));
            return this.cache;
        } catch (e) {
            console.error("Erro ao carregar lista Professores:", e);
            return [];
        }
    }

    async listar() {
        if (!this.cache || this.cache.length === 0) {
            return await this.carregarLista();
        }
        return this.cache;
    }

    async salvar(professor) {
        try {

            const obj = this.toPlain(professor);
            delete obj.id; 

            const resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });
            
            if (!resp.ok) throw new Error("Erro ao salvar Professor");

            const data = await resp.json();
            const novo = this.mapProfessor(data);
            this.cache.push(novo); 
            return novo;
        } catch (e) {
            console.error("Erro ao salvar Professor:", e);
            throw e; 
        }
    }

    async excluir(id) {
        try {
            const resp = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
            if (!resp.ok) throw new Error("Erro ao excluir Professor");
            this.cache = this.cache.filter((p) => p.getId() !== id);
        } catch (e) {
            console.error("Erro ao excluir Professor:", e);
            throw e;
        }
    }

    mapProfessor(prof) {
        return new Professor(
            prof._id || prof.id, 
            prof.nome, 
            prof.email, 
            prof.especialidade, 
            prof.nivel || "Júnior",
            prof.telefone
        );
    }

    toPlain(professor) {
        return {
            nome: professor.getNome(),
            email: professor.getEmail(),
            especialidade: professor.getEspecialidade(),
            nivel: professor.getNivel(),
            telefone: professor.getTelefone()
        };
    }
}