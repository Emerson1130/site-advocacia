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

Os arquivos `.env` são locais e não entram no repositório. Para executar o formulário de contato e o PocketBase, configure as variáveis de ambiente da hospedagem.

Antes da publicação, substitua o telefone `0000000000` exibido no rodapé. O depoimento em áudio da referência está representado por uma imagem; nenhum arquivo de áudio foi fornecido.
