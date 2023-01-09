import { LanguageSwitch } from './LanguageSwitch';
import './header.css';

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-item header-icon">
        🌐
      </div>
      <div className="header-item header-text">
        React-App
      </div>
      <div className="header-item header-language">
        <LanguageSwitch />
      </div>
    </div>
  );
};
