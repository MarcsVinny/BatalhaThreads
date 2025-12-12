// src/controllers/GameController.ts
import { DATA_PROFESSORES, Professor, MensagemBatalha } from '../models/Types.js';
import { UI } from '../views/UI.js';

// Estado do Sistema
let workersAtivos: { [key: string]: Worker } = {};
let isRunning = false;

// Inicialização
UI.renderizarArena(DATA_PROFESSORES);
UI.bindStartButton(iniciarKernel);

function iniciarKernel() {
    if (isRunning) return;
    
    // Reset de Estado
    isRunning = true;
    DATA_PROFESSORES.forEach(p => { p.hp = p.maxHp; p.stamina = 100; });
    Object.values(workersAtivos).forEach(w => w.terminate());
    workersAtivos = {};
    
    UI.setLoadingState();
    UI.renderizarArena(DATA_PROFESSORES);

    // Alocação de Threads
    DATA_PROFESSORES.forEach((prof, index) => {
        setTimeout(() => {
            // Cria o Worker (Aponta para o JS compilado)
            const worker = new Worker('./dist/workers/BattleWorker.js', { type: 'module' });
            
            workersAtivos[prof.nome] = worker;
            
            const oponentes = DATA_PROFESSORES.map(p => p.nome).filter(n => n !== prof.nome);
            const payload: MensagemBatalha = { tipo: 'START', eu: prof, oponentes: oponentes };
            
            worker.postMessage(payload);
            
            // Pattern Observer/Pub-Sub: O Controller "assina" as mensagens do Worker
            worker.onmessage = (e) => gerenciarMensagem(e.data);
            
            UI.log(`> Thread [${prof.nome}] alocada (PID: ${300+index})`);
        }, index * 800);
    });
}

function gerenciarMensagem(dados: MensagemBatalha) {
    if (!isRunning) return;

    // Atualização de UI via View
    if (dados.stamina !== undefined) {
        const nome = dados.atacante || dados.nome;
        if (nome) UI.atualizarStamina(nome, dados.stamina);
    }

    if (dados.tipo === 'DESCANSO' && dados.nome) {
        UI.animarDescanso(dados.nome);
    } 
    else if (dados.tipo === 'ATAQUE' && dados.atacante && dados.alvo && dados.dano) {
        processarAtaque(dados.atacante, dados.alvo, dados.dano, dados.critico || false);
    }
}

// Lógica de Regra de Negócio (Centralizada no Controller)
function processarAtaque(atacante: string, alvoNome: string, dano: number, critico: boolean) {
    const alvo = DATA_PROFESSORES.find(p => p.nome === alvoNome);
    if (!alvo || alvo.hp <= 0) return;

    const danoReal = Math.max(1, Math.floor(dano - (alvo.defesa * 0.4)));
    alvo.hp -= danoReal;

    // Atualiza View
    UI.atualizarHp(alvo.nome, alvo.hp, alvo.maxHp);
    UI.animarAtaque(atacante, critico);
    UI.animarDano(alvo.nome);

    let msg = `⚔️ <b>${atacante}</b> atacou ${alvoNome} (-${danoReal})`;
    if (critico) msg = `💥 <b>CRÍTICO!</b> ${atacante} espancou ${alvoNome}!`;
    UI.log(msg, critico ? 'log-crit' : '');

    if (alvo.hp <= 0) encerrarThread(alvo, atacante);
}

function encerrarThread(prof: Professor, assassino: string) {
    prof.hp = 0;
    UI.atualizarHp(prof.nome, 0, prof.maxHp);
    UI.atualizarStamina(prof.nome, 0);
    UI.marcarMorto(prof.nome);

    if (workersAtivos[prof.nome]) {
        workersAtivos[prof.nome].terminate(); // System Call: Kill
        delete workersAtivos[prof.nome];
    }

    UI.log(`💀 <b>${prof.nome}</b> sofreu SEGFAULT (Kill: ${assassino})`, 'log-kill');
    verificarVitoria();
}

function verificarVitoria() {
    const vivos = DATA_PROFESSORES.filter(p => p.hp > 0);
    if (vivos.length === 1) {
        isRunning = false;
        const campeao = vivos[0];
        
        if (workersAtivos[campeao.nome]) workersAtivos[campeao.nome].terminate();
        
        UI.log(`🏆 <b>VITÓRIA!</b> Processo ${campeao.nome} venceu a CPU!`, 'log-win');
        UI.marcarVencedor(campeao.nome);
    }
}