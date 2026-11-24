var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get, Header } from '@nestjs/common';
let VerificationPageController = class VerificationPageController {
    page() {
        return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vérification e-mail - CCPD</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    background: #f4f7fb;
    color: #102b48;
    min-height: 100vh;
    display: grid;
    place-items: center;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }
  main {
    background: white;
    max-width: 440px;
    width: 100%;
    padding: 32px;
    border-radius: 18px;
    box-shadow: 0 8px 30px #102b4815;
    text-align: center;
  }
  button {
    background: #102b48;
    color: white;
    border: 0;
    padding: 15px 24px;
    border-radius: 12px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
  }
  button:disabled { opacity: .6; }
  #message { margin-top: 20px; line-height: 1.6; }
</style>
</head>
<body>
<main>
  <h1>CCPD Bloc Est</h1>
  <h2>Vérification de votre e-mail</h2>
  <p>Confirmez votre adresse e-mail pour poursuivre votre inscription.</p>
  <button id="verify">Vérifier mon e-mail</button>
  <p id="message" role="status"></p>
</main>
<script>
  const button = document.getElementById('verify');
  const message = document.getElementById('message');
  const token = new URLSearchParams(location.search).get('token');

  history.replaceState(null, '', location.pathname);

  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    button.disabled = true;
    message.textContent = 'Lien de vérification invalide.';
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    message.textContent = 'Vérification en cours...';

    try {
      const response = await fetch('/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('verification');
      }

      message.textContent =
        'Votre adresse e-mail est vérifiée. Votre compte doit maintenant être approuvé par un administrateur CCPD.';
      button.hidden = true;
    } catch {
      message.textContent =
        'Vérification impossible. Le lien est peut-être expiré ou déjà utilisé.';
      button.disabled = false;
    }
  });
</script>
</body>
</html>`;
    }
};
__decorate([
    Get(),
    Header('Content-Type', 'text/html; charset=utf-8'),
    Header('Cache-Control', 'no-store'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], VerificationPageController.prototype, "page", null);
VerificationPageController = __decorate([
    Controller('verification-email')
], VerificationPageController);
export { VerificationPageController };
//# sourceMappingURL=verification-page.controller.js.map