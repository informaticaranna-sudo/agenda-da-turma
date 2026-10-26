# 🌸 Agenda da Turma — instalar como app e usar um banco de dados online

Depois destes passos, **PC e celular mostram sempre os mesmos cadastros**, porque todos os dados ficam em **um único banco online** (Firebase, do Google — gratuito para uso de uma escola pequena). O app também pode ser **instalado pelo Chrome**.

Tempo estimado: 20 a 30 minutos, uma única vez. Você vai precisar de uma conta Google.

---

## Passo 1 — Criar o banco de dados online (Firebase)

1. Acesse **https://console.firebase.google.com** e entre com sua conta Google.
2. Clique em **Criar um projeto** (ou *Adicionar projeto*), dê um nome (ex.: `agenda-da-turma`). Pode desativar o Google Analytics. Clique em **Criar**.

## Passo 2 — Ativar o login por e-mail e senha

1. No menu da esquerda: **Build / Criação → Authentication → Começar**.
2. Na aba **Sign-in method (Método de login)**, clique em **E-mail/senha**, ative a primeira opção e **Salvar**.

## Passo 3 — Criar o banco de dados

1. No menu: **Build / Criação → Firestore Database → Criar banco de dados**.
2. Escolha o local **southamerica-east1 (São Paulo)**. Em modo de segurança, escolha **Iniciar no modo de produção**. Clique em **Criar**.
3. Abra a aba **Regras**, apague tudo o que estiver lá, **cole o conteúdo do arquivo `firestore.rules`** (copie do arquivo ou do quadro abaixo) e clique em **Publicar**.

<details><summary>Conteúdo das regras (clique para ver)</summary>

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function logado() { return request.auth != null; }
    function temPerfil(uid) { return exists(/databases/$(database)/documents/perfis/$(uid)); }
    function perfilDe(uid) { return get(/databases/$(database)/documents/perfis/$(uid)).data; }
    function ehProf() { return logado() && temPerfil(request.auth.uid) && perfilDe(request.auth.uid).role == 'prof'; }
    function ehDona(id) { return logado() && temPerfil(request.auth.uid) && perfilDe(request.auth.uid).role == 'aluna' && perfilDe(request.auth.uid).alunaId == id; }
    function escolaExiste() { return exists(/databases/$(database)/documents/config/escola); }

    match /config/escola {
      allow read: if true;
      allow create: if logado() && !escolaExiste();
    }

    match /perfis/{uid} {
      allow read: if logado() && (request.auth.uid == uid || ehProf());
      allow create: if ehProf() || (logado() && request.auth.uid == uid && !escolaExiste()
                        && request.resource.data.role == 'prof'
                        && request.resource.data.keys().hasOnly(['role', 'nome', 'email']));
      allow update, delete: if ehProf();
    }

    match /alunas/{id} {
      allow read: if ehProf() || ehDona(id);
      allow create, delete: if ehProf();
      allow update: if ehProf() || (ehDona(id)
                        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['crono', 'anots']));
    }
  }
}
```
</details>

Essas regras garantem que **cada aluna só vê o próprio caderno** e só pode editar cronograma e anotações; a professora vê e edita tudo.

## Passo 4 — Ligar o app ao seu banco

1. No Firebase, clique na **engrenagem ⚙️ → Configurações do projeto**.
2. Role até **Seus aplicativos** e clique no ícone **Web `</>`**. Dê um apelido (ex.: `agenda`) e clique em **Registrar app** (não precisa marcar o Hosting).
3. Vai aparecer um bloco `firebaseConfig = { apiKey: "...", ... }`. **Copie os valores** e cole no arquivo **`firebase-config.js`**, no lugar dos `COLE_AQUI` (abra com o Bloco de Notas). Salve.

## Passo 5 — Colocar o site na internet (necessário para instalar o app)

O Chrome só instala apps de sites com endereço seguro (`https`). A forma mais simples e gratuita:

1. Acesse **https://app.netlify.com/drop** (crie uma conta gratuita se pedir).
2. **Arraste a pasta inteira** `agenda-da-turma` (com `index.html`, `icons`, etc.) para a área indicada.
3. Em segundos você recebe um endereço, tipo `https://nome-aleatorio.netlify.app`. (Em *Site configuration → Change site name* dá para trocar o nome.)

> Alternativa: Firebase Hosting ou GitHub Pages também servem; os arquivos são os mesmos.

## Passo 6 — Autorizar o endereço no Firebase

1. No Firebase: **Authentication → Settings (Configurações) → Authorized domains (Domínios autorizados) → Add domain**.
2. Digite o endereço **sem** `https://` (ex.: `nome-aleatorio.netlify.app`) e salve.

## Passo 7 — Criar a conta da professora (faça isso logo!)

1. Abra o seu endereço. Na tela de login toque em **Criar conta** e cadastre a professora.
2. A **primeira conta criada vira a professora** e, depois disso, o botão "Criar conta" desaparece. Por isso faça este passo assim que publicar o site.
3. Daqui em diante, as alunas são cadastradas pela professora em **+ Cadastrar** (e-mail + senha de acesso).

## Passo 8 — Trazer os cadastros que você já tinha

Os cadastros antigos estão guardados dentro do navegador do PC onde você usava a versão antiga. Para levá-los ao banco online:

1. No **mesmo computador e navegador** da versão antiga, abra o arquivo **`exportar-cadastros.html`** e clique em **Baixar cadastros**. Será baixado `cadastros-agenda.json`.
2. No app novo, entre como professora, toque em **⬆ Importar** e escolha esse arquivo. As alunas são criadas com o **mesmo e-mail e a mesma senha de antes**.
3. Depois apague o `cadastros-agenda.json` (ele contém senhas).

> Cadastros que existiam só no celular (e não no PC) precisam ser cadastrados de novo pelo **+ Cadastrar**.

## Passo 9 — Instalar o app

- **Chrome no computador:** clique no ícone de instalar (monitor com seta) no fim da barra de endereço, ou no botão **📲 Instalar** do app.
- **Chrome no Android:** menu **⋮ → Instalar app** (ou botão **📲 Instalar**).
- **iPhone:** abra no **Safari → Compartilhar → Adicionar à Tela de Início**.

---

## Bom saber

- **Sincronização:** o que for alterado no PC aparece no celular (e vice-versa) em instantes. O app também abre sem internet mostrando o último conteúdo carregado; as alterações feitas offline são enviadas quando a conexão volta.
- **E-mail da aluna** não pode ser alterado depois de cadastrado (é o login). Se errar, exclua e cadastre de novo.
- **Esqueceu a senha?** Na tela de login há *Esqueci minha senha*. A professora também pode enviar o link na aba *Dados da Aluna*.
- **Excluir aluna** apaga o caderno e remove o acesso dela.
- **Atualizar o site:** para mudar algo no app, arraste a pasta de novo no Netlify Drop (no mesmo site).
- **Privacidade:** o arquivo `firebase-config.js` pode ficar público; quem protege os dados são o login e as regras do Passo 3.
