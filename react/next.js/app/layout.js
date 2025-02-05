import './globals.css'

//this is a reserved NEXT.JS name, it should contain an object with the meta data that'll be applied to every page covered by this layout
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

//this component defines the main html skeleton of the web site
//the 'children' prop is the content of the currently active page
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
