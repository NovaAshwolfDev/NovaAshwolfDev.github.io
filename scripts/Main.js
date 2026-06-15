import { JSONC } from './NovasTools.js';

const jsoncLoader = new JSONC();

async function loadJsonc(url) {
    return await jsoncLoader.loadJsonc(url);
}

const CONFIG_URL = 'https://raw.githubusercontent.com/NovaAshwolfDev/Secret-Repo/refs/heads/main/image-config.jsonc';

function setDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.innerText = new Date().getFullYear();
}

let banners = [];
let currentIdx = 0;
let autoTimer;
let homeQuotes = [
    "I literally never sleep dude",
    "Sleep is for the weak",
    "Sleep? What the fuck is sleep?",
]

function updateCounter() {
    const el = document.getElementById('gallery-counter');
    if (el) el.textContent = `${currentIdx + 1} / ${banners.length}`;
}

function move(dir) {
    const imgs = document.querySelectorAll('.carousel-img');
    if (!imgs.length) return;
    const next = (currentIdx + dir + banners.length) % banners.length;

    imgs[currentIdx].style.transition = 'all 0.55s ease';
    imgs[currentIdx].style.left = dir > 0 ? '-100%' : '100%';

    imgs[next].style.transition = 'none';
    imgs[next].style.left = dir > 0 ? '100%' : '-100%';
    void imgs[next].offsetWidth;
    imgs[next].style.transition = 'all 0.55s ease';
    imgs[next].style.left = '0%';

    currentIdx = next;
    updateCounter();
}

function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => move(1), 6000);
}

function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
}

function randomQuote() {
    const quote = homeQuotes[Math.floor(Math.random() * homeQuotes.length)];
    document.getElementById("home-quote").textContent = `"${quote}"`;
}

function sendToPage(url) {
  window.location.href = url;
}

async function initGallery() {
    const wrap = document.querySelector('.carousel-wrap');
    const loading = document.getElementById('gallery-loading');
    const counter = document.getElementById('gallery-counter');

    if (!wrap || !loading) return;

    try {
        const data = await loadJsonc(CONFIG_URL);
        banners = data.banners || [];
        if (banners.length === 0) {
            loading.textContent = 'No images found.';
            return;
        }

        loading.remove();

        banners.forEach((b, i) => {
            const img = document.createElement('img');
            img.src = b.url;
            img.className = 'carousel-img';
            img.alt = b.title || `Gallery image ${i + 1}`;
            img.style.left = i === 0 ? '0%' : '100%';
            img.loading = 'lazy';
            wrap.appendChild(img);
        });

        updateCounter();
        startAuto();

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => { move(-1); resetAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { move(1); resetAuto(); });
    } catch (e) {
        loading.textContent = 'Could not load gallery.';
        console.error(e);
    }
}

window.showPage = function (name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    const page = document.getElementById(name);
    if (page) page.classList.add('visible');
    const activeBtn = document.querySelector(`nav button[data-page="${name}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (name === 'gallery' && !window._galleryInit) {
        window._galleryInit = true;
        initGallery();
    }
};
window.sendToPage = sendToPage;

document.addEventListener('DOMContentLoaded', () => {
    randomQuote();
    setDynamicYear();
});