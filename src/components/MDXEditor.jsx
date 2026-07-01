import React, { useState, useEffect } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { MDXProvider } from "@mdx-js/react";

const codigoInicial = `# Hello, world!



<div style={{backgroundColor: '#0066ff', padding: '1rem'}}>
  MDX \`Example\`.
</div>`;

export default function VisorMDX() {
  const [codigo, setCodigo] = useState(codigoInicial);
  const [ContenidoMDX, setContenidoMDX] = useState(() => () => <p>Cargando...</p>);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;

    const compilarMDX = async () => {
      try {
        const resultado = await evaluate(codigo, {
          ...runtime,
        });

        if (montado) {
          setContenidoMDX(() => resultado.default);
          setError(null);
        }
      } catch (err) {
        if (montado) {
          setError(err.message);
        }
      }
    };

    compilarMDX();

    return () => {
      montado = false;
    };
  }, [codigo]);

  return (
    <div style={{ display: "flex", gap: "20px", height: "calc(100vh - 80px)", width: "100%", boxSizing: "border-box" }}>
      
      {/* EDITOR */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ marginTop: 0 }}>Editor MDX</h3>
        <textarea
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          spellCheck="false"
          style={{
            flex: 1,
            padding: "16px",
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontSize: "14px",
            lineHeight: "1.5",
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            border: "none",
            borderRadius: "8px",
            resize: "none",
            outline: "none",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)"
          }}
        />
      </div>

      {/* PREVIEWER */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ marginTop: 0 }}>Preview</h3>
        <div style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #333",
          borderRadius: "8px",
          backgroundColor: "#0d0d0d",
          color: "#fff",
          overflowY: "auto"
        }}>
          {error ? (
            <div style={{ color: "#ff6b6b", backgroundColor: "#2b0000", padding: "10px", borderRadius: "4px" }}>
              <strong>Error de sintaxis:</strong> {error}
            </div>
          ) : (
            <MDXProvider>
              <ContenidoMDX />
            </MDXProvider>
          )}
        </div>
      </div>

    </div>
  );
}