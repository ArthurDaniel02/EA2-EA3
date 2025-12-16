import Quest from "../entidades/Quest.mjs";

export default class QuestDAO {
    constructor(id = null) {
        this.baseUrl = "http://localhost:3000/quests";
        this.cache = [];
      
        if (id) {
            this.cache = [];
            this.buscarPorId(id).then((quest) => {
                if (quest) this.cache = [quest];
            });
        } else {
            this.carregarLista();
        }
    }
      
    async carregarLista() {
        try {
            const resp = await fetch(this.baseUrl);
            if (!resp.ok) throw new Error("Erro ao listar Quests");

            const data = await resp.json();
            this.cache = data.map((q) => this.mapQuest(q));
        } catch (e) {
            console.error("Erro ao carregar lista Quests:", e);
            this.cache = [];
        }
    }

    listar() {
        if (!this.cache || this.cache.length === 0) {
            this.carregarLista();
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
            return null;
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

            const idx = this.cache.findIndex((q) => q.id === id);
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
            this.cache = this.cache.filter((q) => q.id !== id);
        } catch (e) {
            console.error("Erro ao excluir Quest:", e);
        }
    }


    mapQuest(q) {

        const dataLimite = q.dataLimite ? new Date(q.dataLimite) : null;
        
        return new Quest(
            q.id || q._id,
            q.titulo,
            q.descricao,
            q.xpReward,
            dataLimite,
            q.dificuldade,
            q.turma 
        );
    }


    toPlain(quest) {
        if (!quest) return {};


        const turma = quest.getTurma();
        const turmaId = (turma && turma.id) ? turma.id : turma;

        return {
            titulo: quest.getTitulo(),
            descricao: quest.getDescricao(),
            xpReward: quest.getXpReward(),
            dataLimite: quest.getDataLimite(),
            dificuldade: quest.getDificuldade(),
            turma: turmaId 
        };
    }

    async buscarPorId(id) {
        const existente = this.cache.find((q) => q.id === id);
        if (existente) return existente;
    
        try {
            const resp = await fetch(`${this.baseUrl}/${id}`);
            if (!resp.ok) throw new Error("Erro ao buscar Quest por ID");
            const data = await resp.json();
            const quest = this.mapQuest(data);
            this.cache.push(quest);
            return quest;
        } catch (e) {
            console.error("Erro ao buscar Quest por ID:", e);
            return null;
        }
    }
}