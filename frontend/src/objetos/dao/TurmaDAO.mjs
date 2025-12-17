import Turma from "../entidades/Turma.mjs";

export default class TurmaDAO {
    constructor() {
        this.baseUrl = "https://rpgeducacional.vercel.app";
        this.cache = [];
    }
      
    async carregarLista() {
        try {
            const resp = await fetch(this.baseUrl);
            if (!resp.ok) throw new Error("Erro ao listar Turmas");

            const data = await resp.json();
            this.cache = data.map((t) => this.mapTurma(t));
            return this.cache;
        } catch (e) {
            console.error("Erro ao carregar lista Turmas:", e);
            return []; 
        }
    }


    async listar() {
        if (!this.cache || this.cache.length === 0) {
            return await this.carregarLista();
        }
        return this.cache;
    }

    async salvar(turma) {
        try {
            const obj = this.toPlain(turma);

            delete obj.id; 

            const resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });
            if (!resp.ok) throw new Error("Erro ao salvar Turma");

            const data = await resp.json();
            const nova = this.mapTurma(data);
            this.cache.push(nova);
            return nova;
        } catch (e) {
            console.error("Erro ao salvar Turma:", e);
            throw e;
        }
    }

    async atualizar(id, novaTurma) {
        try {
            const obj = this.toPlain(novaTurma);
            
            const resp = await fetch(`${this.baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });
            if (!resp.ok) throw new Error("Erro ao atualizar Turma");

            const data = await resp.json();
            const atualizada = this.mapTurma(data);

            const idx = this.cache.findIndex((t) => t.getId() === id); 
            if (idx >= 0) this.cache[idx] = atualizada;
            else this.cache.push(atualizada);

            return atualizada;
        } catch (e) {
            console.error("Erro ao atualizar Turma:", e);
            return null;
        }
    }

    async excluir(id) {
        const resp = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
        if (!resp.ok) throw new Error("Erro ao excluir");
        this.cache = this.cache.filter((t) => t.getId() !== id);
    }

    mapTurma(t) {
        return new Turma(
            t.id || t._id,
            t.nome,
            t.codigo,
            t.semestre,
            t.descricao, 
            t.ativa,
            t.professor 
        );
    }

    toPlain(turma) {
        if (!turma) return {};
        
        const prof = turma.getProfessor();

        const profId = (prof && prof.id) ? prof.id : prof; 

        return {
            nome: turma.getNome(),
            codigo: turma.getCodigo(),
            semestre: turma.getSemestre(),
            descricao: turma.getDescricao(), 
            ativa: turma.getAtiva(),
            professor: profId 
        };
    }
}