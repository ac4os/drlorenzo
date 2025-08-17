        const jobContainer = document.querySelector('.job');
        const jobText = jobContainer.querySelector('span');
        const words = JSON.parse(jobContainer.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            jobText.textContent = currentWord.substring(0, charIndex);
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            let speed = isDeleting ? 60 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                speed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }
            setTimeout(typeEffect, speed);
        }
        typeEffect();

        // Script para o botão de alternância de tema
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });