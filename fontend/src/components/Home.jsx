import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from '../hooks/use-toast';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, GraduationCap, Trophy, BookOpen, Sparkles, Download, Calendar, MessageCircle, Clock, Heart } from 'lucide-react';
import { personalInfo, skills, projects, education, experience, blogPosts } from '../mock';
import Spline from '@splinetool/react-spline';
import LoadingScreen from './LoadingScreen';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Full Stack Developer',
    'Web Developer',
    'AI Developer',
    'ML Engineer',
    'Backend Developer'
  ];

  useEffect(() => {
    // Cycle through roles every 4 seconds
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);

    return () => clearInterval(roleTimer);
  }, [roles.length]);

  useEffect(() => {
    // Simulate loading time and show loading screen
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    // Initialize Skills Carousel
    const initCarousel = () => {
      const container = document.querySelector('.carousel-container');
      if (!container) return null;

      // Clear existing skill items
      const existingItems = container.querySelectorAll('.skill-item');
      existingItems.forEach(item => item.remove());

      const radius = 200;
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;

      // Create skill items
      skills.forEach((skill, index) => {
        const angle = (index / skills.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle) - 40;
        const y = centerY + radius * Math.sin(angle) - 40;

        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.style.left = `${x}px`;
        skillItem.style.top = `${y}px`;

        skillItem.innerHTML = `
          <div class="skill-logo-wrapper">
            <img src="${skill.icon}" alt="${skill.name}" class="skill-logo">
          </div>
          <span class="skill-name">${skill.name}</span>
          <span class="tooltip">${skill.category}</span>
        `;

        container.appendChild(skillItem);
      });

      // Animation loop
      let animationId;
      const animate = () => {
        const items = container.querySelectorAll('.skill-item');
        if (items.length === 0) return;

        const time = Date.now() * 0.0005;

        items.forEach((item, index) => {
          const angle = (index / skills.length) * 2 * Math.PI + time;
          const x = centerX + radius * Math.cos(angle) - 40;
          const y = centerY + radius * Math.sin(angle) - 40;

          item.style.left = `${x}px`;
          item.style.top = `${y}px`;
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
      };
    };

    const cleanup = initCarousel();

    return () => {
      observer.disconnect();
      if (cleanup) cleanup();
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const getJourneyIcon = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      case 'contribution':
        return <Code2 className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="portfolio-container">
      <LoadingScreen isVisible={isLoading} />

      {/* Navigation Header */}
      <header className="dark-header">
        <div className="dark-logo-text">DIP</div>
        <nav className="dark-nav">
          <a href="#about" className="dark-nav-link">About</a>
          <a href="#skills" className="dark-nav-link">Skills</a>
          <a href="#projects" className="dark-nav-link">Projects</a>
          <a href="#resume" className="dark-nav-link">Resume</a>
          <a href="#blog" className="dark-nav-link">Blog</a>
          <a href="#contact" className="dark-nav-link">
            <Button className="btn-primary">Contact Me</Button>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles className="w-4 h-4" />
              <span>Available for Work</span>
            </div>
            <h1 className="hero-title">{personalInfo.name}</h1>
            <div className="animated-text-wrapper">
              <div className="animated-text-container" key={currentRoleIndex}>
                <span className="animated-text-item">{roles[currentRoleIndex]}</span>
              </div>
            </div>
            <p className="hero-tagline">{personalInfo.tagline}</p>
            <div className="hero-buttons">
              <a href="#projects">
                <Button className="btn-primary">
                  View Projects
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </a>
              <a href="#contact">
                <Button className="btn-secondary">Contact Me</Button>
              </a>
            </div>
            <div className="hero-socials">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <Github className="w-5 h-5" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="social-link">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="spline-container">
              <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-container" data-animate>
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-grid">
              <div className="about-image-container">
                <img src={personalInfo.avatar} alt={personalInfo.name} className="about-image" />
              </div>
              <Card className="about-card">
                <p className="about-text">{personalInfo.bio}</p>
                <div className="interests-section">
                  <h3 className="interests-title">Interests</h3>
                  <div className="interests-grid">
                    {personalInfo.interests.map((interest, idx) => (
                      <Badge key={idx} className="interest-badge">{interest}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Animated Carousel */}
      <section id="skills" className="skills-section" data-animate>
        <div className="section-content">
          <h2 className="section-title">My Skills</h2>
          <div className="carousel-container">
            <div className="center-circle">My Skills</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container" data-animate>
        <div className="section-content">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Card key={project.id} className="project-card" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
                  <div className="project-overlay">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.techStack.map((tech, idx) => (
                      <Badge key={idx} className="tech-badge">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="resume" className="section-container" data-animate>
        <div className="section-content">
          <h2 className="section-title">My Resume</h2>
          <div className="resume-container">
            <div className="resume-column">
              <h3 className="resume-column-title">
                <GraduationCap className="w-6 h-6" />
                Education
              </h3>
              <div className="resume-timeline">
                {education.map((item, index) => (
                  <Card key={item.id} className="resume-item" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="resume-icon">
                      {getJourneyIcon(item.type)}
                    </div>
                    <div className="resume-content">
                      <div className="resume-period">{item.period}</div>
                      <h4 className="resume-title">{item.degree}</h4>
                      <p className="resume-institution">{item.institution}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="resume-column">
              <h3 className="resume-column-title">
                <Briefcase className="w-6 h-6" />
                Experience
              </h3>
              <div className="resume-timeline">
                {experience.map((item, index) => (
                  <Card key={item.id} className="resume-item" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="resume-icon">
                      {getJourneyIcon(item.type)}
                    </div>
                    <div className="resume-content">
                      <div className="resume-period">{item.period}</div>
                      <h4 className="resume-title">{item.title}</h4>
                      <p className="resume-description">{item.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="resume-download">
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button className="btn-primary">
                Download Resume (PDF)
                <Download className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section-container" data-animate>
        <div className="section-content">
          <h2 className="section-title">My Blog</h2>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="blog-card" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="blog-image" style={{ backgroundImage: `url(${post.image})` }}>
                  <div className="blog-date">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <div className="blog-meta">
                    <span className="blog-meta-item">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                    <span className="blog-meta-item">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments} Comments
                    </span>
                  </div>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <a href={post.url} className="blog-read-more">
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container" data-animate>
        <div className="section-content">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container">
            <Card className="contact-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows={6}
                  />
                </div>
                <Button type="submit" className="btn-primary btn-full">
                  Send Message
                  <Mail className="w-5 h-5" />
                </Button>
              </form>
            </Card>
            <div className="contact-info">
              <Card className="contact-info-card">
                <h3 className="contact-info-title">Connect With Me</h3>
                <div className="contact-links">
                  <a href={`mailto:${personalInfo.email}`} className="contact-link">
                    <Mail className="w-5 h-5" />
                    <span>{personalInfo.email}</span>
                  </a>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <Github className="w-5 h-5" />
                    <span>GitHub Profile</span>
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark-footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 {personalInfo.name}. Built with React & FastAPI.</p>
          <div className="footer-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-link">
              <Github className="w-4 h-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="footer-link">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
