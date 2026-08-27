// Fallback: If JS is available, add the class so CSS can hide elements before GSAP kicks in
document.documentElement.classList.add("js-enabled");

const SITE_CONFIG = {
    // Quando o número for obtido, coloque no formato 5511999999999
    whatsappNumber: "", 
    whatsappMessage: "Olá, Dra. Dérica! Gostaria de agendar uma avaliação."
};

document.addEventListener("DOMContentLoaded", () => {
    // Configuração Centralizada de Botões do WhatsApp
    const waButtons = document.querySelectorAll('.btn-whatsapp');
    const waFloat = document.getElementById('wa-float');
    
    if (SITE_CONFIG.whatsappNumber) {
        const encodedMsg = encodeURIComponent(SITE_CONFIG.whatsappMessage);
        const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMsg}`;
        
        waButtons.forEach(btn => {
            btn.href = waLink;
            btn.target = "_blank";
            btn.rel = "noopener noreferrer";
        });
        
        // Ativa o botão flutuante se houver número configurado
        if (waFloat) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    waFloat.classList.add('visible');
                } else {
                    waFloat.classList.remove('visible');
                }
            });
        }
    } else {
        // Fallback quando não há número: apontar para #contato e ocultar o flutuante
        console.warn("⚠️ Número de WhatsApp não configurado em SITE_CONFIG. Utilizando fallback local.");
        waButtons.forEach(btn => {
            btn.href = "#contato";
            btn.removeAttribute('target');
            btn.removeAttribute('rel');
        });
        if (waFloat) {
            waFloat.style.display = "none";
        }
    }

    // Acessibilidade: Accordion FAQ
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const isExpanded = acc.getAttribute('aria-expanded') === 'true';
            
            // Fechar os outros (opcional, manter o UX limpo)
            accordions.forEach(otherAcc => {
                otherAcc.setAttribute('aria-expanded', 'false');
            });
            
            // Alternar o atual
            acc.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Animações GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Previne animações se o usuário preferir redução de movimento
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            // 1. Golden Thread & Flower Animation
            const journeyPath = document.querySelector("#journey-line");
            const flowerGroup = document.querySelector("#svg-flower");
            
            if (journeyPath && flowerGroup) {
                const pathLength = journeyPath.getTotalLength();
                
                // Set inicial do caminho (invisível, dash array no tamanho todo)
                gsap.set(journeyPath, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength
                });

                // Animar o desenho da linha acompanhando o scroll até a seção FAQ
                gsap.to(journeyPath, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        endTrigger: "#faq",
                        end: "top center",
                        scrub: 1
                    }
                });

                // Desabrochar da flor no final da linha (seção Credenciais / Contato)
                const petals = flowerGroup.querySelectorAll(".flower-petal");
                gsap.set(petals, { opacity: 0, scale: 0, rotation: gsap.utils.wrap([0, 45, 90, 135]) });
                
                gsap.to(petals, {
                    opacity: 1,
                    scale: 1,
                    rotation: gsap.utils.wrap([15, 60, 105, 150]), // Abre as pétalas levemente
                    duration: 1.5,
                    ease: "back.out(1.7)",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: "#contato",
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            // 2. Cinematic Blur Reveals
            const fadeBlurElements = gsap.utils.toArray(".gsap-fade-blur");
            const heroElements = document.querySelectorAll("#hero .gsap-fade-blur");
            
            gsap.fromTo(heroElements, 
                { y: 40, filter: "blur(12px)", opacity: 0 },
                { y: 0, filter: "blur(0px)", opacity: 1, duration: 1.4, stagger: 0.15, ease: "expo.out", delay: 0.2 }
            );

            fadeBlurElements.forEach((el) => {
                if (el.closest('#hero')) return;
                gsap.fromTo(el,
                    { y: 60, filter: "blur(12px)", opacity: 0 },
                    {
                        y: 0, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "expo.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // 3. Differentials Sticky Stack (Desktop apenas para UX adequado)
            if (window.innerWidth > 768) {
                const stackCards = gsap.utils.toArray(".stack-card-wrapper");
                if (stackCards.length > 0) {
                    stackCards.forEach((wrapper, i) => {
                        const card = wrapper.querySelector('.stack-card');
                        ScrollTrigger.create({
                            trigger: wrapper,
                            start: "top top",
                            endTrigger: stackCards[stackCards.length - 1],
                            end: "top top",
                            pin: true,
                            pinSpacing: false
                        });

                        if (i < stackCards.length - 1) {
                            gsap.to(card, {
                                scale: 0.92, opacity: 0.4, filter: "blur(4px)", ease: "none",
                                scrollTrigger: {
                                    trigger: stackCards[i + 1],
                                    start: "top bottom", end: "top top", scrub: true
                                }
                            });
                        }
                    });
                }
            }
        }
    } else {
        // Fallback final: Se biblioteca não carregou, forçar visibilidade
        document.querySelectorAll('.gsap-fade-blur, .gsap-reveal').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'blur(0)';
        });
    }
});
