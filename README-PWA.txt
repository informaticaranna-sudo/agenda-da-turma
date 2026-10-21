# Agenda da Turma — arquivos PWA

Pacote de suporte PWA para:
https://informaticaranna-sudo.github.io/agenda-da-turma/

## Conteúdo
- `manifest.webmanifest`: nome, cores, escopo e ícones.
- `service-worker.js`: cache básico da estrutura do app.
- `icons/icon-192.png` e `icons/icon-512.png`: ícones musicais provisórios.
- `trecho-para-index.html.txt`: código a inserir no `index.html`.
- `README-PWA.txt`: este guia.

## Instalação no GitHub
1. Abra o repositório `agenda-da-turma`.
2. Envie `manifest.webmanifest` e `service-worker.js` para a raiz.
3. Envie os dois PNGs para uma pasta `icons`.
4. Abra o `index.html` que já existe e copie os dois trechos de `trecho-para-index.html.txt` nos locais indicados: um dentro de `<head>` e outro antes de `</body>`.
5. Não substitua o `index.html` inteiro. Preserve o código atual de login e as funções do site.
6. Faça commit na branch publicada pelo GitHub Pages e aguarde a publicação.

## Teste
- Abra o site no Chrome de computador e verifique Manifest/Service Worker em DevTools → Application.
- Android: Chrome → menu ⋮ → Instalar app ou Adicionar à tela inicial.
- iPhone: Safari → Compartilhar → Adicionar à Tela de Início.

## Observações
- Os caminhos são específicos do projeto `/agenda-da-turma/`.
- O service worker guarda o app shell e recursos locais GET; não faz o login, banco de dados, contas ou serviços externos funcionarem offline automaticamente.
- O cache não intercepta requisições de outros domínios.
- Os ícones são modelos provisórios. Se houver um logotipo oficial, substitua os PNGs mantendo dimensões e nomes.
- Se os arquivos CSS/JS existentes usarem caminhos absolutos a partir de `/`, confirme que não apontam incorretamente para a raiz do domínio.
- Ao alterar o cache, incremente `CACHE_VERSION` no `service-worker.js`.
