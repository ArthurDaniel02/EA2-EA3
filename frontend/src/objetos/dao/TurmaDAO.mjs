import Turma from "../entidades/Turma.mjs";

export default class TurmaDAO {
    constructor(id = null) {
        this.baseUrl = "http://localhost:3000/turmas";
        this.cache = [];
      
        if (id) {
            this.cache = [];
            this.buscarPorId(id).then((turma) => {
                if (turma) this.cache = [turma];
            });
        } else {
            this.carregarLista();
        }
    }
      
    async carregarLista() {
        try {
            const resp = await fetch(this.baseUrl);
            if (!resp.ok) throw new Error("Erro ao listar Turmas");

            const data = await resp.json();
            this.cache = data.map((t) => this.mapTurma(t));
        } catch (e) {
            console.error("Erro ao carregar lista Turmas:", e);
            this.cache = [];
        }
    }

    listar() {
        if (!this.cache || this.cache.length === 0) {
            this.carregarLista();
        }
        return this.cache;
    }

    async salvar(turma) {
        try {
            const obj = this.toPlain(turma);

            
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
            return null;
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

            const idx = this.cache.findIndex((t) => t.id === id);
            if (idx >= 0) this.cache[idx] = atualizada;
            else this.cache.push(atualizada);

            return atualizada;
        } catch (e) {
            console.error("Erro ao atualizar Turma:", e);
            return null;
        }
    }

    async excluir(id) {
        try {
            const resp = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
            if (!resp.ok) throw new Error("Erro ao excluir Turma");
            this.cache = this.cache.filter((t) => t.id !== id);
        } catch (e) {
            console.error("Erro ao excluir Turma:", e);
        }
    }


    mapTurma(t) {

        return new Turma(
            t.id || t._id,
            t.nome,
            t.codigo,
            t.semestre,
            t.salaVirtual,
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
            salaVirtual: turma.getSalaVirtual(),
            ativa: turma.getAtiva(),
            professor: profId 
        };
    }

    async buscarPorId(id) {
        const existente = this.cache.find((t) => t.id === id);
        if (existente) return existente;
    
        try {
            const resp = await fetch(`${this.baseUrl}/${id}`);
            if (!resp.ok) throw new Error("Erro ao buscar Turma por ID");
            const data = await resp.json();
            const turma = this.mapTurma(data);
            this.cache.push(turma);
            return turma;
        } catch (e) {
            console.error("Erro ao buscar Turma por ID:", e);
            return null;
        }
    }
}