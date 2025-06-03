import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Зв'яжіться з нами</h2>
      <div className="contact-info">
        <p>
          <FaPhoneAlt className="contact-icon" />
          Телефон: +38 (099) 123-45-67
        </p>
        <p>
          <FaMapMarkerAlt className="contact-icon" />
          Адреса: вул. Піццерійна, 10, Київ
        </p>
      </div>
      <a href="tel:+380991234567" className="contact-button">
        Подзвоніть нам
      </a>
    </div>
  );
};

export default Contact;
