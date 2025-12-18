import React from 'react';
import '../styles/about.css';

const About = () => {
    return (
        <div className="container about-page">
            <section className="brand-intro">
                <h1>About Our Service Platform</h1>
                <p>
                    We connect you with trusted, verified professionals who deliver quality home services with reliability and care.
                    Our platform ensures every service provider is thoroughly vetted, insured, and committed to excellence.
                </p>
            </section>

            <section className="mission-section">
                <h2 className="mission-title">Our Mission</h2>
                <p className="mission-text">
                    Our booking system revolutionizes how you connect with professional service providers.
                    We've created a seamless digital platform that bridges the gap between homeowners seeking
                    quality services.
                </p>
                <p className="mission-text">
                    Built with modern technology and designed with user experience in mind, our platform
                    ensures secure transactions, reliable communication, and transparent reviews.
                </p>
            </section>

            <section className="contact-section">
                <h2 style={{color: 'var(--color-dark-red)', marginBottom: '30px'}}>Contact Us</h2>
                <div className="contact-grid">
                    <div className="contact-card">
                        <div className="contact-icon">👤</div>
                        <h3>Name</h3>
                        <p>RVGR</p>
                    </div>
                    <div className="contact-card">
                        <div className="contact-icon">📱</div>
                        <h3>Mobile Number</h3>
                        <p>9363702220</p>
                    </div>
                    <div className="contact-card">
                        <div className="contact-icon">📍</div>
                        <h3>Address</h3>
                        <p>Line Medu Police Quatres<br />Salem City<br />Salem - 636006</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;