export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "2rem",   
        paddingBottom: "1.5rem", 
      }}
    >
      <img
        src="/title.png"
        alt="Taylor Swift The Eras Song Quiz"
        style={{
          width: "26rem",   
          maxWidth: "90%",
        }}
      />
    </header>
  );
}
