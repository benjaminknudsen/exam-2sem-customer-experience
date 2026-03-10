export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="contact-kicker">Customer Support</p>
        <h1>Contact Blunt</h1>
        <p>
          Need help with your order, delivery, returns, or product sizing? Our
          team is here to help you quickly.
        </p>
      </section>

      <section className="contact-grid" aria-label="Contact information">
        <article className="contact-panel">
          <h2>Get in touch</h2>
          <p>
            <strong>Email:</strong> support@blunt.com
          </p>
          <p>
            <strong>Phone:</strong> +45 12 34 56 78
          </p>
          <p>
            <strong>Opening hours:</strong> Mon-Fri 09:00-18:00
          </p>
          <a className="contact-button" href="mailto:support@blunt.com">
            Email support
          </a>
        </article>

        <article className="contact-panel">
          <h2>Delivery information</h2>
          <ul className="contact-list">
            <li>Denmark: 1-3 business days</li>
            <li>EU: 3-6 business days</li>
            <li>Orders above 499 DKK include free shipping</li>
            <li>You will receive tracking once your order is shipped</li>
          </ul>
          <p className="contact-note">
            During launches and holidays, delivery can take slightly longer.
          </p>
        </article>
      </section>

      <section className="contact-faq" aria-label="Frequently asked questions">
        <h2>Frequently asked questions</h2>

        <details>
          <summary>Can I change or cancel my order?</summary>
          <p>
            Yes, if your order has not been packed yet. Contact support as soon
            as possible and include your order number.
          </p>
        </details>

        <details>
          <summary>How do returns work?</summary>
          <p>
            You can return unused items within 14 days of delivery. The item
            must be in original condition with tags attached.
          </p>
        </details>

        <details>
          <summary>What if my package is delayed?</summary>
          <p>
            Check your tracking link first. If there is no update for more than
            48 hours, contact us and we will investigate with the carrier.
          </p>
        </details>
      </section>
    </main>
  );
}
