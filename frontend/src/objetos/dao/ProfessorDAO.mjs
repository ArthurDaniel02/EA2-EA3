import Professor from "../entidades/Professor.mjs";

export default class ProfessorDAO {
    constructor() {
        this.baseUrl = "https://rpgeducacional.vercel.app/professores"; 
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
    async atualizar(id, novoProfessor) {
        try {
            const obj = this.toPlain(novoProfessor);
            delete obj.id; 

            const resp = await fetch(`${this.baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });

            if (!resp.ok) throw new Error("Erro ao atualizar Professor");

            const data = await resp.json();
            const atualizado = this.mapProfessor(data);
            const idx = this.cache.findIndex((p) => p.getId() === id);
            if (idx >= 0) this.cache[idx] = atualizado;

            return atualizado;
        } catch (e) {
            console.error("Erro ao atualizar Professor:", e);
            throw e;
        }
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
        const resp = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
        if (!resp.ok) throw new Error("Erro ao excluir");
        this.cache = this.cache.filter((p) => p.getId() !== id);
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