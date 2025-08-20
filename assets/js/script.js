document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = document.querySelector('#darkModeToggle i');
  if(document.body.classList.contains('dark')){
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});