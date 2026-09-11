import { useState, useMemo } from "react";

const WEEKS_PER_YEAR = 52;

export default function VidaEnSemanas() {
  const [birthDate, setBirthDate] = useState("1995-01-01");
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [hoveredWeek, setHoveredWeek] = useState(null);

  const { weeksLived, totalWeeks, ageYears, ageWeeksRemainder } = useMemo(() => {
    const birth = new Date(birthDate);
    const now = new Date();
    const msLived = now - birth;
    const weeksLivedCalc = Math.floor(msLived / (1000 * 60 * 60 * 24 * 7));
    const totalWeeksCalc = lifeExpectancy * WEEKS_PER_YEAR;
    const years = Math.floor(weeksLivedCalc / WEEKS_PER_YEAR);
    const weeksRem = weeksLivedCalc % WEEKS_PER_YEAR;
    return {
      weeksLived: Math.max(0, weeksLivedCalc),
      totalWeeks: totalWeeksCalc,
      ageYears: years,
      ageWeeksRemainder: weeksRem,
    };
  }, [birthDate, lifeExpectancy]);

  const percentLived = Math.min(100, ((weeksLived / totalWeeks) * 100).toFixed(1));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f4ee",
        fontFamily: "'Iowan Old Style', 'Palatino', 'Georgia', serif",
        padding: "48px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "780px", width: "100%" }}>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 400,
            color: "#2b2620",
            marginBottom: "4px",
            letterSpacing: "0.2px",
          }}
        >
          Tu vida, en semanas
        </h1>
        <p style={{ color: "#7a7268", fontSize: "14px", marginBottom: "28px", lineHeight: 1.5 }}>
          Cada cuadro es una semana. Has vivido {weeksLived.toLocaleString("es")} de{" "}
          {totalWeeks.toLocaleString("es")} — {ageYears} años y {ageWeeksRemainder} semanas.
        </p>

        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <label style={{ fontSize: "13px", color: "#4a4438" }}>
            Fecha de nacimiento
            <br />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={{
                marginTop: "6px",
                padding: "6px 10px",
                border: "1px solid #d8d2c4",
                borderRadius: "4px",
                fontFamily: "inherit",
                fontSize: "13px",
                background: "#fff",
                color: "#2b2620",
                colorScheme: "light",
              }}
            />
          </label>
          <label style={{ fontSize: "13px", color: "#4a4438" }}>
            Expectativa de vida (años)
            <br />
            <input
              type="number"
              value={lifeExpectancy}
              min={1}
              max={120}
              onChange={(e) => setLifeExpectancy(Number(e.target.value) || 1)}
              style={{
                marginTop: "6px",
                padding: "6px 10px",
                border: "1px solid #d8d2c4",
                borderRadius: "4px",
                fontFamily: "inherit",
                fontSize: "13px",
                width: "80px",
                background: "#fff",
                color: "#2b2620",
                colorScheme: "light",
              }}
            />
          </label>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${WEEKS_PER_YEAR}, 1fr)`,
            gap: "2.5px",
            marginBottom: "8px",
          }}
        >
          {Array.from({ length: totalWeeks }).map((_, i) => {
            const isLived = i < weeksLived;
            const isHovered = hoveredWeek === i;
            const yearOfWeek = Math.floor(i / WEEKS_PER_YEAR);
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredWeek(i)}
                onMouseLeave={() => setHoveredWeek(null)}
                title={`Semana ${i + 1} (año ${yearOfWeek + 1})`}
                style={{
                  aspectRatio: "1",
                  background: isHovered
                    ? "#c1502e"
                    : isLived
                    ? "#3d3830"
                    : "#e4ded0",
                  borderRadius: "1px",
                  cursor: "pointer",
                  transition: "background 0.08s ease",
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid #e0d9c9",
          }}
        >
          <div style={{ fontSize: "13px", color: "#7a7268" }}>
            {hoveredWeek !== null
              ? `Semana ${hoveredWeek + 1} · año ${Math.floor(hoveredWeek / WEEKS_PER_YEAR) + 1}`
              : "Pasa el cursor sobre un cuadro para ver el detalle"}
          </div>
          <div style={{ fontSize: "22px", color: "#2b2620", fontWeight: 400 }}>
            {percentLived}%{" "}
            <span style={{ fontSize: "13px", color: "#a89e8c" }}>vivido</span>
          </div>
        </div>
      </div>
    </div>
  );
}