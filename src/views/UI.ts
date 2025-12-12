// src/views/UI.ts
import { Professor } from '../models/Types.js';

// Elementos do DOM
const arena = document.getElementById('arena') as HTMLDivElement;
const logContainer = document.getElementById('log') as HTMLDivElement;
const btnStart = document.getElementById('btnStart') as HTMLButtonElement;

export const UI = {
    // Renderiza os cards iniciais
    renderizarArena(professores: Professor[]) {
        arena.innerHTML = '';
        professores.forEach(p => {
            const div = document.createElement('div');
            div.className = 'card';
            div.id = `card-${p.nome}`;
            // Dentro de renderizarArena...
div.innerHTML = `
    <img src="${p.avatar}" class="avatar-img" alt="${p.nome}">
    <div class="stamina-bg"><div class="stamina-fill" id="stamina-${p.nome}" style="width: 100%"></div></div>
    <div class="name">${p.nome}</div>
    <div class="stats">⚔️${p.ataque} 🛡️${p.defesa} ⚡${(p.velocidade/1000).toFixed(1)}s</div>
    <div class="hp-bg"><div class="hp-fill" id="hp-${p.nome}" style="width: 100%"></div></div>
    <div class="hp-text" id="text-${p.nome}">${p.hp}/${p.maxHp}</div>
`;
            arena.appendChild(div);
        });
    },

    atualizarHp(nome: string, hpAtual: number, maxHp: number) {
        const bar = document.getElementById(`hp-${nome}`);
        const text = document.getElementById(`text-${nome}`);
        if (bar && text) {
            const pct = (hpAtual / maxHp) * 100;
            bar.style.width = `${pct}%`;
            text.innerText = `${Math.max(0, Math.round(hpAtual))}/${maxHp}`;
            if (pct < 30) bar.style.backgroundColor = '#ff4444'; // Danger color
        }
    },

    atualizarStamina(nome: string, valor: number) {
        const bar = document.getElementById(`stamina-${nome}`);
        if (bar) bar.style.width = `${valor}%`;
    },

    animarAtaque(nome: string, critico: boolean) {
        const card = document.getElementById(`card-${nome}`);
        if (card) {
            card.classList.remove('attacking', 'sleeping');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('attacking');
            if (critico) {
                card.classList.add('crit-effect');
                setTimeout(() => card.classList.remove('crit-effect'), 500);
            }
        }
    },

    animarDano(nome: string) {
        const card = document.getElementById(`card-${nome}`);
        if (card) {
            card.classList.remove('hit', 'sleeping');
            void card.offsetWidth;
            card.classList.add('hit');
        }
    },

    animarDescanso(nome: string) {
        const card = document.getElementById(`card-${nome}`);
        if (card) {
            card.classList.add('sleeping');
            setTimeout(() => card.classList.remove('sleeping'), 1500);
            this.log(`💤 ${nome} entrou em WAIT (Recuperando I/O...)`, 'log-sleep');
        }
    },

    marcarMorto(nome: string) {
        const card = document.getElementById(`card-${nome}`);
        card?.classList.add('dead');
        card?.classList.remove('sleeping', 'attacking');
    },

    marcarVencedor(nome: string) {
        const card = document.getElementById(`card-${nome}`);
        card?.classList.add('winner');
        card?.classList.remove('sleeping');
        btnStart.innerText = "🔄 REINICIAR SISTEMA";
        btnStart.disabled = false;
    },

    log(msg: string, type: string = '') {
        const div = document.createElement('div');
        div.className = `log-entry ${type}`;
        div.innerHTML = `<span style="color:#666">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        logContainer.appendChild(div);
        logContainer.scrollTop = logContainer.scrollHeight;
    },

    setLoadingState() {
        btnStart.disabled = true;
        btnStart.innerText = "SIMULAÇÃO EM ANDAMENTO...";
        logContainer.innerHTML = '<div class="log-entry"> > Kernel iniciado...</div>';
    },

    // Permite que o Controller defina o que acontece ao clicar
    bindStartButton(handler: () => void) {
        btnStart.addEventListener('click', handler);
    }
};