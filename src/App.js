import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Instagram } from 'lucide-react';
const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showNotifyMeModal, setShowNotifyMeModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false); // Başarı/Hata pop-up'ı için yeni state
  const [popupMessage, setPopupMessage] = useState(''); // Pop-up mesajı
  const [popupType, setPopupType] = useState('success'); // Pop-up tipi (success/error)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: ''
  });

  // Arka plan karavan fotoğrafları
  const backgroundImages = [
    `${process.env.PUBLIC_URL}/images/pexels-mattdvphotography-2775231.jpg`,
    
    `${process.env.PUBLIC_URL}/images/brahm-meyer-JKjGCUmJBgk-unsplash.jpg`,
    `${process.env.PUBLIC_URL}/images/rune-haugseng-rfwAeiFT4mk-unsplash.jpg`,
    `${process.env.PUBLIC_URL}/images/roadpass-rg-YHCIyays-unsplash.jpg`,
    `${process.env.PUBLIC_URL}/images/lucas-favre-pNrD2jNRk8Y-unsplash.jpg`,
    `${process.env.PUBLIC_URL}/images/hanson-lu--Avc2AiE1_Q-unsplash.jpg`
  ];

  // Otomatik kaydırma
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // API URL'ini verilen adrese göre ayarla
    const apiUrl = 'https://api.mastervango.com'; // Yeni API adresi
    
    try {
      const response = await fetch(`${apiUrl}/api/Mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', data);
      
      // Sadece HTTP 200 kodu dönüyorsa başarılı kabul et
      if (response.ok) {
        setShowNotifyMeModal(false);
        setShowStatusPopup(true);
        setPopupMessage('Cevabınız başarıyla alındı. En kısa sürede size geri dönüş yapacağız.');
        setPopupType('success');
        console.log('Success popup should be shown.');
        setFormData({ name: '', surname: '', email: '', phone: '' });
      } else {
        console.log('API response did not meet success criteria or was an error:', data);
        setShowStatusPopup(true);
        setPopupMessage(data.message || data.error || 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        setPopupType('error');
      }
    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error);
      setShowStatusPopup(true);
      setPopupMessage('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      setPopupType('error');
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image}
              alt={`Karavan ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={`${process.env.PUBLIC_URL}/images/mv.jpg`} alt="Mastervango" className="w-16 h-16 rounded-full object-cover border border-white/30 shadow-lg" />
            <span className="text-white text-2xl font-semibold">MasterVango</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setShowMissionModal(true)} className="text-white hover:text-orange-400 transition-colors text-sm">Misyonumuz</button>
            <button onClick={() => setShowFaqModal(true)} className="text-white hover:text-orange-400 transition-colors text-sm">SSS</button>
           
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-90 backdrop-blur-lg mt-2 mx-6 rounded-lg p-6">
            <div className="space-y-4">
              <button onClick={() => { setShowMissionModal(true); setIsMenuOpen(false); }} className="block text-white hover:text-orange-400 transition-colors text-sm">Misyonumuz</button>
              <button onClick={() => { setShowFaqModal(true); setIsMenuOpen(false); }} className="block text-white hover:text-orange-400 transition-colors text-sm">SSS</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative z-40 px-6 md:px-12 min-h-[78vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl mx-auto text-center mt-10">
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.1] bg-gradient-to-r from-emerald-300 via-sky-300 to-blue-500 bg-clip-text text-transparent tracking-tight">
              Karavan Tutkunlarının Buluşma Noktası
            </h1>
            {/* Underline bar */}
            <div className="mx-auto h-1.5 w-28 md:w-40 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 opacity-90"></div>

            {/* Subtitle (optional) */}
            <p className="mt-6 text-lg md:text-xl text-white font-normal leading-relaxed">Türkiye'nin en kapsamlı karavan platformu yakında sizlerle! Kiralama, satış, kamp rezervasyonu ve daha fazlası tek bir adreste!</p>

            {/* CTA Button (optional) */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
              <a href="https://www.instagram.com/mastervangotr/?igsh=NWoxaDh0MXByOWU4&utm_source=qr" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-5 rounded-xl text-xl font-bold shadow hover:shadow-md transition-all whitespace-nowrap">
                Instagramdan takip Et
              </a>
              <button onClick={() => setShowNotifyMeModal(true)} className="inline-block bg-gradient-to-r from-emerald-500 to-sky-600 text-white px-10 py-5 rounded-xl text-xl font-bold shadow hover:shadow-md transition-all whitespace-nowrap">
                İletişime Geç
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Social Media Sidebar */}
      <div className="fixed left-6 bottom-6 z-50 flex flex-col space-y-3">
        <a href="https://www.instagram.com/mastervangotr/?igsh=NWoxaDh0MXByOWU4&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg grid place-items-center hover:scale-110 transition-transform">
          <Instagram className="text-white" size={18} />
        </a>
      </div>

      {/* Services Preview - Removed */}
      {/* <div className="hidden lg:block absolute bottom-8 right-8 z-50">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-white text-lg font-medium mb-4">Hizmetlerimiz</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-white text-sm">
              <Truck size={16} className="text-orange-400" />
              <span>Karavan Kiralama</span>
            </div>
            <div className="flex items-center space-x-3 text-white text-sm">
              <ShoppingBag size={16} className="text-orange-400" />
              <span>Karavan Satışı</span>
            </div>
            <div className="flex items-center space-x-3 text-white text-sm">
              <MapPin size={16} className="text-orange-400" />
              <span>Kamp Malzemeleri</span>
            </div>
            <div className="flex items-center space-x-3 text-white text-sm">
              <Calendar size={16} className="text-orange-400" />
              <span>Tesis Rezervasyonu</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      <style>{`
        html { scroll-behavior: smooth; }
        * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      `}</style>

      {/* Mission Modal */}
      {showMissionModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[999] px-4 py-8 transition-opacity duration-300 ease-in-out">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 max-w-2xl w-full max-h-full overflow-y-auto relative shadow-2xl border-2 border-slate-200">
            <button onClick={() => setShowMissionModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"><X size={24} /></button>
            <h2 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">Misyon & Vizyon</h2>
            <div className="space-y-4 text-gray-800">
              <div>
                <h3 className="text-lg font-extrabold mb-2">Misyon</h3>
                <p className="text-sm leading-relaxed">
                  “Mastervango olarak, karavan tutkunlarını ve sektör profesyonellerini tek bir çatı altında buluşturan, güvenilir, yenilikçi ve kullanıcı dostu bir platform sunuyoruz. Kiralama, satış, hizmet, rezervasyon ve sosyal etkileşim alanlarında en doğru bilgiyi, en kolay erişimle sağlayarak karavan kültürünü yaygınlaştırmayı ve sektörü güçlendirmeyi amaçlıyoruz.”
                </p>
              </div>
              <div>
                <h3 className="text-lg font-extrabold mb-2">Vizyon</h3>
                <p className="text-sm leading-relaxed">
                  “Karavan ve açık hava yaşamında Türkiye’nin en kapsamlı dijital buluşma noktası olmak; sektördeki tüm paydaşlar için yenilikçi çözümler, yüksek hizmet standartları ve uluslararası erişim sağlayarak Mastervango’yu global bir marka haline getirmek.”
                </p>
              </div>
              <div>
                <h3 className="text-lg font-extrabold mb-2">Temel Değerlerimiz</h3>
                <ol className="space-y-2 text-sm list-decimal pl-5">
                  <li><span className="font-bold">Güvenilirlik</span> – Tüm kullanıcılarımıza şeffaf, doğrulanmış ve güvenli hizmet sunar.</li>
                  <li><span className="font-bold">Yenilikçilik</span> – Teknolojiyi ve sektörel yenilikleri takip ederek sürekli gelişim sağlarız.</li>
                  <li><span className="font-bold">Topluluk Ruhu</span> – Karavan severleri, profesyonelleri ve hizmet sağlayıcıları bir araya getiririz.</li>
                  <li><span className="font-bold">Kolay Erişim</span> – Aradığınız hizmete ve bilgiye en kısa yoldan ulaşmanızı sağlarız.</li>
                  <li><span className="font-bold">Sürdürülebilirlik</span> – Doğa dostu çözümlerle karavan yaşamının geleceğini koruruz.</li>
                  <li><span className="font-bold">Müşteri Memnuniyeti</span> – Kullanıcı odaklı yaklaşımımızla her zaman en iyi deneyimi sunarız.</li>
                  <li><span className="font-bold">Şeffaflık</span> – Tüm işlemlerde açık, net ve anlaşılır süreçler uygularız.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[999] px-4 py-8 transition-opacity duration-300 ease-in-out">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 max-w-3xl w-full max-h-full overflow-y-auto relative shadow-2xl border-2 border-slate-200">
            <button onClick={() => setShowFaqModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"><X size={24} /></button>
            <h2 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">Sıkça Sorulan Sorular (SSS)</h2>
            <div className="space-y-4 text-gray-800">
              <div>
                <h3 className="text-lg font-extrabold mb-2">1. Genel Sorular</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">S1:</span> Mastervango nedir?</p>
                  <p><span className="font-semibold">C1:</span> Mastervango; karavan kiralama, satış, hizmet, kamp ve karavan aksesuarları e-ticareti, tesis rezervasyonları, sigorta, yol yardım gibi birçok hizmeti tek platformda toplayan dijital bir pazar yeridir.</p>
                  <p><span className="font-bold">S2:</span> Mastervango’ya nasıl üye olabilirim?</p>
                  <p><span className="font-semibold">C2:</span> Web sitemizden veya mobil uygulamamızdan “Üye Ol” butonuna tıklayarak kişisel bilgilerinizi girip üyelik işlemlerinizi tamamlayabilirsiniz.</p>
                  <p><span className="font-bold">S3:</span> Üyelik ücretli mi?</p>
                  <p><span className="font-semibold">C3:</span> Bireysel üyelik ücretsizdir. Kurumsal üyelik paketleri, ek hizmetler ve reklam seçenekleri ücretlidir.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold mb-2">2. Kiralama & Satış</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">S4:</span> Karavan kiralama süreci nasıl işler?</p>
                  <p><span className="font-semibold">C4:</span> İlgilendiğiniz ilanı seçip talep formunu doldurduktan sonra kiralama şirketi sizinle iletişime geçer. Anlaşma sağlandığında ödeme ve teslim işlemleri yapılır.</p>
                  <p><span className="font-bold">S5:</span> Satılık karavan ilanı nasıl verebilirim?</p>
                  <p><span className="font-semibold">C5:</span> Üye olduktan sonra “İlan Ver” bölümünden araç bilgilerinizi, fotoğraflarınızı ve fiyatınızı ekleyerek ilanınızı yayınlayabilirsiniz.</p>
                  <p><span className="font-bold">S6:</span> Kiralama ücretleri kim belirliyor?</p>
                  <p><span className="font-semibold">C6:</span> Kiralama ücretleri tamamen ilan sahibine aittir. Mastervango yalnızca komisyon üzerinden gelir elde eder.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold mb-2">3. Hizmet ve E-Ticaret</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">S7:</span> Karavan aksesuarları ve kamp ürünleri nasıl satılır?</p>
                  <p><span className="font-semibold">C7:</span> Kurumsal satıcı olarak kayıt olup ürünlerinizi sisteme ekleyerek satış yapabilirsiniz.</p>
                  <p><span className="font-bold">S8:</span> Karavan hizmet ilanları nelerdir?</p>
                  <p><span className="font-semibold">C8:</span> Karavan bakım, onarım, kaplama, iç dizayn, sigorta, yol yardım gibi hizmetleri kapsayan ilanlardır.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold mb-2">4. Rezervasyon & Tesis</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">S9:</span> Karavan parkı veya kamp alanı rezervasyonu nasıl yapılır?</p>
                  <p><span className="font-semibold">C9:</span> Tesisin ilan sayfasından tarih seçip ödeme yaparak rezervasyonunuzu tamamlayabilirsiniz.</p>
                  <p><span className="font-bold">S10:</span> Tesis rezervasyon iptali mümkün mü?</p>
                  <p><span className="font-semibold">C10:</span> İptal politikaları tesis sahibine bağlıdır. İlan sayfasındaki iptal koşullarını inceleyebilirsiniz.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold mb-2">5. Güvenlik & Ödeme</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">S11:</span> Ödemeler güvenli mi?</p>
                  <p><span className="font-semibold">C11:</span> Tüm ödemeler SSL sertifikalı güvenli ödeme altyapısı üzerinden yapılır.</p>
                  <p><span className="font-bold">S12:</span> İlanlardaki bilgilerin doğruluğu nasıl kontrol ediliyor?</p>
                  <p><span className="font-semibold">C12:</span> Kurumsal üyeler için belge doğrulama süreci uygulanır. Bireysel ilanlar ise sistem moderasyonu ile denetlenir.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold mb-2">6. Destek</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">S13:</span> Sorun yaşarsam nasıl destek alabilirim?</p>
                  <p><span className="font-semibold">C13:</span> Web sitemizden “Destek Talebi” açabilir veya destek@mastervango.com adresine e-posta gönderebilirsiniz.</p>
                  <p><span className="font-bold">S14:</span> Mastervango ile iş ortaklığı yapabilir miyim?</p>
                  <p><span className="font-semibold">C14:</span> Evet, kiralama şirketleri, tesis sahipleri, aksesuar satıcıları ve hizmet sağlayıcılar platformumuza katılarak iş ortaklığı yapabilir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notify Me Modal */}
      {showNotifyMeModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[999] px-4 py-8 transition-opacity duration-300 ease-in-out">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 max-w-md w-full max-h-full overflow-y-auto relative shadow-2xl border-2 border-slate-200">
            <button onClick={() => setShowNotifyMeModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"><X size={24} /></button>
            <h2 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">Beni Haberdar Et</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Adınız</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Soyadınız</label>
                <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresiniz</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon Numaranız</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Gönder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Status Popup */}
      {showStatusPopup && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[999] px-4 py-8 transition-opacity duration-300 ease-in-out">
          <div className={`bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 max-w-sm w-full relative shadow-2xl border-2 border-slate-200 text-center ${popupType === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <button onClick={() => setShowStatusPopup(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"><X size={24} /></button>
            <div className={`text-${popupType}-600 mb-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {popupType === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                )}
              </svg>
            </div>
            <h2 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">{popupType === 'success' ? 'Başarılı!' : 'Hata!'}</h2>
            <p className="text-gray-700 mb-6">{popupMessage}</p>
            <button onClick={() => setShowStatusPopup(false)} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
