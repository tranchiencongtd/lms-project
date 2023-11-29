import Image from "next/image";

export const Logo = () => {
  return (
    <>
      <Image height={130} width={130} alt="logo" src="/logo.svg" />
      <a
        href="/"
        style={{
          color: "#050505",
          transition: "all 0s ease",
          fontFamily: "Roboto",
        }}
      >
        congdev
      </a>
    </>
  );
};
