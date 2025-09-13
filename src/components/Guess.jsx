export default function Guess() {
  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "2rem",   
        marginTop: "20px",
        marginBottom: "40px",
      }}
    >
      <img
        src="/GuessSong.png"
        alt="Guess the Song"
        style={{
          width: "27rem",   
          maxWidth: "90%",
        }}
      />
    </header>
  );
}
