// src/models/Types.ts

export interface Professor {
    nome: string;
    avatar: string;
    hp: number;
    maxHp: number;
    ataque: number;
    defesa: number;
    velocidade: number; // em ms
    stamina: number;
}

// Padrão DTO (Data Transfer Object) para comunicação
export interface MensagemBatalha {
    tipo: 'ATAQUE' | 'DESCANSO' | 'START';
    eu?: Professor;
    oponentes?: string[]; // Lista de nomes
    atacante?: string;
    alvo?: string;
    dano?: number;
    critico?: boolean;
    stamina?: number;
    nome?: string;
}

// Configuração inicial (Banco de Dados estático)
export const DATA_PROFESSORES: Professor[] = [
    { nome: "Maykol", avatar: "./assets/maykoll.png", hp: 160, maxHp: 160, ataque: 25, defesa: 20, velocidade: 5000, stamina: 100 },
    { nome: "Sekeff", avatar: "./assets/sekeff.png", hp: 110, maxHp: 110, ataque: 40, defesa: 5, velocidade: 4200, stamina: 80 },
    { nome: "Iallen", avatar: "./assets/iallen.png", hp: 130, maxHp: 130, ataque: 20, defesa: 20, velocidade: 4800, stamina: 100 },
    { nome: "Jivago", avatar: "./assets/jivago.png", hp: 150, maxHp: 150, ataque: 15, defesa: 30, velocidade: 6000, stamina: 120 },
    { nome: "Mayllon", avatar: "./assets/mayllon.png", hp: 125, maxHp: 125, ataque: 30, defesa: 10, velocidade: 4500, stamina: 90 },
    { nome: "Jefferson", avatar: "./assets/jeferson.png", hp: 130, maxHp: 130, ataque: 22, defesa: 18, velocidade: 4900, stamina: 100 },
    { nome: "Marcos", avatar: "./assets/marcos.png", hp: 100, maxHp: 100, ataque: 45, defesa: 0, velocidade: 3500, stamina: 60 }
];