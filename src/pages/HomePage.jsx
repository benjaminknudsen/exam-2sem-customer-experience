export default function HomePage() {
  const landingBg = `${import.meta.env.BASE_URL}landingpagebackground.png`;

  return (
    <main style={{ maxWidth: "none", margin: 0, padding: 0 }}>
      <img
        src={landingBg}
        alt="Landing page background"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          margin: 0,
          borderRadius: 0,
        }}
      />
    </main>
  );
}
