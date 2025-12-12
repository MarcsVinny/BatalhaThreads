# ⚡ Batalha de Threads - Simulação de S.O.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

> Uma simulação visual de **Concorrência**, **Gerenciamento de Processos** e **Escalonamento de CPU**, gamificada como um Auto-Battler RPG.

---

## 👥 Autores (Equipe de Desenvolvimento)

Projeto desenvolvido como requisito avaliativo para a disciplina de **Sistemas Operacionais** do curso de **Análise e Desenvolvimento de Sistemas** no **IFPI**.

| **Desenvolvedor** | **Papel** |
| :--- | :--- |
| **Marcos Vinícius de Oliveira Teixeira** | Arquiteto de Software & Backend Logic |
| **Gisele Días Plácido** | Documentação & Análise de Requisitos |
| **Antonio Carlos Gomes** | Frontend & Design de Interface |

---

## 📖 Sobre o Projeto

O **Batalha de Threads** não é apenas um jogo. É uma representação visual de como um Sistema Operacional moderno (Kernel) gerencia múltiplos processos (Threads) competindo por recursos limitados (CPU e Memória).

O objetivo foi fugir das explicações teóricas abstratas e criar algo onde fosse possível **visualizar** o ciclo de vida de um processo, desde sua criação (`spawn`), execução (`running`), estado de espera (`waiting`) até seu encerramento (`terminated`).

### 🎯 O Desafio Técnico
Simular paralelismo real em um ambiente Web sem bloquear a Interface do Usuário (UI Freeze), utilizando arquitetura de **Web Workers** para emular o isolamento de memória de processos reais.

---

## ⚙️ Mecânicas vs. Teoria de S.O.

Abaixo, a relação direta entre o que acontece no jogo e o conceito técnico de Sistemas Operacionais:

| Componente do Jogo | Conceito de S.O. | Explicação Técnica |
| :--- | :--- | :--- |
| **Arena / HTML** | **Kernel** | A Thread Principal que gerencia a memória compartilhada e a UI. |
| **Professor (Card)** | **Processo / Thread** | Uma instância isolada de execução (`Worker`) com seu próprio contexto. |
| **HP (Vida)** | **Memória / Recursos** | A integridade do processo. Se zerar, ocorre um `SEGFAULT` e o processo é morto (`kill`). |
| **Ataque** | **CPU Burst** | O momento em que o processo ganha a CPU para executar uma instrução pesada. |
| **Velocidade** | **Escalonamento (Clock)** | A frequência/prioridade com que o processo é agendado para execução. |
| **Stamina (Azul) 💤** | **I/O Wait / Bloqueio** | Quando o processo voluntariamente libera a CPU para aguardar recuperação de recursos (I/O). |
| **Mensagens** | **IPC / Pub-Sub** | Comunicação entre processos (`postMessage`) para evitar acesso direto à memória alheia. |

---

## 🏗️ Arquitetura de Software

O projeto foi reescrito do zero utilizando uma arquitetura **MVC (Model-View-Controller)** com **TypeScript** para garantir escalabilidade e tipagem segura.

### Estrutura de Pastas
```bash
BatalhaThreads/
├── src/
│   ├── controllers/   # GameController: O "Kernel" que orquestra tudo.
│   ├── models/        # Types: Definição dos dados (PCB - Process Control Block).
│   ├── views/         # UI: Responsável apenas pela manipulação do DOM e Animações.
│   └── workers/       # BattleWorker: A lógica isolada da Thread (Back-end no Front).
├── assets/            # Imagens e recursos estáticos.
├── css/               # Estilização Dark Mode.
└── dist/              # Código compilado para JavaScript (Produção).

🧩 Padrões de Projeto Utilizados

MVC


Singleton (simulado) para a UI

🚀 Como Rodar o Projeto
🔧 Pré-requisitos:

Node.js instalado
VS Code (recomendado)

📌 Passo a passo:
# 1. Clone o repositório
git clone https://github.com/MarcsVinny/BatalhaThreads.git

# 2. Entre na pasta
cd BatalhaThreads

# 3. Instale as dependências
npm install

# 4. Compile o TypeScript
npx tsc


Após a compilação, abra o arquivo:
index.html

De preferência usando o Live Server do VS Code.


✨ Melhorias Futuras:

Implementar diferentes algoritmos de escalonamento visual (RR, SJF, Prioridade).

Simulação de memória real (paging, swapping).

Sistema de logs do kernel exibido em tempo real.

Modo torneio entre threads.
