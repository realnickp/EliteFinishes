/** Stylesheet for the plain HTML ad page, inlined in <head>. Colors match src/app/globals.css. */
export const LP_CSS = `
@font-face{font-family:"DM Serif Display";src:url(/fonts/dm-serif-display-latin.woff2) format("woff2");font-display:swap;font-weight:400}
:root{--fg:oklch(0.13 0.01 30);--muted:oklch(0.96 0.003 30);--mfg:oklch(0.46 0.01 30);--border:oklch(0.91 0.004 30);--tint:#eef0ee;--bar:#17343a;--green:oklch(0.52 0.18 145);--green-dark:oklch(0.42 0.15 145)}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--fg);background:#fff;padding-bottom:76px}
h1,h2,h3{font-family:"DM Serif Display",Georgia,serif;font-weight:400;line-height:1.1;margin:0;text-wrap:balance}
h1{font-size:clamp(2rem,6vw,3.25rem)}h2{font-size:clamp(1.75rem,4.5vw,2.75rem)}h3{font-size:1.15rem}
a{color:inherit}img{max-width:100%;display:block}[hidden]{display:none!important}
.wrap{max-width:72rem;margin:0 auto;padding:0 1rem}
.sec{padding:3.5rem 0}.tint{background:var(--tint)}.muted{color:var(--mfg)}
.bar{display:block;background:var(--bar);color:#fff;text-align:center;font-size:.875rem;font-weight:600;padding:.6rem 1rem;text-decoration:none}
.bar u{margin-left:.5rem;text-underline-offset:4px}
.top{position:sticky;top:0;z-index:40;background:#fff;box-shadow:0 1px 3px rgb(0 0 0/.08)}
.flag{display:flex;height:6px}.flag i{flex:1}.flag i:first-child{background:var(--green)}.flag i:last-child{background:oklch(0.53 0.21 25)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:.75rem;height:4rem}
.brand{display:flex;align-items:center;gap:.75rem;min-width:0;line-height:1.25}.brand img{height:2.75rem;width:auto}
.brand b{display:block;font-size:.875rem}.brand span{font-size:.75rem;color:var(--mfg)}
.acts{display:flex;align-items:center;gap:.5rem}
.hbtn{display:inline-flex;align-items:center;min-height:44px;padding:0 .9rem;border-radius:.5rem;font-size:.875rem;font-weight:700;text-decoration:none;white-space:nowrap}
.hbtn-dark{background:var(--fg);color:#fff}.hbtn-out{border:1px solid var(--fg);color:var(--fg);font-weight:600}.hbtn-green{background:var(--green);color:#fff}
.sm-up,.md-up,.lg-up{display:none!important}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:52px;padding:0 1.5rem;border-radius:.5rem;font:inherit;font-weight:700;text-decoration:none;border:0;cursor:pointer}
.btn-dark{background:var(--fg);color:#fff}.btn-light{background:#fff;color:var(--fg);border:1px solid var(--border)}
.btn-outline{background:#fff;color:var(--fg);border:1px solid var(--fg)}
.btn-white{background:#fff;color:var(--fg)}.btn-ghost{color:#fff;border:1px solid rgb(255 255 255/.6)}
.btn-green{background:var(--green);color:#fff;width:100%;min-height:56px}
.btn[disabled]{opacity:.6;cursor:wait}
.hero{position:relative;isolation:isolate;overflow:hidden;background:var(--tint)}
.hero-photo{position:absolute;left:0;right:0;top:0;height:340px}
.hero-photo img{width:100%;height:100%;object-fit:cover}
.hero-shade{position:absolute;inset:0;background:linear-gradient(to top,rgb(0 0 0/.85),rgb(0 0 0/.35),rgb(0 0 0/.1))}
.hero-grid{position:relative;z-index:1;display:grid;gap:1.25rem;max-width:72rem;margin:0 auto;padding:0 1rem 2.5rem}
.hero-copy{height:284px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff}
.hero-copy .eyebrow{font-size:.875rem;font-weight:500;color:rgb(255 255 255/.85);margin:0}
.hero h1{font-size:2.5rem;line-height:1.02;margin-top:.5rem}
.hero .sub{display:none;max-width:36rem;font-size:1.125rem;color:rgb(255 255 255/.85);margin:1rem 0 0}
.hero .ticks,.hero .cta-row{display:none}
.ticks{list-style:none;padding:0;margin:1.5rem 0 0;gap:.6rem;color:rgb(255 255 255/.95)}
.ticks li{padding-left:1.6rem;position:relative}
.ticks li::before{content:"";position:absolute;left:0;top:.45rem;width:.85rem;height:.45rem;border-left:3px solid #fff;border-bottom:3px solid #fff;transform:rotate(-45deg)}
.cta-row{display:flex;gap:.75rem;flex-wrap:wrap}
.hero .cta-row{margin-top:2rem}
.talk{margin-top:1.25rem;text-align:center}.talk p{font-size:.875rem;color:var(--mfg);margin:0 0 .6rem}
.talk div{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
.card{background:#fff;border-radius:1rem;box-shadow:0 20px 60px -15px rgb(0 0 0/.35);outline:1px solid rgb(0 0 0/.1);overflow:hidden;scroll-margin-top:5rem}
.pb-head{padding:1.25rem 1.25rem 0}.pb-head div{display:flex;justify-content:space-between;align-items:baseline;gap:.75rem}
.pb-title{font-family:"DM Serif Display",Georgia,serif;font-size:1.35rem;line-height:1.15;margin:0}
.pb-step{font-size:.75rem;color:var(--mfg);white-space:nowrap;margin:0}
.prog{height:4px;background:var(--muted);border-radius:9px;margin-top:.75rem;overflow:hidden}
.prog i{display:block;height:100%;background:var(--green);border-radius:9px;transition:width .5s ease-out}
.pb-body{padding:1.25rem}
fieldset{border:0;margin:0;padding:0;min-width:0}
legend{font-weight:700;font-size:1.15rem;line-height:1.3;padding:0}
.opts{display:grid;gap:.5rem;margin-top:.9rem}
.opt{display:flex;align-items:center;gap:.75rem;min-height:52px;width:100%;padding:.6rem 1rem;border:1px solid var(--border);border-radius:.5rem;background:#fff;font:inherit;font-size:15px;font-weight:600;text-align:left;cursor:pointer;color:inherit}
.opt::before{content:"";width:1.25rem;height:1.25rem;flex:none;border:1px solid rgb(0 0 0/.25);border-radius:50%}
.opt[aria-pressed=true]{border-color:var(--green);background:oklch(0.52 0.18 145/.07);color:var(--green-dark)}
.opt[aria-pressed=true]::before{background:var(--green);border-color:var(--green);box-shadow:inset 0 0 0 3px #fff}
.pb-foot{display:flex;justify-content:space-between;align-items:center;min-height:44px;margin-top:.75rem;font-size:.75rem;color:var(--mfg)}
.back{background:none;border:0;font:inherit;color:inherit;cursor:pointer;min-height:44px;padding:0 .5rem;margin-left:-.5rem}
form h2{font-family:inherit;font-weight:700;font-size:1.3rem;line-height:1.3}
form label{display:block;font-size:.875rem;font-weight:600;margin:.85rem 0 .3rem}
form input{width:100%;min-height:48px;padding:.6rem .75rem;font:inherit;border:1px solid var(--border);border-radius:.5rem;background:#fff}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.hp{position:absolute;left:-9999px;height:0;overflow:hidden}
.err{color:#b42318;background:#fef3f2;border-radius:.5rem;font-size:.9rem;margin:1rem 0 0;padding:.75rem 1rem}.err:empty{display:none}
.fine{font-size:.75rem;color:var(--mfg);margin:.6rem 0 0}
.facts{list-style:none;padding:1.25rem 1rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem 1.25rem;font-size:.875rem;max-width:72rem;margin:0 auto}
.facts b{display:block}
.reviews{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 1rem 1rem}
.reviews figure{flex:0 0 86%;scroll-snap-align:center;margin:0;background:#fff;border:1px solid var(--border);border-radius:.5rem;padding:1.5rem}
.reviews figcaption{margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border);font-size:.875rem}
.offer{background:var(--bar);color:#fff;border-radius:.75rem;padding:2rem 1.5rem}
.offer .badge{display:inline-block;background:#fff;color:var(--bar);font-weight:700;font-size:.8rem;border-radius:999px;padding:.25rem .75rem}
.photos{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:2rem}
.photos figure{margin:0}.photos img{aspect-ratio:4/3;object-fit:cover;border-radius:.5rem;width:100%;height:auto}
.photos figcaption{font-size:.8rem;color:var(--mfg);margin-top:.35rem}
.why-img{aspect-ratio:16/10;object-fit:cover;border-radius:.5rem;width:100%;height:auto}
dl.facts2{margin:2rem 0 0;background:#fff;border:1px solid var(--border);border-radius:.5rem}
dl.facts2 div{display:flex;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border-top:1px solid var(--border)}
dl.facts2 div:first-child{border-top:0}dl.facts2 dt{color:var(--mfg)}dl.facts2 dd{margin:0;text-align:right;font-weight:600}
.why{margin:1.5rem 0 0;border-top:1px solid var(--border)}
.why div{padding:1rem 0;border-bottom:1px solid var(--border)}.why dt{font-weight:700}.why dd{margin:.2rem 0 0;color:var(--mfg)}
.steps{list-style:none;padding:0;margin:2rem 0 0;display:grid;gap:2rem}
.steps li{border-top:2px solid var(--fg);padding-top:1rem}
.steps .n{font-family:"DM Serif Display",Georgia,serif;font-size:3rem;line-height:1}
details{border-bottom:1px solid var(--border);padding:1rem 0}
summary{font-weight:700;cursor:pointer;list-style:none}summary::-webkit-details-marker{display:none}
summary::after{content:"+";float:right;font-weight:400}details[open] summary::after{content:"\\2212"}
footer{border-top:1px solid var(--border);text-align:center;font-size:.75rem;color:var(--mfg);padding:2rem 1rem 6rem}
footer p{margin:.25rem 0}footer .links{display:flex;justify-content:center;gap:1.25rem;margin-top:1rem}
.sticky{position:fixed;inset:auto 0 0 0;z-index:50;display:grid;grid-template-columns:1fr 1fr 1.4fr;gap:.5rem;padding:.6rem .75rem calc(.6rem + env(safe-area-inset-bottom));background:#fff;box-shadow:0 -2px 10px rgb(0 0 0/.1)}
.sticky .btn{min-height:46px;padding:0 .5rem;font-size:.9rem}
form textarea{width:100%;padding:.6rem .75rem;font:inherit;border:1px solid var(--border);border-radius:.5rem;background:#fff;resize:vertical}
dialog{width:calc(100% - 2rem);max-width:28rem;max-height:92dvh;overflow-y:auto;margin:auto;padding:1.5rem;border:0;border-radius:1rem;box-shadow:0 20px 60px -15px rgb(0 0 0/.5)}
dialog::backdrop{background:rgb(0 0 0/.6)}dialog h2{padding-right:2.5rem}
.x{position:absolute;top:.75rem;right:.75rem;width:44px;height:44px;border:0;border-radius:50%;background:none;font-size:1.75rem;line-height:1;color:var(--mfg);cursor:pointer}
.hero-full .hero-photo{position:relative;height:auto;aspect-ratio:1672/941}.hero-full .hero-photo img{object-position:top}.hero-full .hero-shade{display:none}
.hero-full .hero-copy{height:auto;margin:0 -1rem;padding:1.75rem 1rem;background:var(--fg)}
@media (min-width:640px){.sm-up{display:inline!important}.hero-photo{height:420px}.hero-copy{height:350px}.hero h1{font-size:3.75rem}.hero .sub{display:block}}
@media (min-width:768px){.md-up{display:inline-flex!important}.reviews{display:grid;grid-template-columns:1fr 1fr;overflow:visible;max-width:72rem;margin:0 auto}.photos{grid-template-columns:repeat(3,1fr)}.steps{grid-template-columns:repeat(3,1fr)}.facts{grid-template-columns:repeat(4,1fr)}}
@media (min-width:1024px){body{padding-bottom:0}.sticky,.talk{display:none}.lg-up{display:inline-flex!important}.top .wrap{height:5rem}.brand img{height:3.5rem}
.hero{background:var(--fg)}.hero-photo{height:100%}.hero-shade{background:linear-gradient(to right,rgb(0 0 0/.8),rgb(0 0 0/.5),rgb(0 0 0/.1))}
.hero-grid{grid-template-columns:7fr 5fr;gap:3rem;align-items:center;padding:4rem 1.5rem}.hero-copy{height:auto}.hero h1{font-size:4.5rem}
.hero .ticks{display:grid}.hero .cta-row{display:flex}
.hero-full{display:flex;align-items:center;min-height:calc(100vw*941/1672)}.hero-full .hero-photo{position:absolute;inset:0;height:100%;aspect-ratio:auto}
.hero-full .hero-shade{display:block}.hero-full .hero-grid{width:100%}.hero-full .hero-copy{margin:0;padding:0;background:none}.sec{padding:5rem 0}footer{padding-bottom:2rem}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.prog i{transition:none}}
`;
