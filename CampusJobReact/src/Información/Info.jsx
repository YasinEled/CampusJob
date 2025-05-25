import React, { useState } from 'react';
import BlurText from "./blurText";
import CountUp from './countUp';
import TechModal from "./TechModal.jsx";
import './AboutUs.css';
import yasin from "../assets/yasinpfp.jpg";
import alex from "../assets/alexpfp.jpg";


const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const technologies = [
  {
    name: "React",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    link: "https://reactjs.org/",
    description: "Biblioteca JavaScript per construir interfícies d'usuari interactives."
  },
  {
    name: "JavaScript (ES6+)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    link: "https://developer.mozilla.org/ca/docs/Web/JavaScript",
    description: "Llenguatge de programació essencial per al desenvolupament web dinàmic."
  },
  {
    name: "CSS3 & Flexbox",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
    link: "https://developer.mozilla.org/ca/docs/Web/CSS",
    description: "Eina de disseny per donar estil i distribuir continguts a la web."
  },
  {
    name: "Ant Design",
    image: "https://static-00.iconduck.com/assets.00/ant-design-icon-1024x1023-73enoat8.png",
    link: "https://ant.design/",
    description: "Framework de components UI per crear interfícies netes i eficients."
  },
  {
    name: "Node.js",
    image: "https://nodejs.org/static/images/logo.svg",
    link: "https://nodejs.org/",
    description: "Entorn d'execució JavaScript per al backend basat en esdeveniments."
  },
  {
    name: "React Bits",
    image: "https://www.reactbits.dev/assets/reactbits-logo-CJ9BJbLk.svg",
    link: "https://reactbits.github.io/",
    description: "Recull de patrons i tècniques útils per React."
  },
  {
    name: "Tailwind CSS",
    image: "https://tailwindcss.com/favicons/favicon-32x32.png",
    link: "https://tailwindcss.com/",
    description: "Framework utilitari de CSS per estilitzar ràpidament components web."
  },
  {
    name: "React Routes",
    image: "https://reactrouter.com/favicon-light.png",
    link: "https://reactrouter.com/",
    description: "Biblioteca per gestionar la navegació dins d'una aplicació React."
  }
];

const AboutUs = () => {
  const [selectedTech, setSelectedTech] = useState(null);

  return (
    <div className="about-us-container">
      <div className="about-us-main">

        <BlurText
          text="Que es CampusJob"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-2xl mb-8 about-us-title "
        />

        <div className="about-us-description">
          <p>
            <strong>CampusJob</strong> és una plataforma web dirigida a estudiants i graduats que té com a objectiu{' '}
            <strong>facilitar la inserció laboral</strong> mitjançant la centralització d'ofertes de feina d'empreses de confiança.
          </p>
          <p>
            Neix de la necessitat de <strong>millorar la comunicació entre centres educatius i exalumnes</strong>, 
            permetent accedir de manera fàcil i eficient a oportunitats laborals actualitzades.
          </p>
          <p>
            A més, s'ha desenvolupat tenint molt en compte la <strong>usabilitat i l'accessibilitat</strong>, 
            per tal que qualsevol usuari la pugui utilitzar de manera intuïtiva. És un projecte creat en col·laboració amb un centre educatiu 
            i s'ha adaptat contínuament a les necessitats reals dels usuaris gràcies a la <strong>retroalimentació constant</strong> durant el seu desenvolupament.
          </p>
        </div>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Encargats Frontend</h2>
          <div className="about-us-creators">
            <div className="about-us-creator-card">
              <div className="creator-avatar-container">
                <img
                  src={yasin}
                  alt="Yasin Eled - Desarrollador Frontend"
                  className="creator-avatar"
                />
              </div>
              <div className="creator-info">
                <h3>Yasin Eled</h3>
                <p>Desarrollador Frontend</p>
              </div>
            </div>
            
            <div className="about-us-creator-card">
              <div className="creator-avatar-container">
                <img
                  src={alex}
                  alt="Alex Ruiz - Desarrollador Frontend"
                  className="creator-avatar"
                />
              </div>
              <div className="creator-info">
                <h3>Alex Ruiz</h3>
                <p>Desarrollador Frontend</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-us-section">
          <div className="about-us-stats">
            <h2 className="about-us-section-title">Estadístiques del Projecte</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <CountUp from={0} to={43} duration={2} className="stat-number" />
                <span className="stat-label">components utilitzats</span>
              </div>
              <div className="stat-item">
                <CountUp from={0} to={71} duration={5} className="stat-number" />
                <span className="stat-label">Estils aplicats</span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Tecnologies Utilitzades</h2>
          <div className="tech-grid">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="tech-item"
                onClick={() => setSelectedTech(tech)}
              >
                {tech.name}
              </div>
            ))}
          </div>

          <TechModal
            isOpen={!!selectedTech}
            onClose={() => setSelectedTech(null)}
            tech={selectedTech}
          />
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
