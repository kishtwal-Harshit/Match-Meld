document.addEventListener('DOMContentLoaded', function() {
    const animatedText = document.getElementById('animated-text');
    const text = animatedText.textContent;
    animatedText.textContent = '';

    for (let i = 0; i < text.length; i++) {
        setTimeout(function() {
            animatedText.textContent += text[i];
        }, 5*i);
    }
});
