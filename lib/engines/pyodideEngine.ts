export type PythonRunResult =
  | { success: true; stdout: string; resultRepr?: string; globals?: Record<string, unknown> }
  | { success: false; stdout: string; error: string };

declare global {
  interface Window {
    // Provided by pyodide.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPyodide?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __zlt_pyodide?: any;
    __zlt_pyodide_loading?: Promise<unknown>;
  }
}

async function loadScript(src: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[data-pyodide="true"]`) as HTMLScriptElement | null;
    if (existing) {
      if (window.loadPyodide) resolve();
      else existing.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.pyodide = "true";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Pyodide script"));
    document.head.appendChild(s);
  });
}

export async function loadPyodideOnce(): Promise<unknown> {
  if (window.__zlt_pyodide) return window.__zlt_pyodide;
  if (window.__zlt_pyodide_loading) return window.__zlt_pyodide_loading;

  const cdn = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
  window.__zlt_pyodide_loading = (async () => {
    await loadScript(cdn);
    if (!window.loadPyodide) throw new Error("Pyodide loader not available");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" } as any);
    window.__zlt_pyodide = pyodide;
    return pyodide;
  })();

  return window.__zlt_pyodide_loading;
}

export async function runPython(code: string): Promise<PythonRunResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pyodide: any = await loadPyodideOnce();
  const src = code ?? "";

  try {
    // Setup stdout capture, run code, then restore.
    const wrapped = `
import sys, io, json
__zlt_buf = io.StringIO()
__zlt_old_out = sys.stdout
__zlt_old_err = sys.stderr
sys.stdout = __zlt_buf
sys.stderr = __zlt_buf
__zlt_result = None
try:
    exec(${JSON.stringify(src)}, globals())
except Exception as e:
    __zlt_error = str(e)
    raise
finally:
    sys.stdout = __zlt_old_out
    sys.stderr = __zlt_old_err
`;

    pyodide.runPython(wrapped);

    const stdout = String(pyodide.runPython(`__zlt_buf.getvalue()`));
    // Best-effort: list globals that are JSON-serializable primitives.
    const globalsJson = pyodide.runPython(`
import json
def __zlt_safe(v):
    if v is None: return None
    if isinstance(v, (bool, int, float, str)): return v
    return None
__zlt_out = {}
for k, v in globals().items():
    if k.startswith("__zlt_"): 
        continue
    if k.startswith("__"): 
        continue
    sv = __zlt_safe(v)
    if sv is not None:
        __zlt_out[k] = sv
json.dumps(__zlt_out)
`);

    const globals = JSON.parse(String(globalsJson || "{}")) as Record<string, unknown>;
    return { success: true, stdout, globals };
  } catch (err: unknown) {
    let stdout = "";
    try {
      // Even on error, we may have stdout buffered.
      stdout = String(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (pyodide as any).runPython(
          `"__zlt_buf" in globals() and globals()["__zlt_buf"].getvalue() or ""`,
        ),
      );
    } catch {
      // ignore
    }
    const error = err instanceof Error ? err.message : String(err);
    return { success: false, stdout, error };
  }
}

