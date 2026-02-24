import * as React from "react";

export interface SocialCardProps {
  width?: number;
  height?: number;
}

export function SocialCard({ width = 1200, height = 630 }: SocialCardProps) {
  return (
    <div
      style={{
        width,
        height,
        background: "#0e0e0e",
        color: "#e6ddd0",
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner dots — ticket aesthetic */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(230,221,208,0.3)",
          }}
        />
      ))}

      {/* Decorative border */}
      <div
        style={{
          position: "absolute",
          inset: 16,
          border: "2px solid rgba(230,221,208,0.15)",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      />

      {/* Top section */}
      <div>
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "#fcd34d",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              lineHeight: 1,
            }}
          >
            🥩
          </div>
          <span
            style={{
              fontSize: 24,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(230,221,208,0.5)",
              fontFamily: "'Bebas Neue', Impact, sans-serif",
            }}
          >
            Lambchop
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 96,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: 0,
            fontWeight: 400,
          }}
        >
          Design
          <br />
          System
        </h1>
      </div>

      {/* Bottom section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { value: "24", label: "Components" },
            { value: "3", label: "Font Families" },
            { value: "9", label: "Chart Colors" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: 40,
                  letterSpacing: "0.05em",
                  color: "#fcd34d",
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(230,221,208,0.5)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Gold accent bar */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#fcd34d",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}
