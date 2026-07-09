import { AntdRegistry } from "@ant-design/nextjs-registry";
import Sidebar from "./_components/Sidebar/sidebar.component";
import "./globals.css";

export const metadata = {
  title: "GrowEasy",
  description: "GrowEasy CRM",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <div className="mainContainer">
            <Sidebar />
            {children}
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
