document.addEventListener('DOMContentLoaded', () => {
    const pomodoroList = document.getElementById('pomodoro-list');
    const addPomodoroButton = document.getElementById('add-pomodoro');

    function createPomodoro(operatorName, workTime = 7200, restTime = 900) {
        const pomodoroItem = document.createElement('div');
        pomodoroItem.className = 'pomodoro-item';

        // Ícone
        const icon = document.createElement('img');
        icon.className = 'icon';
        icon.src = './Assets/timer.svg'; // Ícone inicial para trabalho
        icon.alt = 'Timer Icon';

        // Nome
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = operatorName;

        // Barra de progresso
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBarContainer.appendChild(progressBar);

        // Timer
        const timer = document.createElement('div');
        timer.className = 'timer';
        timer.textContent = formatTime(workTime);

        // Adicionar elementos ao item
        pomodoroItem.appendChild(icon);
        pomodoroItem.appendChild(name);
        pomodoroItem.appendChild(progressBarContainer);
        pomodoroItem.appendChild(timer);
        pomodoroList.appendChild(pomodoroItem);

        // Variáveis de controle
        let isResting = false;
        let currentTime = workTime;
        const totalTime = { work: workTime, rest: restTime };

        // Atualizar timer e barra de progresso
        const interval = setInterval(() => {
            currentTime--;
            timer.textContent = formatTime(currentTime);

            // Atualizar barra de progresso
            const progress = (currentTime / (isResting ? restTime : workTime)) * 100;
            progressBar.style.width = `${progress}%`;

            if (currentTime <= 0) {
                if (isResting) {
                    // Fim do descanso, iniciar trabalho
                    currentTime = totalTime.work;
                    isResting = false;
                    pomodoroItem.classList.remove('resting');
                    progressBar.style.backgroundColor = '#002c76'; // Cor da barra para trabalho
                    icon.src = './Assets/timer.svg'; // Alterar para ícone de trabalho
                } else {
                    // Fim do trabalho, iniciar descanso
                    currentTime = totalTime.rest;
                    isResting = true;
                    pomodoroItem.classList.add('resting');
                    progressBar.style.backgroundColor = '#ffffff'; // Cor da barra para descanso
                    icon.src = './Assets/moon.svg'; // Alterar para ícone de descanso
                }
            }
        }, 1000);

        // Adicionar menu de contexto para remover timer
        pomodoroItem.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Evitar o menu padrão do navegador

            const confirmDelete = confirm('Deseja apagar este timer?');
            if (confirmDelete) {
                clearInterval(interval); // Para o intervalo
                pomodoroItem.remove(); // Remove o elemento da DOM
            }
        });
    }

    // Botão de adicionar
    addPomodoroButton.addEventListener('click', () => {
        const operatorName = prompt('Digite o nome do operador:');
        if (operatorName) {
            createPomodoro(operatorName);
        }
    });

    // Formatar tempo em minutos e segundos
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
});
