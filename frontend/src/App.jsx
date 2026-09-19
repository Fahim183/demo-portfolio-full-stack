import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Moon, Sun, ExternalLink, ArrowUpRight, Menu, X } from 'lucide-react';

const API = 'http://localhost:5000/api';

const fallback = {
  name: 'Fahalullah Fahim',
  title: 'Front-End Web Developer & CSE Student',
  location: 'Bangladesh',
  email: 'fahalullahfahim0108@gmail.com',
  phone: '018*********',
  about: "Hello! I'm Fahim, a passionate Front-End Web Developer dedicated to building clean, responsive, and user-friendly websites. I specialize in HTML, CSS, and JavaScript to create modern websites that work smoothly on desktops, tablets, and mobile devices.",
};

function App() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(fallback);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [form, setForm] = useState({name:'', email:'', message:''});
  const [sent, setSent] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    Promise.all([
      fetch(`${API}/profile`).then(r=>r.json()),
      fetch(`${API}/projects`).then(r=>r.json()),
      fetch(`${API}/skills`).then(r=>r.json()),
      fetch(`${API}/services`).then(r=>r.json()),
      fetch(`${API}/experience`).then(r=>r.json()),
      fetch(`${API}/education`).then(r=>r.json())
    ]).then(([p,pr,s,se,e,ed]) => {
      if (p && p.name) setProfile(p);
      if (Array.isArray(pr)) setProjects(pr);
      if (Array.isArray(s)) setSkills(s);
      if (Array.isArray(se)) setServices(se);
      if (Array.isArray(e)) setExperience(e);
      if (Array.isArray(ed)) setEducation(ed);
    }).catch(()=>{});
  }, [dark]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch(`${API}/messages`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      });
      const data = await r.json();
      setSent(data.message || 'Message sent.');
      setForm({name:'',email:'',message:''});
    } catch {
      setSent('Connect the backend to send messages.');
    }
  };

  const social = {
    github: 'https://github.com/Fahim183',
    linkedin: 'https://www.linkedin.com/in/fahalullah-fahim-7198502a4'
  };

  return (
    <div className="site">
      <header className="nav">
        <a className="logo" href="#home">FF<span>.</span></a>
        <nav className={menu ? 'nav-links open' : 'nav-links'}>
          {['home','about','skills','services','projects','experience','education','contact'].map(x =>
            <a key={x} href={`#${x}`} onClick={()=>setMenu(false)}>{x}</a>
          )}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun/>:<Moon/>}</button>
          <button className="menu-btn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">AVAILABLE FOR OPPORTUNITIES</p>
            <h1>Hi, I'm <span>Fahalullah Fahim</span>.</h1>
            <h2>{profile.title}</h2>
            <p className="lead">{profile.about}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">View Projects <ArrowUpRight size={18}/></a>
              <a className="btn secondary" href="#contact">Let's Talk</a>
            </div>
            <div className="socials">
              <a href={social.github} target="_blank"><Github/></a>
              <a href={social.linkedin} target="_blank"><Linkedin/></a>
              <a href={`mailto:${profile.email}`}><Mail/></a>
            </div>
          </div>
          <div className="hero-card">
            <div className="photo-placeholder">FF</div>
            <div className="availability"><span></span> Open to work</div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-head"><p className="eyebrow">ABOUT ME</p><h2>Building digital experiences with purpose.</h2></div>
          <div className="about-grid">
            <p>{profile.about}</p>
            <div className="info-grid">
              <div><MapPin/><span>{profile.location}</span></div>
              <div><Mail/><span>{profile.email}</span></div>
              <div><Phone/><span>{profile.phone}</span></div>
              <div><span className="dot"></span><span>CSE Student</span></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-head"><p className="eyebrow">SKILLS</p><h2>Tools I use to turn ideas into websites.</h2></div>
          <div className="chips">
            {(skills.length ? skills : ['HTML','CSS','JavaScript','React','Node.js','Express.js','MySQL','MongoDB','C','C++','Java','Python','Git/GitHub','Figma','Canva']).map((s,i)=>
              <span key={i}>{s.name || s}</span>
            )}
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-head"><p className="eyebrow">SERVICES</p><h2>What I can help you build.</h2></div>
          <div className="cards">
            {(services.length ? services : ['Web Development','Front-End Development','Full-Stack Development','Responsive Websites','Business Websites','Portfolio Websites','Bug Fixing','UI/UX']).map((s,i)=>
              <article className="card" key={i}><span>0{i+1}</span><h3>{s.title || s}</h3><p>{s.description || 'Clean, responsive and user-friendly web solutions.'}</p></article>
            )}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-head"><p className="eyebrow">PROJECTS</p><h2>Selected work.</h2></div>
          <div className="projects">
            {(projects.length ? projects : [
              {title:'EduManage BD', description:'School management software concept for managing attendance, fees, results, routines and notices.', technologies:'Web Development', github_url:'#'},
              {title:'Book Store Management', description:'Full-stack academic project for managing a book store with database-backed functionality.', technologies:'React • Node.js • Express • MySQL', github_url:'#'}
            ]).map((p,i)=>
              <article className="project" key={i}>
                <div className="project-number">0{i+1}</div>
                <div><p className="tag">{p.technologies}</p><h3>{p.title}</h3><p>{p.description}</p></div>
                <a href={p.github_url || '#'} target="_blank"><ExternalLink/></a>
              </article>
            )}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-head"><p className="eyebrow">EXPERIENCE</p><h2>My professional journey.</h2></div>
          <div className="timeline">
            {(experience.length ? experience : [{company:'IT Sector', position:'IT / Web Development Experience', duration:'Current', description:'Professional experience in the IT sector. Details can be updated from the Admin Dashboard.'}]).map((e,i)=>
              <div className="timeline-item" key={i}><div className="timeline-dot"></div><div><p className="tag">{e.duration}</p><h3>{e.position}</h3><h4>{e.company}</h4><p>{e.description}</p></div></div>
            )}
          </div>
        </section>

        <section id="education" className="section">
          <div className="section-head"><p className="eyebrow">EDUCATION</p><h2>Academic background.</h2></div>
          <div className="education-card">
            {(education.length ? education : [{institution:'Metropolitan University', department:'CSE', degree:'Degree details can be updated later', batch:'Batch details can be updated later'}]).map((e,i)=>
              <div key={i}><p className="tag">EDUCATION</p><h3>{e.institution}</h3><p>{e.department} • {e.degree}</p><span>{e.batch}</span></div>
            )}
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-head"><p className="eyebrow">CONTACT</p><h2>Have a project in mind?</h2><p>Let's discuss how I can help turn your idea into a working website.</p></div>
          <form onSubmit={submit}>
            <input placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
            <input type="email" placeholder="Your email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
            <textarea placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required></textarea>
            <button className="btn primary" type="submit">Send Message <ArrowUpRight size={18}/></button>
            {sent && <p className="status">{sent}</p>}
          </form>
        </section>
      </main>

      <footer><span>© {new Date().getFullYear()} Fahalullah Fahim</span><span>Designed & built with purpose.</span></footer>
    </div>
  );
}

export default App;
