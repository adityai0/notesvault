document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const hasDropdowns = document.querySelectorAll('.nav-links .has-dropdown');
    const heroSection = document.getElementById('hero-slider');
    const sliderPrevBtn = document.getElementById('slider-prev');
    const sliderNextBtn = document.getElementById('slider-next');


    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('is-active');

            hasDropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('dropdown-active')) {
                    dropdown.classList.remove('dropdown-active');
                    dropdown.querySelector('.dropdown-menu').style.display = 'none';
                }
            });
        });
    }

 const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let start = window.scrollY;
    let duration = 800;
    let startTime = null;

    function easeInQuad(t) {
      return t * t;
    }

    function scrollStep(timestamp) {
      if (!startTime) startTime = timestamp;
      let elapsed = timestamp - startTime;
      let progress = Math.min(elapsed / duration, 1);
      let easedProgress = easeInQuad(progress);

      window.scrollTo(0, start * (1 - easedProgress));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  });






    hasDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownLink && dropdownMenu) {

            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 992) {
                    dropdown.classList.add('dropdown-active');
                }
            });
            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 992) {
                    dropdown.classList.remove('dropdown-active');
                }
            });

            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('dropdown-active');
                    if (dropdown.classList.contains('dropdown-active')) {
                        dropdownMenu.style.display = 'block';
                    } else {
                        dropdownMenu.style.display = 'none';
                    }


                    hasDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown && otherDropdown.classList.contains('dropdown-active')) {
                            otherDropdown.classList.remove('dropdown-active');
                            otherDropdown.querySelector('.dropdown-menu').style.display = 'none';
                        }
                    });
                }
            });
        }
    });


    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (navLinks && mobileMenuToggle && !navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('is-active');
                }
            }
            hasDropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target) && dropdown.classList.contains('dropdown-active')) {
                    dropdown.classList.remove('dropdown-active');
                    dropdown.querySelector('.dropdown-menu').style.display = 'none';
                }
            });
        }
    });

    let currentSlide = 0;

    function updateHeroBackground() {
        heroSection.style.backgroundImage = `url('${heroBackgroundImages[currentSlide]}')`;
    }

    function showNextSlide() {
        currentSlide = (currentSlide + 1) % heroBackgroundImages.length;
        updateHeroBackground();
    }

    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + heroBackgroundImages.length) % heroBackgroundImages.length;
        updateHeroBackground();
    }


    if (heroSection) {
        updateHeroBackground();

        if (sliderNextBtn) {
            sliderNextBtn.addEventListener('click', showNextSlide);
        }
        if (sliderPrevBtn) {
            sliderPrevBtn.addEventListener('click', showPrevSlide);
        }


    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });


                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('is-active');
                }
            }
        });
    });


});

document.addEventListener("scroll", () => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 100; // distance from bottom before triggering
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
});


window.addEventListener('load', () => {
    document.querySelector('.navbar').style.opacity = "0";
    document.querySelector('.navbar').style.transform = "translateY(-20px)";
    setTimeout(() => {
        document.querySelector('.navbar').style.transition = "all 0.6s ease";
        document.querySelector('.navbar').style.opacity = "1";
        document.querySelector('.navbar').style.transform = "translateY(0)";
    }, 100);
});
window.addEventListener('scroll', () => {
    document.querySelectorAll('.hero-floating-icon').forEach((icon, idx) => {
        let speed = (idx + 1) * 0.2;
        icon.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});
