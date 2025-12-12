// src/workers/BattleWorker.ts
import { Professor, MensagemBatalha } from '../models/Types.js';

const ctx: Worker = self as any;

ctx.onmessage = (event) => {
    const dados: MensagemBatalha = event.data;
    if (dados.tipo === 'START' && dados.eu && dados.oponentes) {
        processLoop(dados.eu, dados.oponentes);
    }
};

function processLoop(eu: Professor, oponentes: string[]) {
    // Loop de Processamento (Clock)
    setInterval(() => {
        
        // 1. Verifica Recurso (Stamina)
        if (eu.stamina < 20) {
            eu.stamina += 50;
            // Pub/Sub: Publica estado de descanso
            const msg: MensagemBatalha = { tipo: 'DESCANSO', nome: eu.nome, stamina: eu.stamina };
            ctx.postMessage(msg);
            return; 
        }

        // 2. Processamento
        const alvo = oponentes[Math.floor(Math.random() * oponentes.length)];
        let dano = eu.ataque + (Math.random() * 10);
        
        const isCrit = Math.random() > 0.8;
        if (isCrit) dano *= 1.5;

        eu.stamina -= 15;

        // 3. Pub/Sub: Publica resultado do processamento
        const msgAtaque: MensagemBatalha = {
            tipo: 'ATAQUE',
            atacante: eu.nome,
            alvo: alvo,
            dano: dano,
            critico: isCrit,
            stamina: eu.stamina
        };
        ctx.postMessage(msgAtaque);

    }, eu.velocidade);
}