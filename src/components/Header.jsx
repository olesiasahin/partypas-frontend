import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const classLinks = [
    { to: "/classical", label: t("disciplines.classical.name") },
    { to: "/ballroom", label: t("disciplines.ballroom.name") },
    { to: "/stretching", label: t("disciplines.stretching.name") },
  ];

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <NavLink to="/" className="brand-link" onClick={() => setOpen(false)}>
          <Logo height={56} />
        </NavLink>

        <nav className={`main-nav ${open ? "open" : ""}`}>
          <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>
            {t("nav.home")}
          </NavLink>

          <div className="nav-dropdown">
            <NavLink to="/classical" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>
              {t("nav.classes")}
            </NavLink>
            <div className="nav-dropdown-panel">
              {classLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/programs" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>
            {t("nav.programs")}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>
            {t("nav.about")}
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>
            {t("nav.blog")}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setOpen(false)}>
            {t("nav.contact")}
          </NavLink>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <NavLink to="/book" className="header-cta" onClick={() => setOpen(false)}>
            {t("nav.cta")} →
          </NavLink>
          <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
