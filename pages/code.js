const textElement = document.getElementById('text');
const optionsElement = document.getElementById('options');

const story = {
    start: {
        text: "Você acorda em uma floresta misteriosa. Há um caminho à esquerda e outro à direita.",
        options: [
            { text: "Seguir pela esquerda", next: "leftPath" },
            { text: "Seguir pela direita", next: "rightPath" }
        ]
    },
    leftPath: {
        text: "Você encontra um lago brilhante. Parece haver algo no fundo.",
        options: [
            { text: "Mergulhar no lago", next: "lakeDive" },
            { text: "Voltar e tentar outro caminho", next: "start" }
        ]
    },
    rightPath: {
        text: "Um lobo aparece no caminho! Ele rosna para você.",
        options: [
            { text: "Lutar com o lobo", next: "fightWolf" },
            { text: "Correr de volta", next: "start" }
        ]
    },
    lakeDive: {
        text: "Você encontra uma espada mágica no fundo do lago. Vitória!",
        options: [
            { text: "Recomeçar a aventura", next: "start" }
        ]
    },
    fightWolf: {
        text: "O lobo era mais forte do que você imaginava. Você foi derrotado.",
        options: [
            { text: "Tentar novamente", next: "start" }
        ]
    }
};

function showScene(sceneKey) {
    const scene = story[sceneKey];
    textElement.innerText = scene.text;

    optionsElement.innerHTML = '';
    scene.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.addEventListener('click', () => showScene(option.next));
        optionsElement.appendChild(button);
    });
}

// Iniciar o jogo
showScene('start');