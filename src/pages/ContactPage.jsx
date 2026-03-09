export default function ContactPage() {
  return (
    <>
      <header>
        <h1>Contact</h1>
      </header>
      <main className="contact-container">
        <p>You have any questions? Write to us:</p>

        <section className="contact-card">
          <p>
            <strong>Email:</strong> blunt@contact.com
          </p>
          <p>
            <strong>Telefon:</strong> +45 12 34 56 78
          </p>
          <p>
            <strong>Åbningstid:</strong> Mon-Sun 09:00-16:00
          </p>
          <a className="contact-button" href="mailto:blunt@contact.com">
            Write to us
          </a>
        </section>
      </main>
    </>
  );
}
