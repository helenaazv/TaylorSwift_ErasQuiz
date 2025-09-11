export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "2rem",   
        marginTop: "20px",
      }}
    >
      <img
        src="/title.png"
        alt="Taylor Swift The Eras Song Quiz"
        style={{
          width: "30rem",   
          maxWidth: "90%",
        }}
      />
    </header>
  );
}
