# Genius Pizzaria — Mundo Genius 🍕

Landing page animada da **Genius Pizzaria Delivery** (Cidade Tiradentes — SP), recriando a arte da caixa de pizza como uma cena viva: ilha de pizza flutuante, geninhos animados, parallax com mouse/giroscópio e fundo cósmico em movimento.

**No ar:** https://geniuspizzaria.vercel.app

## Estrutura

- `index.html`, `style.css`, `main.js`, `assets/`, `vercel.json` — o site (HTML/CSS/JS estático, sem framework), na raiz do repositório.
- `Genius Pizzaria.pdf` — arte original da caixa, fonte de todos os recortes.
- `cut_*.png` — recortes com fundo transparente extraídos do PDF (ilha, geninhos voadores, fatia). Os WebP otimizados usados pelo site estão em `assets/`.

## Como os assets foram extraídos

PDF renderizado em alta resolução com PyMuPDF, elementos recortados e fundo removido com rembg (modelo `isnet-general-use`). Para refazer: criar um venv com `pymupdf pillow rembg[cpu]`.

## Deploy

Conectado ao projeto **genius** na Vercel (root directory: raiz do repositório). Push na branch `main` publica em produção automaticamente.

## Contatos do negócio

WhatsApp/telefone (11) 95229-1000 · Instagram [@genius_pizzaria](https://www.instagram.com/genius_pizzaria/) · Av. dos Metalúrgicos, nº 1541 — Cidade Tiradentes, SP
