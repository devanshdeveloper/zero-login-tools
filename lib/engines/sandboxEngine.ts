export type PlaygroundDoc = {
  html: string;
  css?: string;
  js?: string;
};

export function buildIframeSrcDoc(doc: PlaygroundDoc): string {
  const html = doc.html ?? "";
  const css = doc.css ?? "";
  const js = doc.js ?? "";
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      try {
        ${js}
      } catch (e) {
        const pre = document.createElement('pre');
        pre.style.color = 'crimson';
        pre.textContent = String(e && e.stack ? e.stack : e);
        document.body.appendChild(pre);
      }
    </script>
  </body>
</html>`;
}

export type JsRunnerMessage =
  | { type: "log"; level: "log" | "info" | "warn" | "error"; args: string[] }
  | { type: "done" }
  | { type: "runtime-error"; error: string };

function escapeScript(s: string): string {
  // Prevent closing the <script> tag from user code.
  return (s ?? "").replace(/<\/script/gi, "<\\/script");
}

export function buildJsRunnerSrcDoc(jsCode: string): string {
  const safe = escapeScript(jsCode ?? "");
  return `<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    <script>
      (function () {
        function toStr(x) {
          try {
            if (typeof x === 'string') return x;
            return JSON.stringify(x, null, 2);
          } catch (e) {
            return String(x);
          }
        }
        const levels = ['log','info','warn','error'];
        levels.forEach((lvl) => {
          const orig = console[lvl];
          console[lvl] = function (...args) {
            try {
              parent.postMessage({ type: 'log', level: lvl, args: args.map(toStr) }, '*');
            } catch {}
            try { orig && orig.apply(console, args); } catch {}
          };
        });
        window.addEventListener('error', (ev) => {
          try { parent.postMessage({ type: 'runtime-error', error: String(ev.error && ev.error.stack ? ev.error.stack : ev.message) }, '*'); } catch {}
        });
        window.addEventListener('unhandledrejection', (ev) => {
          try { parent.postMessage({ type: 'runtime-error', error: String(ev.reason && ev.reason.stack ? ev.reason.stack : ev.reason) }, '*'); } catch {}
        });
        try {
          ${safe}
          parent.postMessage({ type: 'done' }, '*');
        } catch (e) {
          parent.postMessage({ type: 'runtime-error', error: String(e && e.stack ? e.stack : e) }, '*');
        }
      })();
    </script>
  </body>
</html>`;
}

