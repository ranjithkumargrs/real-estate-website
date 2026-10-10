import { useState } from 'react'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import toast from 'react-hot-toast'

function Contact() {
  const [sent, setSent] = useState(false)

  const sendMessage = (event) => {
    event.preventDefault()
    setSent(true)
    toast.success('Your note is on its way. We’ll be in touch soon.')
    event.currentTarget.reset()
  }

  return (
    <section className="container contact-page">
      <span className="eyebrow">A real person, a real conversation</span>
      <h1 className="page-title">Let’s talk about home.</h1>
      <p className="section-copy">Questions, daydreams, a home you can’t stop thinking about—we’d love to hear it all.</p>
      <div className="contact-layout">
        <div className="contact-info">
          <h2>We’re here for you.</h2>
          <p>Tell us what you’re looking for. Ranjith will get back to you personally, usually within one business day.</p>
          <div className="contact-point"><div className="icon"><Phone size={16} /></div><div><strong>Give us a call</strong><a href="tel:+14155550138"><span>+1 (415) 555-0138</span></a></div></div>
          <div className="contact-point"><div className="icon"><Mail size={16} /></div><div><strong>Send us a note</strong><a href="mailto:hello@ranjithestates.com"><span>hello@ranjithestates.com</span></a></div></div>
          <div className="contact-point"><div className="icon"><MapPin size={16} /></div><div><strong>Come say hello</strong><span>2168 Market Street, San Francisco, CA</span></div></div>
          <div className="contact-point"><div className="icon"><Clock3 size={16} /></div><div><strong>When we’re around</strong><span>Monday – Saturday, 9am – 6pm</span></div></div>
        </div>
        <form className="contact-form" onSubmit={sendMessage}>
          <h2>{sent ? 'Thanks for reaching out.' : 'Send a little note'}</h2>
          <div className="contact-fields">
            <label className="field"><span>Your name</span><input name="name" autoComplete="name" required placeholder="Jane Smith" /></label>
            <label className="field"><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="jane@email.com" /></label>
            <label className="field"><span>How can we help?</span><textarea name="message" required placeholder="Tell us a little about what you’re looking for..." /></label>
          </div>
          <button className="button" style={{ marginTop: 18 }} type="submit">{sent ? 'Send another message' : 'Send your message'}</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
