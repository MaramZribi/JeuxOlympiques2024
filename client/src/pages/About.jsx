import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './TeamMembers.css'; // Import the CSS file
import maramPhoto from '../assets/missouu.png';
import sofienePhoto from '../assets/sofiene.jpeg';

export default function About() {
    const members = [
        {
            name: 'ZRIBI Maram',
            role: 'Chef du projet',
            photo: maramPhoto,
            description: "Étudiante en 2ème année ingénierie informatique à l'école nationale d'ingénieurs de Tunis",
            social: {
                facebook: 'https://www.facebook.com/maramzribi8',
                linkedin: 'https://www.linkedin.com/in/maram-zribi-bb51571b5/',

            }
        },

    ];

    return (
        <div className="team-container">
            <h1 className="team-title">Entrer en contact</h1>
            <div className="team-members">
                {members.map((member, index) => (
                    <div key={index} className="team-member">
                        <img src={member.photo} alt={member.name} className="member-photo" />
                        <h2 className="member-name">{member.name}</h2>
                        <p className="member-role">{member.role}</p>
                        <p className="member-description">{member.description}</p>
                        <div className="member-social">
                            <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaFacebook />
                            </a>
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaLinkedin />
                            </a>
                            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
