# 🎼 Agenda da Turma

Caderno de Estudos Musicais para professoras e alunas em um só lugar. Site estático (um único arquivo `index.html`), pronto para publicar no GitHub Pages.

## Funcionalidades

**Login**
- Entrada por e-mail e senha
- Acesso rápido à demonstração (Professora e Aluna)
- Criação de conta para professoras

**Modo Professora**
- Lista "Minhas Alunas": cadastrar, selecionar e excluir
- Edita tudo no caderno de cada aluna

**Modo Aluna**
- Vê apenas o próprio caderno
- Edita a jornada, o cronograma e as anotações
- Dados, notas e pagamentos ficam somente para leitura

**Caderno da Aluna (7 abas)**
1. **Dados da Aluna**: nome, e-mail, instrumento, nível, telefone, nascimento e início das aulas
2. **Notas**: avaliações por data e conteúdo, com média automática
3. **Cronograma de Estudo**: um campo para cada dia da semana
4. **Anotações dos Métodos**: texto livre
5. **Anotações**: recados datados entre aula e casa
6. **Calendário de Pagamento**: 12 meses e valor da mensalidade
7. **Jornada da Aprendiz**: progresso geral, "Hoje no seu ritmo", filtros e busca

**Jornada da Aprendiz**
| Categoria | Itens |
|-----------|-------|
| Fases MSA | 16 |
| Escalas | 30 |
| Hinos | 480 |
| Volume 1 | 65 |
| Volume 2 | 50 |
| Volume 3 | 35 |
| Volume 4 | 22 |

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `agenda-da-turma`).
2. Envie o `index.html` e este `README.md` para a raiz do repositório.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, e clique em **Save**.
6. Aguarde alguns minutos. O site ficará em:
   `https://SEU-USUARIO.github.io/agenda-da-turma/`

## Contas de demonstração

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Professora | `prof@musica.com` | `123456` |
| Aluna (Maria) | `maria@musica.com` | `123456` |

Os botões de acesso rápido na tela de login entram nessas contas automaticamente.

## Importante: onde os dados ficam

O GitHub Pages não tem servidor. Por isso, todos os dados (contas, alunas, notas, progresso) são salvos no **localStorage do navegador** de quem usa o site.

- Os dados **não sincronizam** entre aparelhos ou navegadores diferentes.
- Limpar os dados do navegador apaga o caderno.
- As senhas **não têm proteção real**. Não use senhas que você utiliza em outros lugares.

Para uso real com várias alunas, o próximo passo é conectar o site a um banco de dados online, como Firebase ou Supabase.

## Personalização

Tudo está em `index.html`:
- **Cores:** variáveis CSS no início do arquivo (`:root`). O site é branco e o vinho (`--wine`) aparece apenas nos botões.
- **Categorias da Jornada:** lista `CATS` no JavaScript (chave, nome, quantidade de itens e rótulo).
- **Filtros da Jornada:** objeto `GRUPOS`.
- **Dados de demonstração:** função `carregar()`.

## Tecnologias

HTML, CSS e JavaScript puros, sem dependências. Fontes Playfair Display, DM Sans e DM Mono, carregadas do Google Fonts.
