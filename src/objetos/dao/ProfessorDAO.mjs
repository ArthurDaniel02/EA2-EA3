import Professor from "../entidades/Professor.mjs";

export default class ProfessorDAO {
    constructor(id = null) {
        // Mude para sua URL real do Backend
        this.baseUrl = "http://localhost:3000/professores"; 
        this.cache = [];
      
        if (id) {
          this.cache = [];
          this.buscarPorId(id).then((prof) => {
            if (prof) this.cache = [prof];
          });
        } else {
          this.carregarLista();
        }
    }
      
    async carregarLista() {
        try {
            const resp = await fetch(this.baseUrl);
            if (!resp.ok) throw new Error("Erro ao listar Professores");

            const data = await resp.json();
            this.cache = data.map((prof) => this.mapProfessor(prof));
        } catch (e) {
            console.error("Erro ao carregar lista Professores:", e);
            this.cache = [];
        }
    }

    listar() {
        if (!this.cache || this.cache.length === 0) {
            this.carregarLista();
        }
        return this.cache;
    }

    async salvar(professor) {
        try {
            const obj = this.toPlain(professor);
            delete obj.id; // Backend gera o ID

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
            return null;
        }
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

            const idx = this.cache.findIndex((p) => p.id === id);
            if (idx >= 0) this.cache[idx] = atualizado;
            else this.cache.push(atualizado);

            return atualizado;
        } catch (e) {
            console.error("Erro ao atualizar Professor:", e);
            return null;
        }
    }

    async excluir(id) {
        try {
            const resp = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
            if (!resp.ok) throw new Error("Erro ao excluir Professor");
            this.cache = this.cache.filter((p) => p.id !== id);
        } catch (e) {
            console.error("Erro ao excluir Professor:", e);
        }
    }

    // Converte o JSON vindo do Banco para Objeto simples de tela
    mapProfessor(prof) {
        return {
            id: prof.id || prof._id, // Garante compatibilidade com SQL ou Mongo
            nome: prof.nome,
            email: prof.email,
            especialidade: prof.especialidade,
            nivel: prof.nivel
        };
    }

    // Converte a Classe Professor (com getters) para JSON para enviar ao Banco
    toPlain(professor) {
        if (!professor) return {};
        
        return {
            nome: professor.getNome?.(),
            email: professor.getEmail?.(),
            especialidade: professor.getEspecialidade?.(),
            nivel: professor.getNivel?.()
        };
    }

    async buscarPorId(id) {
        const existente = this.cache.find((p) => p.id === id);
        if (existente) return existente;
    
        try {
            const resp = await fetch(`${this.baseUrl}/${id}`);
            if (!resp.ok) throw new Error("Erro ao buscar Professor por ID");
            const data = await resp.json();
            const prof = this.mapProfessor(data);
    
            this.cache.push(prof);
            return prof;
        } catch (e) {
            console.error("Erro ao buscar Professor por ID:", e);
            return null;
        }
    }
}