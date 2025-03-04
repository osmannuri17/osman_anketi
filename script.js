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
    
    // Dokunma başladığında bile kaçması için
    badBtn.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Dokunma olayını engelle
        
        // Hızlı hareket için birkaç kez çağır
        moveButton(e);
        setTimeout(() => moveButton(e), 50);
        setTimeout(() => moveButton(e), 100);
        
        // Sürekli hareket için interval başlat
        startMoveInterval(50); // Çok daha hızlı interval (50ms)
    });
    
    // Parmak yaklaştığında bile kaçması için
    document.addEventListener('touchmove', function(e) {
        // Dokunma noktasının koordinatlarını al
        const touch = e.touches[0];
        const touchX = touch.clientX;
        const touchY = touch.clientY;
        
        // Butonun pozisyonunu ve boyutlarını al
        const btnRect = badBtn.getBoundingClientRect();
        
        // Parmak butona yaklaşıyorsa (100px mesafede)
        const distance = Math.sqrt(
            Math.pow(touchX - (btnRect.left + btnRect.width/2), 2) + 
            Math.pow(touchY - (btnRect.top + btnRect.height/2), 2)
        );
        
        if (distance < 150) { // Parmak 150px yakınındaysa kaç
            moveButton(e);
        }
    });
    
    // Buton hareket fonksiyonu
    function moveButton(e) {
        // Dokunma olayını engelle
        if (e && e.type === 'touchstart') {
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
            if (distance > 250 || (lastX === 0 && lastY === 0)) {
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
        
        // Butonun çok hızlı hareket etmesi için transition ekle
        badBtn.style.transition = 'left 0.05s, top 0.05s';
        
        // Butonun boyutunu rastgele değiştir (tıklamayı zorlaştırmak için)
        const randomSize = Math.floor(Math.random() * 30) + 70; // 70% ile 100% arası
        badBtn.style.transform = `scale(${randomSize/100})`;
    }
    
    // Mobil cihazlar için ekstra kaçma davranışı
    let moveInterval;
    
    function startMoveInterval(delay) {
        // Eğer interval zaten çalışıyorsa temizle
        clearInterval(moveInterval);
        
        // Yeni interval başlat
        moveInterval = setInterval(moveButton, delay);
    }
    
    badBtn.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Sayfanın kaydırılmasını engelle
        startMoveInterval(50); // Çok daha hızlı interval
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
