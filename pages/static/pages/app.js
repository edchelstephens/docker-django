(function() {
  'use strict';

  let textSwapTL,
      contentTL,
      flybyTL,
      heroTL;

  let _u = {
    d: document,
    getNode: (s) => _u.d.querySelector(s),
    getNodes: (s) => _u.d.querySelectorAll(s),
    getCssVar: (a) => getComputedStyle(document.documentElement).getPropertyValue(a),
    setCssVar: (a, b) => document.documentElement.style.setProperty(a, b),
    createEl: (t, o) => {
      let node = _u.d.createElement(t);
      o && Object.keys(o).forEach((atr, _) => {
        atr === 'textContent' ? node.textContent = Object.values(o)[_] : node.setAttribute(atr, Object.values(o)[_]);
      });
      return node;
    },
  };

  let _a = {
    init: () => {
      _a.initEls();
      _a.prepCopy();
      _a.initTimelines();
    },
    initEls: () => {
      _u.setCssVar('--nav-height', _u.getNode('nav').offsetHeight + 'px')
      setTimeout(() => {

        _u.setCssVar('--hero-big-font-height', _u.getNode('#text_anim_1').offsetHeight + 'px')
      _a.initContentTL()

      }, 500)

    },
    prepCopy: () => {
      _u.getNodes('.text-anim').forEach((copyEl, _) => {
        const fullCopy = copyEl.textContent
        copyEl.textContent = ''

        fullCopy.split(' ').forEach(((word, _) => {
          const wordOuterEl = _u.createEl('span', {
            class: 'word-outer'
          });
          const wordEl = _u.createEl('span', {
            class: 'word',
            textContent: `${word} `
          });
          word === ' ' && (wordEl.style.display = 'block');
          wordOuterEl.appendChild(wordEl);
          copyEl.appendChild(wordOuterEl);
        }));
      });
    },
    initTimelines: () => {
      contentTL = gsap.timeline({ defaults: { ease: "power4.out", delay: 0.3 } })
      heroTL = gsap.timeline({ defaults: { ease: "power4.out", delay: 0.15 } })

      gsap.registerPlugin(ScrollTrigger)
      // gsap.registerPlugin(ScrollToPlugin)

      textSwapTL = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power4.inOut"
        },
        scrollTrigger: {
          trigger: ".hero",
          start: `top top+=${_u.getNode('nav').offsetHeight - 1}`,
          scrub: 0.5,
          end: `top+=${(window.innerHeight - _u.getNode('nav').offsetHeight) / 2} top+=${_u.getNode('nav').offsetHeight - 1}`,
          pin: true,
          pinSpacing: true,
          id: "text_swap",
          anticipatePin: 1
        }
      })

      flybyTL = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power1.inOut"
        },
        scrollTrigger: {
          trigger: "#application_image",
          start: `top-=${((window.innerHeight - _u.getNode('nav').offsetHeight) / 2) + 49 } top+=${_u.getNode('nav').offsetHeight - 1}`,
          scrub: 0.75,
          toggleActions: "play none reverse reset",
          end: `center+=${_u.getNode('nav').offsetHeight * ( window.innerWidth < 768 ? 4 : 2)} top+=${_u.getNode('nav').offsetHeight - 1}`,
          id: "logos_flyby",
          onEnter: () => {
            heroTL.pause();

          },
          onLeaveBack: () => {
            heroTL.resume();
          }
        }
      })

      _a.initHeroTL()
      _a.initTextSwapTL()
      _a.initFlybyTL()

    },
    initContentTL: () => {
      contentTL.set(":where(#text_anim_1, #text_anim_2) .word", { y: (_, el) => el.offsetHeight })

      contentTL
      .addLabel("copy_1_IN")
      .to("#targetElement", 0.01, { opacity: 1, autoAlpha: 1 }, "copy_1_IN")
      .to("#text_anim_1 .word", 0.01, { opacity: 1, autoAlpha: 1 }, "copy_1_IN")
      .to("#text_anim_1 .word", 0.5, { y: 0, stagger: 0.1, ease: "back.out(1.15)" })
      .addLabel("rest_IN")
      .fromTo(".box", 0.5, { opacity: 0, y: 100, stagger: 0.5 }, { opacity: 1, y: 0 }, "-=0.25");
    },
    initHeroTL: () => {
      heroTL.set(".background-light, #hero_main", { scale: 0, opacity: 0, autoAlpha: 0, transformOrigin: "50% 50%" })
      .set("#hero_main", { rotation: 180 })


      heroTL.addLabel("hero_main_IN")
      .to("#hero_main", 0.25, { opacity: 1, autoAlpha: 1 }, "hero_main_IN")
      .to("#hero_main", 2, { scale: 1, transformOrigin: "50% 50%", rotation: 0 }, "hero_main_IN")
      .to(".background-light", 0.25, { opacity: 1, autoAlpha: 1 }, "hero_main_IN+=0.5")
      .to(".background-light", 1, { scale: window.innerWidth < 768 ? 0.4 : 1, transformOrigin: "50% 50%" }, "hero_main_IN+=0.5")
      .to("#c_1, .a-logos", 100, { rotation: -360, repeat: -1, transformOrigin: "50% 50%", svgOrigin: "425 425", ease: "none" }, "hero_main_IN+=1")
      .to(".a-logo", 100, { rotation: 360, repeat: -1, transformOrigin: "50% 50%", svgOrigin: "425 425", ease: "none" }, "hero_main_IN+=1")

      .to("#c_2", 70, { rotation: 360, repeat: -1, transformOrigin: "50% 50%", svgOrigin: "425 425", ease: "none" }, "hero_main_IN+=1")
      .to("#c_3", 50, { rotation: -360, repeat: -1, transformOrigin: "50% 50%", svgOrigin: "425 425", ease: "none" }, "hero_main_IN+=1")

    },
    initTextSwapTL: () => {
      textSwapTL.set("#text_anim_1 .word", { y: 0, opacity: 1, autoAlpha: 1 })
      .addLabel("copy_1_OUT")
      .to("#text_anim_1 .word", 0.95, { y: (_, el) => el.offsetHeight, stagger: 0.1, ease: "back.in(1.1)" }, "copy_1_OUT")
      .to("#text_anim_1 .word", 0.05, { opacity: 0, autoAlpha: 0 })

      .addLabel("copy_2_IN")
      .to("#text_anim_2 .word", 0.01, { opacity: 1, autoAlpha: 1 }, "copy_2_IN")
      .to("#text_anim_2 .word", 0.5, { y: 0, stagger: 0.1, ease: "back.out(1.15)" })



    },
    initFlybyTL: () => {
      flybyTL.set(".a-outer-logo-1", { y: 0 })

      flybyTL.addLabel("init")
      .fromTo(".a-logos-outer", { duration: 1, y: 0, scale: 1, opacity: 1, autoAlpha: 1, transformOrigin: "center center" }, { y: window.innerWidth < 768 ? 1200 : 600, opacity: 0, autoAlpha: 0, scale: 0 }, "init")
    },
  }

  window.addEventListener('load', () => {
    let t = 0;

    setTimeout(() => {
      t = Math.max(1500, window.scrollY * 1)

      console.log(t);

      window.scrollTo(0, 0);
    }, 10)

    const del = window.innerWidth < 768 ? t : 1000

    setTimeout(() => {
      _a.init()
    }, del)
  })

})();
