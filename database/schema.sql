CREATE DATABASE IF NOT EXISTS fahim_portfolio;
USE fahim_portfolio;

CREATE TABLE IF NOT EXISTS profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  title VARCHAR(200),
  about TEXT,
  location VARCHAR(100),
  email VARCHAR(150),
  phone VARCHAR(50),
  profile_image VARCHAR(255),
  resume_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  technologies VARCHAR(500),
  image VARCHAR(255),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experiences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company VARCHAR(150),
  position VARCHAR(150),
  duration VARCHAR(100),
  description TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institution VARCHAR(200),
  department VARCHAR(150),
  degree VARCHAR(150),
  batch VARCHAR(100),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS social_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  platform VARCHAR(100),
  url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150),
  email VARCHAR(150),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO profiles (name, title, about, location, email, phone)
SELECT
  'Fahalullah Fahim',
  'Front-End Web Developer & CSE Student',
  'Hello! I''m Fahim, a passionate Front-End Web Developer dedicated to building clean, responsive, and user-friendly websites. I specialize in HTML, CSS, and JavaScript to create modern websites that work smoothly on desktops, tablets, and mobile devices.',
  'Bangladesh',
  'fahalullahfahim0108@gmail.com',
  '018*********'
WHERE NOT EXISTS (SELECT 1 FROM profiles);

INSERT INTO social_links (platform, url)
SELECT 'LinkedIn', 'https://www.linkedin.com/in/fahalullah-fahim-7198502a4'
WHERE NOT EXISTS (SELECT 1 FROM social_links WHERE platform='LinkedIn');

INSERT INTO social_links (platform, url)
SELECT 'GitHub', 'https://github.com/Fahim183'
WHERE NOT EXISTS (SELECT 1 FROM social_links WHERE platform='GitHub');
