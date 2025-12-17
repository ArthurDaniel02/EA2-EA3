import Quest from "../entidades/Quest.mjs";

export default class QuestDAO {
    constructor() {
        this.baseUrl = "http://localhost:3000/quests";
        this.cache = [];
    }
      
    async carregarLista() {
        try {
            const resp = await fetch(this.baseUrl);
            if (!resp.ok) throw new Error("Erro ao listar Quests");

            const data = await resp.json();
            this.cache = data.map((q) => this.mapQuest(q));
            return this.cache;
        } catch (e) {
            console.error("Erro ao carregar lista Quests:", e);
            return [];
        }
    }

    // CORREÇÃO: Agora é async igual ao do Professor
    async listar() {
        if (!this.cache || this.cache.length === 0) {
            return await this.carregarLista();
        }
        return this.cache;
    }

    async salvar(quest) {
        try {
            const obj = this.toPlain(quest);
            delete obj.id;

            const resp = await fetch(this.baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });
            if (!resp.ok) throw new Error("Erro ao salvar Quest");

            const data = await resp.json();
            const nova = this.mapQuest(data);
            this.cache.push(nova);
            return nova;
        } catch (e) {
            console.error("Erro ao salvar Quest:", e);
            throw e;
        }
    }

    async atualizar(id, novaQuest) {
        try {
            const obj = this.toPlain(novaQuest);
            
            const resp = await fetch(`${this.baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj),
            });
            if (!resp.ok) throw new Error("Erro ao atualizar Quest");

            const data = await resp.json();
            const atualizada = this.mapQuest(data);

            const idx = this.cache.findIndex((q) => q.getId() === id); // Usa getId()
            if (idx >= 0) this.cache[idx] = atualizada;
            else this.cache.push(atualizada);

            return atualizada;
        } catch (e) {
            console.error("Erro ao atualizar Quest:", e);
            return null;
        }
    }

    async excluir(id) {
        try {
            const resp = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
            if (!resp.ok) throw new Error("Erro ao excluir Quest");
            this.cache = this.cache.filter((q) => q.getId() !== id); // Usa getId()
        } catch (e) {
            console.error("Erro ao excluir Quest:", e);
        }
    }

    // Converte JSON do Back -> Objeto Quest
    mapQuest(q) {
        // Garante que data venha certa
        const dataEntrega = q.dataEntrega ? new Date(q.dataEntrega) : null;
        
        return new Quest(
            q._id || q.id,
            q.titulo,
            q.descricao,
            q.xp,          // Agora bate com a entidade
            q.dificuldade, // Adicionado
            dataEntrega,   // Agora bate com a entidade
            q.turma 
        );
    }

    // Converte Objeto Quest -> JSON pro Back
    toPlain(quest) {
        if (!quest) return {};

        // Lógica para extrair só o ID da turma se for um objeto
        const turma = quest.getTurma();
        const turmaId = (turma && turma.id) ? turma.id : turma;

        return {
            titulo: quest.getTitulo(),
            descricao: quest.getDescricao(),
            xp: quest.getXp(),                   // Corrigido (era getXpReward)
            dificuldade: quest.getDificuldade(), // Corrigido
            dataEntrega: quest.getDataEntrega(), // Corrigido (era getDataLimite)
            turma: turmaId 
        };
    }
}