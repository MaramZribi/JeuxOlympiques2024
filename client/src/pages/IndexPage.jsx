import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

export default function IndexPage() {
  const backgroundStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundImage: `url("https://www.musiqueurbaine.fr/wp-content/uploads/2024/01/samsung-jeux-olypic-paris-2024.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '50px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '35%', // Adjust width as needed
    marginLeft: '35px', // Add left margin
    marginRight: '35px', // Add right margin
    transition: 'transform 0.3s ease', // Animation transition
  };

  const boxHoverStyle = {
    ...boxStyle,
    transform: 'scale(1.1)', // Scale up on hover
  };

  const [hovered, setHovered] = React.useState(null);

  return (
    <div style={backgroundStyle}>
      <div
        style={hovered === 'paralympic' ? boxHoverStyle : boxStyle}
        onMouseEnter={() => setHovered('paralympic')}
        onMouseLeave={() => setHovered(null)}
      >
        <Link to="/paralympic-sites" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2>Jeux Paralympiques</h2>
            <p>Explorer les Jeux Paralympiques</p>
          </div>
        </Link>
      </div>
      <div
        style={hovered === 'olympic' ? boxHoverStyle : boxStyle}
        onMouseEnter={() => setHovered('olympic')}
        onMouseLeave={() => setHovered(null)}
      >
        <Link to="/olympic-sites" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2>Jeux Olympiques</h2>
            <p>Explorer les Jeux Olympiques</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
