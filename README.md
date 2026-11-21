# Site Dra. Elisiane Romualdo

Landing page em React Router, Vite e PocketBase, baseada na referência visual enviada pela cliente. As imagens usadas pela página estão em `apps/web/public/reference`.

## Desenvolvimento

Use Node.js 22.22 ou superior. Na raiz do projeto:

```bash
npm install
npm run build
npm run typecheck
npm run lint
```

Para rodar o site com o formulário em ambiente Linux, baixe o [PocketBase](https://pocketbase.io/docs/) na versão indicada em `apps/pocketbase/.pocketbase-version` e coloque o executável em `apps/pocketbase/pocketbase`. Crie `apps/pocketbase/.env` com `PB_ENCRYPTION_KEY` (32 caracteres), `PB_SUPERUSER_EMAIL` e `PB_SUPERUSER_PASSWORD`.

Em dois terminais, execute:

```bash
cd apps/pocketbase
set -a; . ./.env; set +a
./pocketbase serve --http=127.0.0.1:8090 --encryptionEnv=PB_ENCRYPTION_KEY --hooksWatch=false
```

```bash
cd apps/web
NODE_ENV=development node --conditions=development --env-file-if-exists=.env server.ts
```

Abra `http://localhost:3000`. Os arquivos `.env`, o executável do PocketBase e o banco local não entram no repositório.

Antes da publicação, substitua o telefone `0000000000` exibido no rodapé. O depoimento em áudio da referência está representado por uma imagem; nenhum arquivo de áudio foi fornecido.
