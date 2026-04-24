import { Check, Mail, User, MessageSquare, Plane } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./styles/Contact.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playClickSound } from "../utils/sound";
gsap.registerPlugin(ScrollTrigger);


type FormData = {
    name: string;
    email: string;
    message: string;
};

type TouchedFields = {
    name: boolean;
    email: boolean;
    message: boolean;
};

export default function Contact() {

const sectionRef = useRef(null);
    useEffect(() => {
        const el = sectionRef.current;
        gsap.fromTo(el,
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [touched, setTouched] = useState<TouchedFields>({
        name: false,
        email: false,
        message: false,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateName = (name: string) => name.trim().length >= 2;
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateMessage = (message: string) => message.trim().length >= 10;

    const isNameValid = validateName(form.name);
    const isEmailValid = validateEmail(form.email);
    const isMessageValid = validateMessage(form.message);
    const isFormValid = isNameValid && isEmailValid && isMessageValid;

    const getEmailError = () => {
        if (!touched.email) return "";
        if (!form.email) return "Email is required";
        if (!isEmailValid) return "Invalid email format";
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true });
        if (!isFormValid) return;
        playClickSound();
        setLoading(true);
        try {
            await emailjs.send(
                "service_portYath1",
                "template_dkr8dih",
                {
                    name: form.name,
                    email: form.email,
                    message: form.message,
                },
                "enIYXSbnbZORq8vDx",
            );
            setForm({ name: "", email: "", message: "" });
            setTouched({ name: false, email: false, message: false });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const characterCount = form.message.length;
    const isMessageNearLimit = characterCount > 450;
    const isMessageAtLimit = characterCount >= 500;

    return (
        <section ref={sectionRef} id="yath-contact" className="yath-contact page-section">
            <div className="yath-contact-bg-blob yath-contact-bg-blob-1" />
            <div className="yath-contact-bg-blob yath-contact-bg-blob-2" />
            
            <div className="yath-contact-container">
                <div className="yath-contact-form-card yath-glass-card">
                    {success ? (
                        <div className="yath-success-box">
                            <div className="yath-success-icon">
                                <Check size={40} strokeWidth={1.5} />
                            </div>
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. I'll get back to you within 24 hours 🚀</p>
                            <button 
                                className="yath-success-btn"
                                onClick={() => setSuccess(false)}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit} className="yath-contact-form" noValidate>
                            <div className="yath-form-header">
                                <Mail size={30}/>
                                <h2>Send a Mail</h2>
                                <p>Fill out the form below and I'll respond promptly.</p>
                            </div>

                            <div className="yath-input-group">
                                <div className="yath-input-icon">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="yath-name"
                                    placeholder=" "
                                    value={form.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.name && !isNameValid ? "yath-error" : ""}
                                />
                                <label htmlFor="yath-name">Full Name</label>
                                {touched.name && !isNameValid && (
                                    <span className="yath-error-message">Name must be at least 2 characters</span>
                                )}
                            </div>

                            <div className="yath-input-group">
                                <div className="yath-input-icon">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="yath-email"
                                    placeholder=" "
                                    value={form.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.email && !isEmailValid ? "yath-error" : ""}
                                />
                                <label htmlFor="yath-email">Email Address</label>
                                {touched.email && getEmailError() && (
                                    <span className="yath-error-message">{getEmailError()}</span>
                                )}
                            </div>

                            <div className="yath-input-group yath-textarea-group">
                                <div className="yath-input-icon">
                                    <MessageSquare size={18} />
                                </div>
                                <textarea
                                    name="message"
                                    id="yath-message"
                                    placeholder=" "
                                    rows={4}
                                    value={form.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    maxLength={500}
                                    className={touched.message && !isMessageValid ? "yath-error" : ""}
                                />
                                <label htmlFor="yath-message">Your Message</label>
                                <div className="yath-char-counter">
                                    <span className={isMessageAtLimit ? "yath-limit-error" : isMessageNearLimit ? "yath-limit-warning" : ""}>
                                        {characterCount}/500
                                    </span>
                                    {touched.message && !isMessageValid && (
                                        <span className="yath-error-message">Message must be at least 10 characters</span>
                                    )}
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className={`yath-submit-btn ${loading ? "yath-loading" : ""} ${!isFormValid && (touched.name || touched.email || touched.message) ? "yath-disabled" : ""}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="yath-loader"></span>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Mail size={16} className="yath-btn-icon" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="yath-contact-info yath-glass-card">
                    <div className="yath-availability-badge">
                        <span className="yath-status-dot"></span>
                        Open for Internships & Freelance
                    </div>
                    <h2>Let's Work Together</h2>
                    <p>
                        Actively learning and improving every day.<br/>
                        Currently open to internships, freelance work, and collaboration opportunities.
                        Let’s build something great together <Plane size={20}/>
                    </p>
                    
                    <div className="yath-info-stats">
                        <div className="yath-stat">
                            <span className="yath-stat-number">8+</span>
                            <span className="yath-stat-label">Projects Completed</span>
                        </div>
                    </div>

                    <div className="yath-contact-links">
                        <a 
                            href="https://github.com/Yatharth-Dubey" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="yath-social-link yath-github"
                            onClick={playClickSound}
                        >
                            <span>GitHub</span>
                            <span className="yath-link-arrow">→</span>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/yatharth-dubey-34a532316" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="yath-social-link yath-linkedin"
                            onClick={playClickSound}
                        >
                            <span>LinkedIn</span>
                            <span className="yath-link-arrow">→</span>
                        </a>
                    </div>

                    <div className="yath-contact-footer">
                        <p>📌 Based in India · Available worldwide</p>
                    </div>
                </div>
            </div>
        </section>
    );
}