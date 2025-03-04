document.addEventListener('DOMContentLoaded', function() {
    const goodBtn = document.getElementById('good-btn');
    const badBtn = document.getElementById('bad-btn');
    const result = document.getElementById('result');
    
    // "İyi" butonuna tıklandığında
    goodBtn.addEventListener('click', function() {
        result.textContent = "Kötüye tıklayabileceğini mi sandın:D";
        result.style.color = "#4CAF50";
    });
    
    // Butonun son pozisyonunu takip etmek için değişkenler
    let lastX = 0;
    let lastY = 0;
    
    // "Kötü" butonunun kaçması için
    badBtn.addEventListener('mouseover', moveButton);
    badBtn.addEventListener('touchstart', moveButton); // Dokunmatik ekranlar için
    
    // Buton hareket fonksiyonu
    function moveButton(e) {
        // Dokunma olayını engelle
        if (e.type === 'touchstart') {
            e.preventDefault();
        }
        
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
        let randomX, randomY;
        
        // Son pozisyondan yeterince uzak bir nokta bul
        do {
            randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
            randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
            
            // Son pozisyondan uzaklığı hesapla
            const distance = Math.sqrt(
                Math.pow(randomX - lastX, 2) + 
                Math.pow(randomY - lastY, 2)
            );
            
            // Eğer yeterince uzaksa döngüden çık
            if (distance > 200 || (lastX === 0 && lastY === 0)) {
                break;
            }
        } while (true);
        
        // Son pozisyonu güncelle
        lastX = randomX;
        lastY = randomY;
        
        // Yeni pozisyonu ayarla
        badBtn.style.position = 'fixed';
        badBtn.style.left = randomX + 'px';
        badBtn.style.top = randomY + 'px';
        
        // Butonun hızlı hareket etmesi için transition ekle
        badBtn.style.transition = 'left 0.1s, top 0.1s';
    }
    
    // Mobil cihazlar için ekstra kaçma davranışı
    let moveInterval;
    
    badBtn.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Sayfanın kaydırılmasını engelle
        
        // Eğer interval zaten çalışmıyorsa başlat
        if (!moveInterval) {
            moveInterval = setInterval(moveButton, 300); // Her 300ms'de bir hareket et
        }
    });
    
    // Dokunma bittiğinde interval'i temizle
    badBtn.addEventListener('touchend', function() {
        clearInterval(moveInterval);
        moveInterval = null;
    });
    
    // Eğer kullanıcı bir şekilde "Kötü" butonuna tıklamayı başarırsa
    badBtn.addEventListener('click', function() {
        result.textContent = "İmkansızı başardınız!";
        result.style.color = "#f44336";
        
        // Interval'i temizle
        clearInterval(moveInterval);
        moveInterval = null;
    });
}); 
