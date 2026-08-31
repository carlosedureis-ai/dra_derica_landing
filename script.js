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
            ".hero-details"
        ]);

        [".about", ".procedures", ".approach", ".credentials", ".final-cta"].forEach((section) => {
            revealWithOpacity(`${section} [data-reveal]`, section);
        });
        return;
    }

    document.documentElement.classList.add("portal-motion");

    const heroTimeline = gsap.timeline({ defaults: { ease: easeOut } });
    heroTimeline
        .from(".site-header", { autoAlpha: 0, y: -14, duration: 0.45 })
        .from(".hero-word", {
            autoAlpha: 0,
            y: 18,
            duration: 0.65
        }, 0.08)
        .from(".hero-intro", { autoAlpha: 0, x: -22, duration: 0.55 }, 0.42)
        .from(".hero-details", { autoAlpha: 0, x: 22, duration: 0.55 }, 0.47);

    gsap.set(".hero-portrait", { scale: 1.08 });
    const portalTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero--portal",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
            invalidateOnRefresh: true
        }
    });
    portalTimeline
        .to(".portal-panel--left", { xPercent: -108, ease: "none" }, 0)
        .to(".portal-panel--right", { xPercent: 108, ease: "none" }, 0)
        .to(".portal-wash", { autoAlpha: 0.24, ease: "none" }, 0)
        .to(".hero-portrait", { scale: 1, yPercent: 4, ease: "none" }, 0)
        .to(".hero-word", { scale: 1.08, letterSpacing: "-0.075em", ease: "none" }, 0)
        .to(".hero-word__left", { xPercent: -62, ease: "none" }, 0)
        .to(".hero-word__right", { xPercent: 62, ease: "none" }, 0)
        .to(".portal-dots span:first-child", { x: "-42vw", y: "-28vh", ease: "none" }, 0)
        .to(".portal-dots span:last-child", { x: "42vw", y: "28vh", ease: "none" }, 0);

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
