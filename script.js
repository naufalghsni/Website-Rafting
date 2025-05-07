document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cont
    
    // Gallery lightbox (optional)
    // You can implement a lightbox here if needed
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.activity-card, .package-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.activity-card, .package-card, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

// Booking System
document.addEventListener('DOMContentLoaded', function() {
    const bookingButtons = document.querySelectorAll('.booking-btn');
    const modal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const packagePrice = this.getAttribute('data-price');
            
            document.getElementById('modalPackageName').textContent = packageName;
            document.getElementById('selectedPackage').value = packageName;
            document.getElementById('packagePrice').value = packagePrice;
            
            modal.style.display = 'block';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('bookingName').value;
        const phone = document.getElementById('bookingPhone').value;
        const date = document.getElementById('bookingDate').value;
        const participants = document.getElementById('bookingParticipants').value;
        const notes = document.getElementById('bookingNotes').value;
        const packageName = document.getElementById('selectedPackage').value;
        const packagePrice = document.getElementById('packagePrice').value;
        
        const totalPrice = parseInt(packagePrice) * parseInt(participants);
        
        let whatsappMessage = `*BOOKING RAFTING - ${packageName}*\n\n`;
        whatsappMessage += `Nama: *${name}*\n`;
        whatsappMessage += `WhatsApp: *${phone}*\n`;
        whatsappMessage += `Tanggal: *${date}*\n`;
        whatsappMessage += `Jumlah Peserta: *${participants} orang*\n`;
        whatsappMessage += `Total Harga: *Rp ${totalPrice.toLocaleString('id-ID')}*\n\n`;
        whatsappMessage += `Catatan Tambahan:\n${notes || '-'}\n\n`;
        whatsappMessage += `_Saya sudah mengisi form booking di website dan ingin konfirmasi ketersediaan untuk tanggal tersebut._`;
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/6281281162160?text=${encodedMessage}`, '_blank');
        
        modal.style.display = 'none';
        bookingForm.reset();
    });
    
    // Set minimum date to tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const yyyy = tomorrow.getFullYear();
    
    document.getElementById('bookingDate').min = `${yyyy}-${mm}-${dd}`;
});