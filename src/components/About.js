import React from 'react';
import './about.css';
import profileImg from '../assets/profile.jpg';
const About = () =>{
    return(
        <section>
             <div class="container">
        <div class="header">
            <h1>About Us</h1>
            
        </div>
        
        <div class="about-section ">
            <p>
                Welcome to SPARK, a comprehensive platform designed for efficient and accurate complex calculations. Whether you're a student, engineer, or researcher, our tool enables you to perform multiple iterations of the same equations effortlessly. With user-friendly interfaces and advanced features, we make complex computations accessible and straightforward
            </p>
        </div>

        <div class="developer-section">
            <div class="developer-photo">
                <img src={profileImg} alt="Vyshnav S"/>
            </div>
            <div class="developer-info">
                <p>
                    by,
                </p>
                <h2>Vyshnav S</h2>
                <p>
                    
                </p>
            </div>
        </div>

        <div class="contact-section">
            <h3>Contact Us</h3>
            <div class="contact-icons">
                <a href="mailto:youremail@example.com" title="Email">
                    <i class="fas fa-envelope"></i>
                </a>
                <a href="https://www.instagram.com/yourprofile" title="Instagram" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/yourwhatsapplink" title="WhatsApp" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2024 Vyshnav S. All rights reserved.</p>
    </div>
        </section>
    )
}
export default About;