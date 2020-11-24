import './css/footer.css';

function Footer() {

    let d = new Date();
    let yr = d.getFullYear();

  return (
      <footer>
          YKDD YOUNG KOH DESIGN // DIGITAL a Young Koh Project &copy; 2006 ~ {yr}
          <a href="http://www.youngkoh.com">youngkoh.com</a>
          <a href="http://www.kpixel.com">kpixel</a>
          <a href="http://www.uijoe.com">uijoe</a>
      </footer>
  );
}

export default Footer;