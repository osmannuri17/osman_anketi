document.addEventListener('DOMContentLoaded', function() {
    const goodBtn = document.getElementById('good-btn');
    const badBtn = document.getElementById('bad-btn');
    const result = document.getElementById('result');
    
    // "İyi" butonuna tıklandığında
    goodBtn.addEventListener('click', function() {
        result.textContent = "Kötüye tıklayabileceğini mi sandın:D";
        result.style.color = "#4CAF50";
    });
    
    // "Kötü" butonunun kaçması için
    badBtn.addEventListener('mouseover', function() {
        // Ekran boyutlarını al
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Butonun boyutlarını al
        const btnWidth = badBtn.offsetWidth;
        const btnHeight = badBtn.offsetHeight;
        
        // Ekranın dışına çıkmaması için sınırlar belirlendi
        const maxX = windowWidth - btnWidth - 20;
        const maxY = windowHeight - btnHeight - 20;
        
        // Minimum değerler (ekranın içinde kalması için)
        const minX = 20;
        const minY = 20;
        
        // Rastgele pozisyon (ekranın içinde kalacak şekilde)
        const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
        const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
        
        // Yeni pozisyonu ayarla
        badBtn.style.position = 'fixed';
        badBtn.style.left = randomX + 'px';
        badBtn.style.top = randomY + 'px';
    });
    
    // Eğer kullanıcı bir şekilde "Kötü" butonuna tıklamayı başarırsa
    badBtn.addEventListener('click', function() {
        result.textContent = "İmkansızı başardınız!";
        result.style.color = "#f44336";
    });
}); 