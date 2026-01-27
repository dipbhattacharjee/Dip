// Custom Cursor Animation
export const initCursorAnimation = () => {
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');

  cursor.classList.add('cursor-ring');
  cursorDot.classList.add('cursor-dot');

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  const speed = 0.3;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Animate cursor ring with trailing effect
  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .btn-primary, .btn-secondary, .social-link, .project-link, .contact-link, .skill-item'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-active');
      cursorDot.classList.add('cursor-dot-active');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-active');
      cursorDot.classList.remove('cursor-dot-active');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
};
