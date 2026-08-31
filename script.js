document.addEventListener("DOMContentLoaded", () => {
    const year = document.querySelector("#year");
    if (year) year.textContent = new Date().getFullYear();

    const { gsap, ScrollTrigger, CustomEase } = window;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    if (CustomEase) gsap.registerPlugin(CustomEase);

    const easeOut = CustomEase
        ? CustomEase.create("dericaOut", "0.23,1,0.32,1")
        : "power3.out";
    const easeInOut = CustomEase
        ? CustomEase.create("dericaInOut", "0.77,0,0.175,1")
        : "power2.inOut";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealWithOpacity = (elements, trigger) => {
        const targets = Array.isArray(elements)
            ? elements.flatMap((selector) => gsap.utils.toArray(selector))
            : gsap.utils.toArray(elements);

        gsap.fromTo(targets, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            duration: 0.2,
            stagger: 0.03,
            ease: "none",
            clearProps: "opacity,visibility",
            scrollTrigger: trigger ? {
                trigger,
                start: "top 88%",
                once: true
            } : undefined
        });
    };

    if (reducedMotion) {
        revealWithOpacity([
            ".site-header",
            ".hero-word",
            ".hero-portrait",
            ".hero-intro",
            ".hero-details",
            ".proof-strip"
        ]);

        [".about", ".procedures", ".approach", ".credentials", ".final-cta"].forEach((section) => {
            revealWithOpacity(`${section} [data-reveal]`, section);
        });
        return;
    }

    const heroTimeline = gsap.timeline({ defaults: { ease: easeOut } });
    heroTimeline
        .from(".site-header", { autoAlpha: 0, y: -14, duration: 0.45 })
        .from(".hero-word", {
            autoAlpha: 0,
            y: 24,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.85,
            ease: easeInOut
        }, 0.08)
        .from(".hero-portrait", { autoAlpha: 0, y: 32, duration: 0.8 }, 0.22)
        .from(".hero-intro", { autoAlpha: 0, x: -22, duration: 0.55 }, 0.42)
        .from(".hero-details", { autoAlpha: 0, x: 22, duration: 0.55 }, 0.47)
        .from(".proof-strip", { autoAlpha: 0, y: 18, duration: 0.6 }, 0.55)
        .from(".proof-strip article", { autoAlpha: 0, y: 10, duration: 0.35, stagger: 0.05 }, 0.68);

    gsap.to(".hero-word", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.6
        }
    });
    gsap.to(".hero-portrait", {
        yPercent: 3,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.6
        }
    });

    const aboutTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".about", start: "top 80%", once: true }
    });
    aboutTimeline
        .from(".about-meta", { autoAlpha: 0, y: 12, duration: 0.45, ease: easeOut })
        .from(".about-heading", { autoAlpha: 0, x: -22, duration: 0.6, ease: easeOut }, 0.08)
        .from(".bottle", { autoAlpha: 0, y: 28, scale: 0.97, duration: 0.7, ease: easeOut }, 0.13)
        .from(".about-copy", { autoAlpha: 0, x: 22, duration: 0.6, ease: easeOut }, 0.2);

    const proceduresTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".procedures", start: "top 80%", once: true }
    });
    proceduresTimeline
        .from(".section-heading", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.7,
            ease: easeInOut
        })
        .from(".procedure-card", {
            autoAlpha: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.07,
            ease: easeOut
        }, 0.18);

    const approachTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".approach", start: "top 80%", once: true }
    });
    approachTimeline
        .from(".approach-intro", { autoAlpha: 0, x: -22, duration: 0.65, ease: easeOut })
        .from(".approach-steps li", {
            autoAlpha: 0,
            y: 22,
            duration: 0.55,
            stagger: 0.07,
            ease: easeOut
        }, 0.16);

    gsap.from(".credentials > *", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.07,
        ease: easeOut,
        scrollTrigger: { trigger: ".credentials", start: "top 82%", once: true }
    });

    gsap.from(".final-cta > div", {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
        ease: easeOut,
        scrollTrigger: { trigger: ".final-cta", start: "top 86%", once: true }
    });

    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
});
