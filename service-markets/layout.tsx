export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            <div>
                <h1>Header</h1>
            </div>
            {children}
        </body>
      </html>
    )
  }