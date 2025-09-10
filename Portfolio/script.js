// Portfolio Website JavaScript

$(document).ready(function() {
    
    // Smooth scrolling for navigation links
    $('.smooth-scroll, .navbar-nav a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 70
            }, 800, 'swing');
        }
    });
    
    // Active navigation highlighting
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('.navbar-nav a[href^="#"]').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if (refElement.length) {
                if (refElement.position().top <= scrollPos && 
                    refElement.position().top + refElement.height() > scrollPos) {
                    $('.navbar-nav a').removeClass('active');
                    currLink.addClass('active');
                } else {
                    currLink.removeClass('active');
                }
            }
        });
    });
    
    // Contact form handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        var name = $(this).find('input[type="text"]').first().val();
        var email = $(this).find('input[type="email"]').val();
        var subject = $(this).find('input[type="text"]').last().val();
        var message = $(this).find('textarea').val();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all fields.', 'danger');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address.', 'danger');
            return;
        }
        
        // Show success message
        showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
    
    // Typing effect for hero section
    const typingText = "Aspiring Fullstack Developer";
    const typingElement = $('.hero-lead');
    let i = 0;
    
    function typeWriter() {
        if (i < typingText.length) {
            typingElement.text(typingText.substring(0, i + 1));
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(function() {
        typingElement.text('');
        typeWriter();
    }, 1000);
    
    // Mobile menu close on link click
    $('.navbar-nav a').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
});

// Utility functions
function showAlert(message, type) {
    var alertHtml = '<div class="alert alert-' + type + ' alert-dismissible fade show position-fixed" ' +
                   'style="top: 20px; right: 20px; z-index: 9999; max-width: 300px;" role="alert">' +
                   message +
                   '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
                   '</div>';
    
    $('body').append(alertHtml);
    
    setTimeout(function() {
        $('.alert').fadeOut(function() {
            $(this).remove();
        });
    }, 5000);
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
