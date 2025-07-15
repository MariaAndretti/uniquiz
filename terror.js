document.addEventListener('DOMContentLoaded', () => {
  const chapters = document.querySelectorAll('.chapter');
  const startButton = document.querySelector('.start-button');
  const bookContainer = document.querySelector('.book-container');
  const backgroundAmbience = document.getElementById('background-ambience');
  const jumpScareSound = document.getElementById('jump-scare-sound');
  let currentChapterId = 'intro';
  let chapterHistory = []; // Para o botão "Voltar"

  // Função para mostrar um capítulo
  function showChapter(chapterId, addToHistory = true) {
      // Encontrar o próximo capítulo
      const nextChapter = document.getElementById(chapterId);
      if (!nextChapter) {
          console.error(`Capítulo com ID "${chapterId}" não encontrado.`);
          return;
      }

      // Adicionar o capítulo atual ao histórico se necessário
      if (addToHistory && currentChapterId && currentChapterId !== chapterId) {
          chapterHistory.push(currentChapterId);
      }

      // Esconder todos os capítulos
      chapters.forEach(chapter => {
          if (chapter.classList.contains('active')) {
              chapter.classList.remove('active');
              chapter.classList.add('hidden');
              // Remover o estilo 'display: block' que o 'active' pode ter adicionado para transição
              chapter.style.display = 'none';
          }
      });

      // Mostrar o novo capítulo com transição
      nextChapter.classList.remove('hidden');
      nextChapter.style.display = 'flex'; // Usar flex para centralizar o conteúdo
      setTimeout(() => {
          nextChapter.classList.add('active');
      }, 50); // Pequeno atraso para permitir que a propriedade 'display' seja aplicada antes da transição

      currentChapterId = chapterId;

      // Tocar som de ambiente se for o primeiro capítulo ou se estiver voltando para ele
      if (chapterId === 'intro' || !backgroundAmbience.playing) {
          playAudio(backgroundAmbience, true); // Inicia o som ambiente em loop
      }

      // Scroll para o topo do livro
      bookContainer.scrollTop = 0;
  }

  // Função para tocar áudio
  function playAudio(audioElement, loop = false) {
      if (audioElement) {
          audioElement.loop = loop;
          audioElement.currentTime = 0; // Reinicia o áudio
          audioElement.play().catch(error => {
              console.warn("Reprodução de áudio automática bloqueada. O usuário precisará interagir primeiro.", error);
              // Exibir uma mensagem para o usuário ou adicionar um botão de "play"
          });
      }
  }

  // Event listener para o botão "Começar a Ler"
  if (startButton) {
      startButton.addEventListener('click', () => {
          showChapter('chapter-1');
          playAudio(backgroundAmbience, true); // Toca o áudio ambiente ao começar
      });
  }

  // Event listeners para botões de escolha e de voltar
  document.addEventListener('click', (event) => {
      // Lidar com botões de escolha
      if (event.target.classList.contains('choice-button')) {
          const nextChapterId = event.target.dataset.nextChapter;
          if (nextChapterId) {
              // Adicionar efeitos sonoros de jump scare aleatoriamente
              if (Math.random() < 0.2) { // 20% de chance de um jump scare
                  playAudio(jumpScareSound);
              }
              showChapter(nextChapterId);
          }
      }

      // Lidar com o botão "Voltar"
      if (event.target.classList.contains('back-button')) {
          if (chapterHistory.length > 0) {
              const prevChapterId = chapterHistory.pop();
              showChapter(prevChapterId, false); // Não adiciona ao histórico ao voltar
          } else {
              showChapter('intro', false); // Volta para a introdução se não houver histórico
          }
      }

      // Lidar com o botão "Recomeçar"
      if (event.target.classList.contains('restart-button')) {
          chapterHistory = []; // Limpa o histórico
          showChapter('intro');
      }
  });

  // Iniciar na seção de introdução
  showChapter('intro', false);
});