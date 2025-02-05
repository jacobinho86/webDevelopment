import Link from "next/link"; //this ancher like component uses AJAX to keep the app as a one page app, no refresh from the server
import Header from "@/components/header"; //the @ is a refrence of the root of the project (check jsconfig.json where it is defined)

export default function Home() {
  return (
    <main>
      <Header />      
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">About Us</Link>
      </p>
    </main>
  );
}
