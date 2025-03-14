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

    </div>

    <div class="footer">
        <p>&copy; 2024 Vyshnav S. All rights reserved.</p>
    </div>
        </section>
    )
}
export default About;