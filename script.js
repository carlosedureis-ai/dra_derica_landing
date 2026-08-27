document.addEventListener("DOMContentLoaded", (event) => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Journey Line Animation
    const journeyPath = document.querySelector("#journey-line");
    
    if (journeyPath) {
        // Get the total length of the path
        const pathLength = journeyPath.getTotalLength();
        
        // Set initial state
        gsap.set(journeyPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
        
        // Animate based on scroll
        gsap.to(journeyPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1 // smooth scrubbing
            }
        });
    }

    // 2. Animação da Hero REALCE
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        // Configura o estado inicial do clip-path para a palavra
        gsap.set(".hero-display-word", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 30 });
        gsap.set(".panel-separator, .panel-item svg", { opacity: 0 });

        heroTl.fromTo(".hero-nav", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
              .to(".hero-display-word", { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0, opacity: 0.72, duration: 0.8 }, "-=0.2")
              .fromTo(".hero-center-photo", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
              .fromTo(".hero-content-left", { x: -25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.5")
              .fromTo(".hero-content-right", { x: 25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.7")
              .fromTo(".hero-bottom-panel", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
              .to(".panel-separator, .panel-item svg", { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3");
    } else {
        // Fallback no-JS/Reduced Motion
        document.querySelectorAll(".hero-animated-element").forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.clipPath = "none";
        });
    }

    // 2.5 Animação da Seção Sobre
    if (!prefersReducedMotion) {
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-editorial",
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });
        
        aboutTl.fromTo(".about-left", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
               .fromTo(".about-center", { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" }, "-=0.6")
               .fromTo(".about-right", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.4")
               .fromTo(".about-meta", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.8");
    } else {
        document.querySelectorAll(".about-animated").forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
    }

    // 3. Animação da Seção Procedimentos Bento
    if (!prefersReducedMotion) {
        const procTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".procedures-bento",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        procTl.to(".procedures-header .procedures-animated", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" })
              .to(".procedure-card--feature", { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.3")
              .to(".procedure-card--micro, .procedure-card--harmony", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4")
              .to(".procedure-card--individual", { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");
    } else {
        document.querySelectorAll(".procedures-animated").forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
    }

    // 4. Fade Up Genérico on Scroll
    const fadeUpElements = gsap.utils.toArray(".gsap-fade-up");
    fadeUpElements.forEach((el) => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 4. Stagger Animations (Pillars)
    gsap.from(".gsap-stagger", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".pillars-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // 5. Slide In Animations (Differentials)
    gsap.from(".gsap-slide-in", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".differentials-grid",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});
