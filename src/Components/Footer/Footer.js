import './css/footer.css';

function Footer() {

    let d = new Date();
    let yr = d.getFullYear();

  return (
      <footer>
          <div className="copy">
              <div className="flogo" style={{cursor: 'pointer'}} onClick={() => window.location.href = "/#/"}>YKDD</div>  
              <div>YOUNG KOH DESIGN // DIGITAL <br />a young koh project &copy; 2006 ~ {yr}</div>
            </div>
          <div className="sites">
            <a href="http://www.youngkoh.com" target="_blank" rel="noreferrer"><img style={{width: "40px"}} src={`${process.env.PUBLIC_URL}/img/logo_yk.svg`} alt="go to youngkoh.com" title="youngkoh.com" /></a>
            <a href="http://www.kpixel.com" target="_blank" rel="noreferrer"><img style={{width: "164px"}} src={`${process.env.PUBLIC_URL}/img/logo_kpixel.svg`} alt="go to kpixel.com" title="kpixel" /></a>
            <a href="http://www.uijoe.com" target="_blank" rel="noreferrer"><img style={{width: "68px"}} src={`${process.env.PUBLIC_URL}/img/logo_uijoe.svg`} alt="go to uijoe.com" title="uijoe" /></a>
          </div>
      </footer>
  );
}

export default Footer;