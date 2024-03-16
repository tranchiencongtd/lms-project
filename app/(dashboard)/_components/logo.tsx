import Image from "next/image";

export const Logo = () => {
  return (
    <>
    <a href="/" style={{
          transition: "all 0s ease",
        }}>
      <Image height={200} width={350} alt="logo" src="/8.svg" />
    </a>
      {/* <a
        href="/"
        style={{
          color: "#050505",
          transition: "all 0s ease",
          fontFamily: "Roboto",
        }}
      >
        congtcdev
      </a> */}
    </>
  );
};
