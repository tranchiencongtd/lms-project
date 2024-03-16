import Link from "next/link";
import "./404.css";

export default function NotFound() {
  return (
    <div class="container">
      <h1>404 NOT FOUND.</h1>
      <h1>
        {" "}
        <span class="ascii">(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <Link href="/">Quay lại trang chủ</Link>
    </div>
  );
}
