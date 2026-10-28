import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { playClickSound } from "../utils/sound";
import "./styles/Contact.css";

type Fields = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "ok" | "invalid" | "error";

const EMAIL = "yatharthdubey12dec2004@gmail.com";
const MAX = 500;

export default function Contact() {
    const sectionRef = useRef(null);

    const [form, setForm] = useState<Fields>({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<Status>("idle");

    const errors: Partial<Record<keyof Fields, string>> = {};
    if (form.name.trim().length < 2) errors.name = "at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "not a valid email address";
    if (form.message.trim().length < 10) errors.message = "at least 10 characters";
    const valid = Object.keys(errors).length === 0;

    const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status === "ok" || status === "error") setStatus("idle");
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!valid) { setStatus("invalid"); return; }
        playClickSound();
        setStatus("sending");
        try {
            await emailjs.send(
                "service_portYath1",
                "template_dkr8dih",
                { name: form.name, email: form.email, message: form.message },
                "enIYXSbnbZORq8vDx",
            );
            setForm({ name: "", email: "", message: "" });
            setStatus("ok");
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const code = { idle: "", sending: "pending", ok: "201 Created", invalid: "422 Unprocessable", error: "500 Server Error" }[status];

    return (
        <section ref={sectionRef} id="yath-contact" className="yath-contact page-section">
            <div className="yath-contact-bg-blob yath-contact-bg-blob-1" />
            <div className="yath-contact-bg-blob yath-contact-bg-blob-2" />

            <div className="ct-wrap">
                <header className="ct-head">
                    <h2 data-fx="decode">Got something to build or a role to fill?</h2>
                    <p>Send me a request. I'm open to internships and full-time opportunities, and I reply within 24 hours.</p>
                </header>

                <div className="ct-grid" data-fx="stagger">
                    <form className="ct-panel ct-request" onSubmit={submit} noValidate>
                        <div className="ct-bar">
                            <span className="ct-method">POST</span>
                            <span className="ct-path">/contact</span>
                        </div>

                        <div className="ct-code">
                            <p className="ct-line">{"{"}</p>
                            <div className="ct-field">
                                <label htmlFor="ct-name" className="ct-key">"name":</label>
                                <input id="ct-name" name="name" value={form.name} onChange={change} placeholder='"Your name"' autoComplete="name" aria-invalid={status === "invalid" && !!errors.name} />
                            </div>
                            <div className="ct-field">
                                <label htmlFor="ct-email" className="ct-key">"email":</label>
                                <input id="ct-email" name="email" type="email" value={form.email} onChange={change} placeholder='"you@example.com"' autoComplete="email" aria-invalid={status === "invalid" && !!errors.email} />
                            </div>
                            <div className="ct-field ct-field--area">
                                <label htmlFor="ct-message" className="ct-key">"message":</label>
                                <textarea id="ct-message" name="message" rows={5} maxLength={MAX} value={form.message} onChange={change} placeholder='"Tell me what you have in mind"' aria-invalid={status === "invalid" && !!errors.message} />
                            </div>
                            <p className="ct-line">{"}"}<span className="ct-count">{form.message.length}/{MAX}</span></p>
                        </div>

                        <button type="submit" className="ct-send" disabled={status === "sending"}>
                            {status === "sending" ? "Sending…" : "Send request"}
                        </button>
                    </form>

                    <div className="ct-panel ct-response" aria-live="polite">
                        <div className="ct-bar">
                            <span className="ct-label">Response</span>
                            {code && <span className={`ct-code-pill ct-${status}`}>{code}</span>}
                        </div>

                        <pre className="ct-body">
                            {status === "idle" && "// your response appears here"}
                            {status === "sending" && "// waiting for the server…"}
                            {status === "ok" && `{\n  "status": "sent",\n  "reply_in": "within 24 hours"\n}`}
                            {status === "invalid" && `{\n  "errors": {\n${Object.entries(errors).map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}\n  }\n}`}
                            {status === "error" && `{\n  "error": "could not send",\n  "try": "email me directly"\n}`}
                        </pre>

                        <dl className="ct-headers">
                            <div><dt>X-Availability</dt><dd>Open to Internships &amp; Full-Time Opportunities</dd></div>
                            <div><dt>X-Email</dt><dd><a href={`mailto:${EMAIL}`} onClick={playClickSound}>{EMAIL}</a></dd></div>
                            <div><dt>X-LinkedIn</dt><dd><a href="https://www.linkedin.com/in/yatharth-dubey-34a532316" target="_blank" rel="noopener noreferrer" onClick={playClickSound}>yatharth-dubey</a></dd></div>
                            <div><dt>X-GitHub</dt><dd><a href="https://github.com/Yatharth-Dubey" target="_blank" rel="noopener noreferrer" onClick={playClickSound}>Yatharth-Dubey</a></dd></div>
                            <div><dt>X-Location</dt><dd>India</dd></div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}