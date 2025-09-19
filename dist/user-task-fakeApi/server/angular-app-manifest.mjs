
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/task-list"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28887, hash: '0eb230d06f86249bb251ed841c311e528b0295864fe395befc81c9d3d79871e9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17061, hash: '871e634b30842ba161d1a60e1ce7a4533e09eb0828d7bda434ba4a656fe5c9bf', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 42841, hash: 'b610b3a0fabf969bd5da532ad53f74466a53880d1bc9f38812ce0b1793aa76c4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'task-list/index.html': {size: 42841, hash: 'b610b3a0fabf969bd5da532ad53f74466a53880d1bc9f38812ce0b1793aa76c4', text: () => import('./assets-chunks/task-list_index_html.mjs').then(m => m.default)},
    'styles-BIFUANOI.css': {size: 19861, hash: 'd/ucxjHS0v4', text: () => import('./assets-chunks/styles-BIFUANOI_css.mjs').then(m => m.default)}
  },
};
