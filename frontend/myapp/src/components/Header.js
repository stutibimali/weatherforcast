const Header = () => (
  <>
    <h1>🌤️ Weather App</h1>
    <p>
      Created by <strong>Stuti Bimali</strong>
    </p>
    <a
      href= {process.env.REACT_APP_ACCELERATOR_API_KEY}
      target="_blank"
      rel="noopener noreferrer"
      className="info-button" 
      style={{ 
          color: "#FFD700",      
          textDecoration: "none", 
          fontWeight: "bold"      
        }}
    >
      ℹ️ About PM Accelerator
    </a>
    <br/><br></br>
    <b>Please Select State and City</b>
  </>
);

export default Header;
