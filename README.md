# Site Dra. Elisiane Romualdo

Landing page em React Router, Vite, Express e PocketBase. O conteúdo principal tem largura máxima de 1140 px e versão para celular. As imagens usadas pelo site estão em `apps/web/public/reference`; os arquivos originais recebidos foram preservados ali com nomes descritivos. O [PDF atualizado](docs/referencias/LANDING%20PAGE%20VERMELHA-1.pdf), o [JPG atualizado](docs/referencias/LANDING%20PAGE%20VERMELHA%281%29.jpg) e as referências anteriores também estão no repositório para consulta.

## Hospedagem necessária

**Para publicar o site completo na Hostinger, use um VPS.** O projeto precisa de dois processos: Node.js para a página e PocketBase para o formulário. Também usa a rota WebSocket `/ws`. O Web App gerenciado da Hostinger aceita aplicações Node.js, mas [não permite serviços adicionais, portas próprias nem WebSockets de entrada](https://www.hostinger.com/support/hostinger-node-js-limits-for-web-and-cloud-plans/). Publicar somente `dist` deixa o formulário sem backend.

O código exportado do Hostinger AI Builder/Horizons [não pode ser importado de volta no editor](https://www.hostinger.com/support/10771345-hostinger-ai-builder-agentic-mode-how-to-export-code/). Este repositório deve ser publicado como uma nova implantação no domínio.

## Requisitos no VPS

- Linux com acesso SSH e `sudo`, domínio apontado para o IP do VPS e portas 80/443 abertas.
- Node.js **22.22 ou superior**, npm, Git, Nginx, `curl`, `unzip`, `openssl` e Certbot.
- Diretório persistente para `apps/pocketbase/pb_data`, com backup periódico.

Os modelos das variáveis estão em [`apps/web/.env.example`](apps/web/.env.example) e [`apps/pocketbase/.env.example`](apps/pocketbase/.env.example). Os arquivos `.env` reais são ignorados pelo Git.

## Instalação no domínio da Hostinger (VPS)

### 1. Instalar o projeto

No SSH do VPS, entre com o usuário que executará os serviços. Os modelos pressupõem `/home/SEU_USUARIO/site-advocacia`; se usar outro diretório, altere os caminhos nos arquivos de serviço.

```bash
cd ~
git clone https://github.com/Emerson1130/site-advocacia.git
cd site-advocacia
node --version
npm ci
npm run build
```

O repositório inclui `package-lock.json` para instalação com npm. `bun.lock` veio da exportação original, mas Bun não é necessário.

### 2. Instalar o PocketBase

Use a versão registrada em `apps/pocketbase/.pocketbase-version` (atualmente **0.42.3**) e o [download oficial do PocketBase](https://pocketbase.io/docs/):

```bash
PB_VERSION=$(cat apps/pocketbase/.pocketbase-version)
case "$(uname -m)" in
  x86_64) PB_ARCH=amd64 ;;
  aarch64) PB_ARCH=arm64 ;;
  *) echo 'Arquitetura não coberta neste exemplo' >&2; exit 1 ;;
esac
curl -fL "https://ganigeorgiev.com/meta/pocketbase/pocketbase/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${PB_ARCH}.zip" -o /tmp/pocketbase.zip
unzip -j -o /tmp/pocketbase.zip pocketbase -d apps/pocketbase
chmod +x apps/pocketbase/pocketbase
```

### 3. Configurar as variáveis

```bash
cp apps/pocketbase/.env.example apps/pocketbase/.env
cp apps/web/.env.example apps/web/.env
openssl rand -hex 16
```

Edite os dois `.env`. Coloque o valor aleatório de 32 caracteres em `PB_ENCRYPTION_KEY`. Defina o mesmo `PB_SUPERUSER_EMAIL` e `PB_SUPERUSER_PASSWORD` em ambos. No arquivo `apps/web/.env`, mantenha `POCKETBASE_URL=http://127.0.0.1:8090`, `HOST=127.0.0.1` e `PORT=3000` para o Nginx deste guia.

```bash
chmod 600 apps/pocketbase/.env apps/web/.env
```

### 4. Ativar os serviços

Copie os modelos em [`deploy/hostinger-vps`](deploy/hostinger-vps). Antes de ativá-los, substitua `SEU_USUARIO` pelo usuário SSH. Confira `command -v node` e ajuste `ExecStart` no serviço web se o Node não estiver em `/usr/bin/node`.

```bash
sudo cp deploy/hostinger-vps/pocketbase.service.example /etc/systemd/system/pocketbase.service
sudo cp deploy/hostinger-vps/web.service.example /etc/systemd/system/site-advocacia.service
sudo nano /etc/systemd/system/pocketbase.service
sudo nano /etc/systemd/system/site-advocacia.service
sudo systemctl daemon-reload
sudo systemctl enable --now pocketbase.service site-advocacia.service
sudo systemctl status pocketbase.service site-advocacia.service
```

O PocketBase aplica as migrações na primeira inicialização e cria o superusuário com as credenciais configuradas. Verifique os dois serviços:

```bash
curl -f http://127.0.0.1:8090/api/health
curl -I http://127.0.0.1:3000/
```

### 5. Apontar o domínio e configurar Nginx/HTTPS

No DNS da Hostinger, configure o registro **A** do domínio (e de `www`, se usado) para o IP público do VPS. Copie o modelo Nginx, troque `SEU_DOMINIO` pelo domínio real e ative-o:

```bash
sudo cp deploy/hostinger-vps/nginx.conf.example /etc/nginx/sites-available/site-advocacia
sudo nano /etc/nginx/sites-available/site-advocacia
sudo ln -s /etc/nginx/sites-available/site-advocacia /etc/nginx/sites-enabled/site-advocacia
sudo nginx -t
sudo systemctl reload nginx
```

Se já houver configuração Nginx para esse domínio, resolva o conflito antes de ativar este arquivo. Depois que o DNS apontar para o VPS, configure HTTPS com Certbot, [conforme o guia da Hostinger](https://www.hostinger.com/support/6360129-how-to-install-ssl-on-vps-at-hostinger/):

```bash
sudo certbot --nginx -d SEU_DOMINIO -d www.SEU_DOMINIO
```

Se não usar `www`, retire `www.SEU_DOMINIO` do Nginx e do comando Certbot. Abra a página no navegador e teste a API do formulário:

```bash
curl -f https://SEU_DOMINIO/hcgi/platform/api/health
```

O Nginx encaminha `/hcgi/platform/` para o PocketBase e `/ws` para o servidor Node.js. A [documentação oficial do PocketBase](https://pocketbase.io/docs/going-to-production/) recomenda proxy reverso, HTTPS, SMTP e backup dos dados para produção.

## Atualizações e diagnóstico

Após novos commits na branch `main`:

```bash
cd ~/site-advocacia
git pull --ff-only
npm ci
npm run build
sudo systemctl restart pocketbase.service site-advocacia.service
```

Veja erros com `sudo journalctl -u pocketbase.service -u site-advocacia.service -n 100 --no-pager`. Faça backup de `apps/pocketbase/pb_data` antes de atualizar o PocketBase ou aplicar migrações. Não apague esse diretório durante o deploy.

## Desenvolvimento local

Instale as dependências com `npm ci`. Baixe o PocketBase e crie os `.env` conforme as etapas acima. Para desenvolvimento, altere `NODE_ENV=development` em `apps/web/.env`. Em dois terminais:

```bash
cd apps/pocketbase
set -a; . ./.env; set +a
./pocketbase serve --http=127.0.0.1:8090 --encryptionEnv=PB_ENCRYPTION_KEY --hooksWatch=false
```

```bash
cd apps/web
node --conditions=development --env-file=.env server.ts
```

Abra `http://127.0.0.1:3000`. Para validar o código, rode `npm run build`, `npm run typecheck` e `npm run lint` na raiz.

Os botões de consulta e o telefone no rodapé abrem o WhatsApp com uma mensagem pronta para `+55 (62) 98176-7157`. O depoimento em áudio da referência está representado por uma imagem SVG, pois nenhum arquivo de áudio foi fornecido.
