## choo-fullstack
Using choojs as a fullstack nodejs application with SSR support

Work in progress.

### The stack
1. Choo and tachyons as frontend
2. Express as backend
3. Fortune as database store
4. Parcel v2 for build frontend code
6. And other awesome packages (package.json#dependencies)...

Keep code small is my idea

try it on your laptop

```bash
git clone https://github.com/arisris/choo-fullstack.git

cd choo-fullstack && npm install

# Seeding some data.
node cli seed --dump --drop

# Run development server & hot reloading code between server & browser no need to restart
npm run dev

# Run production
npm run build && NODE_ENV=production node cli serve
# Run production build with bundle server
npm run build && npm run build-server && NODE_ENV=production node cli serve --prod true

```

### Todo features

1. Implement SSR (ok)
2. Auth (wip)
3. Build to vercel (wip)
4. cli helper (wip)

Thanks.